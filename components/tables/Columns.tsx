import capitalizeFirstLetter from "@/utils/Capitalize";
import { formatDate } from "@/utils/formatDate";
import { createColumnHelper } from "@tanstack/react-table";
import CountryFilterModal from "../modals/CountryFilterModal";
import { fetchUsers } from "@/lib/api";
import EditUserInfoModal from "../modals/EditUserInfoModal";
import { Badge } from "../ui/badge";

export type User = {
  id: string;
  entity: string;
  gender: string;
  requestDate: string;
  country: string;
};

export type TableMeta = {
  updateUser: (user: User) => void;
};

const columnHelper = createColumnHelper<User>();
export const columns = [
  columnHelper.accessor("entity", {
    id: "entity",
    cell: (info) => (
      <span className="text-primary">
        {capitalizeFirstLetter(info.getValue())}
      </span>
    ),
    header: () => <span>Entity</span>,
  }),

  columnHelper.accessor("gender", {
    cell: (info) => (
      <>
        <Badge
          variant={
            info.getValue().toLocaleLowerCase() === "male" ? "Male" : "Female"
          }
        >
          {capitalizeFirstLetter(info.getValue())}
        </Badge>
      </>
    ),
    header: () => <span>Gender</span>,
  }),

  columnHelper.accessor("requestDate", {
    cell: (info) => formatDate(info.getValue()),
    header: () => <span>Request Date</span>,
  }),

  columnHelper.accessor("country", {
    id: "country",
    cell: ({ row, table }) => (
      <div className="flex items-center justify-between">
        {row.original.country}
        <EditUserInfoModal
          user={{
            id: row.original.id,
            entity: row.original.entity,
            country: row.original.country,
          }}
          onSuccess={(updatedUser) => {
            table.options.meta?.updateUser?.(updatedUser);
          }}
        />
      </div>
    ),
    header: ({ table }) => {
      const column = table.getColumn("country");
      const isFiltered =
        Array.isArray(column?.getFilterValue()) &&
        column!.getFilterValue()!.length > 0;

      return (
        <div className="flex items-center gap-2 relative">
          <span>Country</span>

          <div className="relative">
            <CountryFilterModal table={table} />

            {isFiltered && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#5622FF]" />
            )}
          </div>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  }),
];
