import capitalizeFirstLetter from "@/utils/Capitalize";
import { formatDate } from "@/utils/formatDate";
import { createColumnHelper } from "@tanstack/react-table";
import CountryFilterModal from "../modals/CountryFilterModal";
import { fetchUsers } from "@/lib/api";
import EditUserInfoModal from "../modals/EditUserInfoModal";

export type User = {
  id: string;
  entity: string;
  gender: string;
  requestDate: string;
  country: string;
};

export type TableMeta = {
  refetchUsers: () => void;
};

const columnHelper = createColumnHelper<User>();
export const columns = [
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
    cell: ({ row, table }) => (
      <div className="flex items-center justify-between">
        {row.original.country}
        <EditUserInfoModal
          user={{
            id: row.original.id,
            entity: row.original.entity,
            country: row.original.country,
          }}
          onSuccess={() => {
             table.options.meta?.refetchUsers?.()
          }}
        />
      </div>
    ),
    header: ({ table }) => (
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
