"use client";

import { FilterIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props<T> = {
  table: Table<T>;
};

const CountryFilterModal = <T,>({ table }: Props<T>) => {
  const column = table.getColumn("country");

  if (!column) return null;

  const selectedValues = (column.getFilterValue() as string[]) || [];

  const countries = Array.from(
    new Set(table.getPreFilteredRowModel().rows.map(
      (row) => row.getValue("country")
    ))
  ) as string[];

  const toggleCountry = (country: string) => {
    const updated = selectedValues.includes(country)
      ? selectedValues.filter((c) => c !== country)
      : [...selectedValues, country];

    column.setFilterValue(updated.length ? updated : undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-[#5622FF] hover:opacity-80">
          <FilterIcon size={16} className="ml-20" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-48 p-3 space-y-2"
      >
        {countries.map((country) => (
          <label
            key={country}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox
              checked={selectedValues.includes(country)}
              onCheckedChange={() => toggleCountry(country)}
            />
            {country}
          </label>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CountryFilterModal;
