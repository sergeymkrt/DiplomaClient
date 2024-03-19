import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GroupDialog from '@/components/GroupDialog';
import { GetGroups } from '@/api/Business/GroupData';
import { Group } from '@/api/interfaces/Group';
import useNotifications from '@/store/notifications';

function Groups() {
  const [, notificationActions] = useNotifications();
  const pagination = { pageSize: 10, pageNumber: 1 };
  const { data } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      return GetGroups(pagination)
        .then((r) => r)
        .catch(() => {
          notificationActions.push({
            message: 'Failed to fetch groups',
            options: { variant: 'error' },
          });
        });
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className="pl-8 pt-8">
        <GroupDialog title={'Add'} group={{ id: 0 } as Group} />
      </div>
      <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data.data.items?.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <GroupDialog title={'Edit'} group={group} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>

    // <ScrollArea className="h-72 w-48 rounded-md border">
    //   <div className="p-4">
    //     <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    //     {directoriesQuery.data?.rows.map((group) => (
    //       <>
    //         <div key={group.id} className="text-sm">
    //           {group.name}
    //         </div>
    //         <Separator className="my-2" />
    //       </>
    //     ))}
    //   </div>
    // </ScrollArea>
  );
}

export default Groups;
