"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  FilterIcon,
} from "lucide-react";
import { User } from "@/types/index";
import mockData from "@/data/mockData.json";
import { useState } from "react";
import capitalizeFirstLetter from "@/utils/Capitalize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { formatDate } from "@/utils/formatDate";
import CountryFilterModal from "../modals/CountryFilterModal";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("entity", {
    id: "entity",
    cell: (info) => (
      <span className="text-[#5622FF]">
        {capitalizeFirstLetter(info.getValue())}
      </span>
    ),
    header: () => <span>Entity</span>,
  }),

  columnHelper.accessor("gender", {
    cell: (info) => capitalizeFirstLetter(info.getValue()),
    header: () => <span>Gender</span>,
  }),

  columnHelper.accessor("requestDate", {
    cell: (info) => formatDate(info.getValue()),
    header: () => <span>Request Date</span>,
  }),

  columnHelper.accessor("country", {
    id: "country",
    cell: (info) => (
      <div className="flex items-center justify-between">
        {capitalizeFirstLetter(info.getValue())}
        <Edit
          size={16}
          className="inline-block ml-2 text-gray-500 cursor-pointer hover:text-gray-600"
        />
      </div>
    ),
    header: ({table}) => (
      <div className="flex items-center justify-start gap-20 sm:gap-2">
        Country
        <CountryFilterModal table={table} />
      </div>
    ),
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  }),
];

const DataTable = () => {
  const [data] = useState([...mockData]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });


  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl tracking-wide mb-4 text-center text-[#5622FF]">
        User Information Table
      </h1>
      <div className="bg-white shadow-md rounded-lg flex flex-col">
        <table className="min-w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="font-normal text-gray-500 text-md border-b border-gray-200 py-4 px-3"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            className="block overflow-y-auto"
            style={{
              maxHeight:
                table.getState().pagination.pageSize >= 10 ? "360px" : "auto",
            }}
          >
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="table w-full table-fixed hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4 px-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-400">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2">Items per page</span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger
              className="
                    w-[90px]
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    focus:ring-[#5622FF]
                    focus:border-[#5622FF]
                  "
            >
              <SelectValue placeholder="Rows" />
            </SelectTrigger>

            <SelectContent>
              {[5, 10, 20, 30].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={String(pageSize)}
                  className="focus:bg-[#5622FF] focus:text-white bg-white"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className="p-2 rounded-md bg-gray-100 text-gray-400 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={16} />
          </Button>

          <Button
            className="p-2 rounded-md bg-gray-100 text-gray-400 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={16} />
          </Button>

          <span className="flex items-center">
            <Input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 focus:ring-[#5622FF]"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>

          <Button
            className="p-2 rounded-md bg-gray-100 text-gray-400 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={16} />
          </Button>

          <Button
            className="p-2 rounded-md bg-gray-100 text-gray-400 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
