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
import FileTable from '@/components/FileTable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
    <div>
      <Meta title="Welcome" />
      {/*<Breadcrumb className="p-5">*/}
      {/*  <BreadcrumbList>*/}
      {/*    <BreadcrumbItem>*/}
      {/*      <BreadcrumbLink href="/">Home</BreadcrumbLink>*/}
      {/*    </BreadcrumbItem>*/}
      {/*    <BreadcrumbSeparator />*/}
      {/*    <BreadcrumbItem>*/}
      {/*      <BreadcrumbLink href="/components">Components</BreadcrumbLink>*/}
      {/*    </BreadcrumbItem>*/}
      {/*    <BreadcrumbSeparator />*/}
      {/*    <BreadcrumbItem>*/}
      {/*      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>*/}
      {/*    </BreadcrumbItem>*/}
      {/*  </BreadcrumbList>*/}
      {/*</Breadcrumb>*/}
      <div className="flex justify-center items-center">
        <FileTable />
      </div>
    </div>
  );
}

export default Welcome;
