const groups = [
  {
    id: 1,
    name: 'Group 1',
  },
  {
    id: 2,
    name: 'Group 2',
  },
  {
    id: 3,
    name: 'Group 3',
  },
  {
    id: 4,
    name: 'Group 4',
  },
  {
    id: 5,
    name: 'Group 5',
  },
];

export async function fetchData(options: { pageIndex: number; pageSize: number }) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: groups.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    pageCount: Math.ceil(groups.length / options.pageSize),
    rowCount: groups.length,
  };
}
