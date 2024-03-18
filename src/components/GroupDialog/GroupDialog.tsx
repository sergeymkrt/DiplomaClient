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
import { CreateGroup } from '@/api/Auth/GroupData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateGroupDto, Group } from '@/api/interfaces/Group';

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
          <GroupForm group={group} />
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
        <GroupForm group={group} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function GroupForm({ group }: { group: Group }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
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

  const addUser = () => {
    if (email.trim() !== '') {
      // Update the users state with the new user
      setUsers([
        ...users,
        { id: 0, email: email, randId: Math.random().toString(36).substring(7) },
      ]);
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
      // invalidateQueries('groups');
      // invalidateQueries('group');
    },
  });

  // Function to handle saving the list of users (this is just a placeholder)
  const saveGroup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (groupId === 0) {
    // }
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

      {group.id === 0 ? <div></div> : <div>Users</div>}
      {group.id !== 0 && users?.map((user) => <UserRow key={user.randId} user={user} />)}
      {group.id !== 0 && (
        <div>
          <Label htmlFor="email">Add user</Label>
          <div className="flex items-center gap-4">
            <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <Button type="button" variant="outline" disabled={email == ''} onClick={addUser}>
              Add
            </Button>
          </div>
        </div>
      )}
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export default GroupDialog;
