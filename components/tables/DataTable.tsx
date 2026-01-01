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
import mockData from "@/data/mockData.json";
import { useEffect, useState } from "react";
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
import { fetchUsers } from "@/lib/api";
import Pagination from "./Pagination";
import { User } from "./Columns";
import { columns } from './Columns'


const DataTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const table = useReactTable({
    data,
    columns,
    meta: {
      refetchUsers: () => fetchUsers().then(setData),
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
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

      <div>
        {loading && (
          <div className="text-center text-gray-500 mt-4">Loading...</div>
        )}
      </div>

      <Pagination table={table} />

    </div>
  );
};

export default DataTable;
