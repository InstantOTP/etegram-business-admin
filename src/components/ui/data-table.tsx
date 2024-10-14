'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from './table';
import Pagination from './pagination';
import Search from './search';
import Filter from '../filters/filters';
import { type FilterOptions } from '../filters/filters';
import AdvanceFilters from '../filters/advance-filters';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  title?: string;
  filterOptions?: FilterOptions;
  searchPlaceholder?: string;
  hideSearch?: boolean;
  showAdvanced?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages,
  title,
  filterOptions,
  searchPlaceholder,
  hideSearch = false,
  showAdvanced = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='space-y-5'>
      {/* If no title and no hide search, hide this section entirely */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-y-2'>
        {title && (
          <h3 className='font-inter md:text-3xl font-semibold text-foreground'>
            {title}
          </h3>
        )}
        <div className='flex space-x-3 items-center'>
          {!hideSearch && <Search placeholder={searchPlaceholder} />}
          {filterOptions && <Filter filters={filterOptions} />}
          {showAdvanced && <AdvanceFilters />}
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-32 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
