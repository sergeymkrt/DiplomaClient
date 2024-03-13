import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GetMockDirectories } from '@/components/FileTable/fetchData';
import { fetchData } from '@/pages/Groups/fetchData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GroupDialog from '@/components/GroupDialog';

function Groups() {
  const directoriesQuery = useQuery({
    queryKey: ['directories'],
    queryFn: () => fetchData({ pageIndex: 0, pageSize: 50 }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {directoriesQuery.data?.rows.map((group) => (
        <Card key={group.id}>
          <CardHeader>
            <CardTitle>{group.name}</CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <GroupDialog id={group.id} />
          </CardFooter>
        </Card>
      ))}
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
