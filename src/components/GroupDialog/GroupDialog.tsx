import { useMediaQuery } from '@mui/material';
import React from 'react';
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
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GetMockGroupUsers } from '@/components/GroupDialog/fetchData';

function GroupDialog({ id }: { id: number }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [users, setUsers] = React.useState<{ id: number; email: string }[]>([]);
  const groupPagination = {
    pageNumber: 0,
    pageSize: 10,
  };

  const groupUsersQuery = useQuery({
    queryKey: ['groupUsers'],
    queryFn: () => GetMockGroupUsers(groupPagination),
    placeholderData: keepPreviousData,
  });
  setUsers(groupUsersQuery.data?.rows || []);

  function addUsers(user: { id: number; email: string }) {
    // add users
    setUsers([...users, user]);
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Group</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit group</DialogTitle>
            <DialogDescription>
              Make changes to your group here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <GroupForm users={users} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <GroupForm users={users} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function GroupForm({ users }: { users: { id: number; email: string }[] | undefined }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const addUser = () => {};

  return (
    <form className={cn('grid items-start gap-4', isDesktop ? '' : 'px-4')}>
      {users?.map((user) => (
        <UserRow key={user.id} user={user} />
      ))}
      <Label htmlFor="email">Add user</Label>
      <div className="flex items-center gap-4">
        <Input id="email" type="email" />
        <Button type="button" variant="outline">
          Add
        </Button>
      </div>

      <Button type="submit">Save changes</Button>
    </form>
  );
}

function UserRow({ user }: { user: { id: number; email: string } }) {
  return (
    <div className="flex items-center justify-between">
      <div>{user.email}</div>
      <Button variant="outline">Remove</Button>
    </div>
  );
}

export default GroupDialog;
