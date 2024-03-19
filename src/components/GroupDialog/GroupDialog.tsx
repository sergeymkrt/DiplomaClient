import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import cn from '@/utils/shadCnUtils';
import { CreateGroup } from '@/api/Business/GroupData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AccessLevel, CreateGroupDto, Group } from '@/api/interfaces/Group';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getEnumCases } from '@/utils/EnumFunctions';

interface OptionalUser {
  id: number;
  email: string;
}

function GroupDialog({ title, group }: { title: string; group: Group }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{title} Group</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title} group</DialogTitle>
            <DialogDescription>
              {title} your group here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <GroupForm group={group} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{title} Group</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title} group</DrawerTitle>
          <DrawerDescription>
            Make changes to your group here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <GroupForm group={group} setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function GroupForm({
  group,
  setOpen,
}: {
  group: Group;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [users, setUsers] = React.useState<{ id: number; randId: string; email: string }[]>(
    group.users?.map((user) => ({
      id: user.id,
      randId: Math.random().toString(36).substring(7),
      email: user.email,
    })),
  );

  // State to hold the current user email being entered
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState(group.id === 0 ? '' : group.name);
  const [accessLevel, setAccessLevel] = useState(group.id === 0 ? 1 : group.accessLevelId);
  const accessLevelValues = getEnumCases(AccessLevel);
  const addUser = () => {
    if (email.trim() !== '') {
      // Update the users state with the new user
      if (users) {
        setUsers([
          ...users,
          { id: 0, email: email, randId: Math.random().toString(36).substring(7) },
        ]);
      } else {
        setUsers([{ id: 0, email: email, randId: Math.random().toString(36).substring(7) }]);
      }

      // Clear the email input field
      setEmail('');
    }
  };

  const createGroupMutation = useMutation({
    mutationFn: (group: CreateGroupDto) => CreateGroup(group),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'groups',
      });
      setOpen(false);
      navigate('/groups');
      // invalidateQueries('groups');
      // invalidateQueries('group');
    },
  });

  // Function to handle saving the list of users (this is just a placeholder)
  const saveGroup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    group.name = name;
    group.description = description;
    group.accessLevelId = accessLevel;
    group.users = users?.map((user) => ({ id: user.id, email: user.email }));
    console.log(group);
    if (group.id === 0) {
      createGroupMutation.mutate(group);
    }
  };

  const removeUser = (randId: string) => {
    // Filter out the user with the specified id
    setUsers(users.filter((user) => user.randId !== randId));
  };

  function UserRow({ user }: { user: { id: number; email: string; randId: string } }) {
    return (
      <div className="flex items-center justify-between">
        <div>{user.email}</div>
        <Button variant="outline" onClick={() => removeUser(user.randId)}>
          Remove
        </Button>
      </div>
    );
  }

  return (
    <form className={cn('grid items-start gap-4', isDesktop ? '' : 'px-4')} onSubmit={saveGroup}>
      <Label htmlFor="name">Group name</Label>
      <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Label htmlFor="accessLevel">Access level</Label>
      {/*<select*/}
      {/*  id="accessLevel"*/}
      {/*  name="accessLevel"*/}
      {/*  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"*/}
      {/*  value={accessLevel}*/}
      {/*  onChange={(e) => setAccessLevel(Number(e.target.value))}*/}
      {/*/>*/}

      <Select
        defaultValue={accessLevelValues[0].value.toString()}
        onValueChange={(value) => setAccessLevel(+value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Access Level" />
        </SelectTrigger>
        <SelectContent>
          {accessLevelValues.map((accessLevel) => (
            <SelectItem
              key={accessLevel.value}
              className="hover:bg-gray-100 cursor-pointer p-2"
              value={accessLevel.value.toString()}
            >
              {accessLevel.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/*{group.id === 0 ? <div></div> : <div>Users</div>}*/}
      {users && users.length > 0 && <Label htmlFor="email">Users</Label>}
      <div id="Users">
        {users?.map((user) => (
          <UserRow key={user.randId} user={user} />
        ))}
      </div>

      <div>
        <Label htmlFor="email">Add user</Label>
        <div className="flex items-center gap-4">
          <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <Button type="button" variant="outline" disabled={email == ''} onClick={addUser}>
            Add
          </Button>
        </div>
      </div>

      <Button type="submit">Save changes</Button>
    </form>
  );
}

export default GroupDialog;
