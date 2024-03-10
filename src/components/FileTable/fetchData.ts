import DirectoryPagination from '@/api/interfaces/DirectoryPagination';

const files = [
  {
    id: 1,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 2,
    name: 'presentation.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 3,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 4,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 5,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 6,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 7,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 8,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 9,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 10,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 11,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 12,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 13,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 14,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
  {
    id: 15,
    name: 'report.pdf',
    size: '1.2 MB',
    type: 'PDF',
    date: new Date('01/01/2021'),
  },
];

const directories = [
  {
    id: 1,
    name: 'Documents',
  },
  {
    id: 2,
    name: 'Pictures',
  },
  {
    id: 3,
    name: 'Music',
  },
];

export async function fetchData(options: { pageIndex: number; pageSize: number }) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: files.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    pageCount: Math.ceil(files.length / options.pageSize),
    rowCount: files.length,
  };
}

export async function GetMockDirectories(options: DirectoryPagination) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: directories,
    pageCount: Math.ceil(directories.length / options.pageSize),
    rowCount: directories.length,
  };
}
