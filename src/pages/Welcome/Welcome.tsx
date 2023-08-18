import Meta from '@/components/Meta';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function Welcome() {
  const files = [
    {
      id: 1,
      name: 'report.pdf',
      size: '1.2 MB',
      type: 'PDF',
      date: '01/01/2021',
    },
    {
      id: 2,
      name: 'presentation.pdf',
      size: '1.2 MB',
      type: 'PDF',
      date: '01/01/2021',
    },
    {
      id: 3,
      name: 'report.pdf',
      size: '1.2 MB',
      type: 'PDF',
      date: '01/01/2021',
    },
    {
      id: 4,
      name: 'report.pdf',
      size: '1.2 MB',
      type: 'PDF',
      date: '01/01/2021',
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <Meta title="Welcome" />
      {/*<FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>*/}
      <div className="m-5 p-2 w-11/12 border-2 shadow-2xl rounded-md">
        <Table>
          <TableCaption>A list of your recent files.</TableCaption>
          <TableHeader>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[150px]">Size</TableHead>
            <TableHead className="w-[150px]">Type</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/*</FullSizeCenteredFlexBox>*/}
    </div>
  );
}

export default Welcome;
