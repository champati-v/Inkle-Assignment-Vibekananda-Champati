import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Input } from "../ui/input";

const Pagination = ({ table, loading }: { table: any, loading: boolean }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-500">
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
                        w-22.5
                        border border-gray-300
                        rounded-md
                        shadow-sm
                        focus:ring-primary
                        focus:border-primary
                      "
            disabled={loading}
          >
            <SelectValue placeholder="Rows" />
          </SelectTrigger>

          <SelectContent>
            {[5, 10, 20, 30].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={String(pageSize)}
                className="focus:bg-primary focus:text-white bg-white"
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          className="p-2 rounded-md bg-primary/80 text-white hover:bg-primary/90 disabled:opacity-50"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage() || loading}
        >
          <ChevronsLeft size={16} />
        </Button>

        <Button
          className="p-2 rounded-md bg-primary/80 text-white hover:bg-primary/90 disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || loading}
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
            className="w-16 focus:border-primary"
            disabled={loading}
          />
          <span className="ml-1">of {table.getPageCount()}</span>
        </span>

        <Button
          className="p-2 rounded-md bg-primary/80 text-white hover:bg-primary/90 disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || loading}
        >
          <ChevronRight size={16} />
        </Button>

        <Button
          className="p-2 rounded-md bg-primary/80 text-white hover:bg-primary/90 disabled:opacity-50"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage() || loading}
        >
          <ChevronsRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
