import "@tanstack/react-table";
import { User } from "@/components/tables/Columns";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    updateUser?: (user: User) => void;
  }
}
