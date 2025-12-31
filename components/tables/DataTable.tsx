import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Edit, FilterIcon } from 'lucide-react';
import { User } from '@/types/index';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("entity", {
    id: "entity",
    cell: (info) => (
        <span className='text-[#5622FF]'>{info.getValue()}</span>
    ),
    header: () => (
      <span>
        Entity
      </span>
    ),
  }),

  columnHelper.accessor("gender", {
    cell: (info) => info.getValue(),
    header: () => (
      <span>
        Gender
      </span>
    ),
  }),

  columnHelper.accessor("requestDate", {
    cell: (info) => info.getValue(),
    header: () => (
      <span>
        Request Date
      </span>
    ),
  }),

  columnHelper.accessor("country", {
    id: "country",
    cell: (info) => (
        <div className='flex items-center justify-between'>
            {info.getValue()}
            <Edit size={16} className='inline-block ml-2 text-gray-500 cursor-pointer hover:text-gray-600' />
        </div>
    ),
    header: () => (
      <div className='flex items-center justify-between gap-5'>
        Country
        <FilterIcon size={16} className='text-[#5622FF]' />
      </div>
    ),
}),
]

const DataTable = () => {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getHeaderGroups());

  return (
    <div className='flex flex-col min-h-screen max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl mb-6 text-center'>User Tax Table</h1>
      <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200 text-left'>
          {/* table head  */}
          <thead className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='font-normal text-gray-500 text-md'>
                    <div className='py-4 px-3'>
                      {
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          {/* table body  */}
          <tbody className='bg-white divide-y divide-gray-200'>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='hover:bg-gray-50'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='py-4 px-3'>  
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default DataTable