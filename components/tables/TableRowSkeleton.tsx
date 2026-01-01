import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  columnsCount: number;
};

const TableRowSkeleton = ({ columnsCount }: Props) => {
  return (
    <tr className="table w-full table-fixed">
      {Array.from({ length: columnsCount }).map((_, i) => (
        <td key={i} className="py-4 px-3">
          <Skeleton className="h-4 w-full rounded-md" />
        </td>
      ))}
    </tr>
  );
};

export default TableRowSkeleton;
