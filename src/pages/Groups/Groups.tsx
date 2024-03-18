import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchData } from '@/pages/Groups/fetchData';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GroupDialog from '@/components/GroupDialog';
import { groupUsers } from '@/components/GroupDialog/fetchData';
import { GetGroups } from '@/api/Auth/GroupData';
import { CreateGroupDto, Group } from '@/api/interfaces/Group';

function Groups() {
  // const directoriesQuery = useQuery({
  //   queryKey: ['directories'],
  //   queryFn: () => fetchData({ pageIndex: 0, pageSize: 50 }),
  //   placeholderData: keepPreviousData,
  // });
  const pagination = { pageSize: 10, pageNumber: 1 };
  const directoriesQuery = useQuery({
    queryKey: ['groups'],
    queryFn: () => GetGroups(pagination),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="pl-8 pt-8">
        <GroupDialog title={'Add'} group={{ id:0 } as Group}/>
      </div>
      <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {directoriesQuery.data?.data.items?.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <GroupDialog
                title={'Edit'}
                group={group}
              />
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
