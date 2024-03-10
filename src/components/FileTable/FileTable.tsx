import {
  createCell,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import File from '@/api/interfaces/File';
import moment from 'moment';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchData, GetMockDirectories } from './fetchData';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { GetDirectories } from '@/api/Business/Directories';
import DirectoryPagination from '@/api/interfaces/DirectoryPagination';

const columnHelper = createColumnHelper<File>();
const columns = [
  columnHelper.accessor((row) => row.name, {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.size, {
    header: 'Size',
    cell: (info) => info.getValue() ?? '.',
  }),
  columnHelper.accessor((row) => row.type, {
    header: 'Type',
    cell: (info) => info.getValue() ?? '.',
  }),
  columnHelper.accessor((row) => row.date, {
    header: 'Date',
    cell: (info) => moment(info.getValue()).format('DD/MM/yyyy') ?? '.',
  }),
  columnHelper.accessor((row) => row.id, {
    header: 'Download',
    cell: (info) => {
      const { value } = info;
      return <span>Download file.{value}</span>;
    },
  }),
];

function FileTable() {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [directoryId, setDirectoryId] = React.useState<number | undefined>(undefined);

  const initialDirectoryPagination: DirectoryPagination = {
    pageNumber: 0,
    pageSize: 10,
    parentDirectoryId: directoryId,
  };

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const directoriesQuery = useQuery({
    queryKey: ['directories'],
    queryFn: () => GetMockDirectories(initialDirectoryPagination),
    placeholderData: keepPreviousData,
  });

  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchData(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });
  const defaultData = React.useMemo(() => [], []);

  // const [data, setData] = React.useState<File[]>(files);
  // const rerender = React.useReducer(() => ({}), {})[1];
  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    rowCount: dataQuery.data?.rowCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // debugTable: true,
  });
  function setDirectory(id: number | undefined) {
    setDirectoryId(id);
    console.log('setDirectoryId', id);
  }

  return (
    <div className="m-5 p-6 w-11/12 border-2 shadow-2xl rounded-md">
      <Table>
        <TableHeader>
          {/*{table.getHeaderGroups().map((headerGroup) => (*/}
          {/*  <TableRow key={headerGroup.id}>*/}
          {table.getFlatHeaders().map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
            //   ))}
            // </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {directoryId ? (
            <TableRow onClick={() => setDirectory(undefined)}>
              <TableCell>..</TableCell>
            </TableRow>
          ) : null}

          {directoriesQuery.data?.rows.map((directory) => (
            <TableRow key={directory.id} onClick={() => setDirectory(directory.id)}>
              {Object.entries(directory as File)
                .filter((k) => k[0] !== 'id')
                .map(([key, value]) => (
                  <TableCell key={key}>{value}</TableCell>
                ))}
            </TableRow>
          ))}
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {dataQuery.isFetching ? 'Loading...' : null}
      </div>
      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {dataQuery.data?.rowCount.toLocaleString()} Rows
      </div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
    </div>
  );
}

export default FileTable;
