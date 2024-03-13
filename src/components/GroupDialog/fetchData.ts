import Pagination from '@/api/interfaces/Pagination';

const groupUsers = [
  {
    id: 1,
    email: 'user1@gmail.com',
  },
  {
    id: 2,
    email: 'user2@gmail.com',
  },
  {
    id: 3,
    email: 'user2@gmail.com',
  },
  {
    id: 4,
    email: 'user2@gmail.com',
  },
];

export async function GetMockGroupUsers(options: Pagination) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: groupUsers,
    pageCount: Math.ceil(groupUsers.length / options.pageSize),
    rowCount: groupUsers.length,
  };
}
