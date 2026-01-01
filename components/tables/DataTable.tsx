"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";

import { fetchUsers } from "@/lib/api";
import Pagination from "./Pagination";
import { User } from "./Columns";
import { columns } from "./Columns";
import TableRowSkeleton from "./TableRowSkeleton";

const DataTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const updateUserInTable = (updatedUser: User) => {
    setData((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const table = useReactTable({
    data,
    columns,
    meta: {
      updateUser: updateUserInTable,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    fetchUsers()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col justify-center gap-8 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-center text-primary">
        User Information
      </h1>
      <p className="text-sm text-center text-gray-400">
        Manage users, update details, and filter by country
      </p>
      </div>
      <div className="bg-white shadow-md rounded-lg flex flex-col">
        <table className="min-w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="font-normal text-[#706A85] text-md border-b border-gray-300 py-4 px-3"
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
            {loading
              ? Array.from({
                  length: table.getState().pagination.pageSize,
                }).map((_, i) => (
                  <TableRowSkeleton
                    key={i}
                    columnsCount={table.getAllColumns().length}
                  />
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="table w-full table-fixed hover:bg-primary/5 border-b border-gray-100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 px-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="border-t px-4">
        <Pagination table={table} loading={loading} />
      </div>
    </div>
  );
};

export default DataTable;
