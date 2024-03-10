import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GetMockDirectories } from '@/components/FileTable/fetchData';
import { fetchData } from '@/pages/Groups/fetchData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

async function Groups() {
  const directoriesQuery = useQuery({
    queryKey: ['directories'],
    queryFn: () => fetchData({ pageIndex: 0, pageSize: 50 }),
    placeholderData: keepPreviousData,
  });

  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {directoriesQuery.data?.rows.map((group) => (
          <>
            <div key={group.id} className="text-sm">
              {group.name}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}

export default Groups;
