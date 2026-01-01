"use client";

import { FilterIcon, X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCountries } from "@/context/CountriesContext";

type Props<T> = {
  table: Table<T>;
};

const CountryFilterModal = <T,>({ table }: Props<T>) => {
  const countries = useCountries(); 
  const column = table.getColumn("country");

  if (!column) return null;

  const selectedValues = (column.getFilterValue() as string[]) || [];

  const toggleCountry = (country: string) => {
    const updated = selectedValues.includes(country)
      ? selectedValues.filter((c) => c !== country)
      : [...selectedValues, country];

    column.setFilterValue(updated.length ? updated : undefined);
  };

  const clearAll = () => {
    column.setFilterValue(undefined);
  };
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-primary ml-20 hover:bg-primary/10 p-2 rounded-md transition-colors cursor-pointer"
        >
          <FilterIcon size={16} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-48 p-3 h-52 space-y-2 overflow-y-scroll"
      >
        {selectedValues.length > 0 && (
          <button
            onClick={clearAll}
            className="
              flex items-center gap-2
              text-sm text-primary
              hover:bg-primary/10
              mb-2 w-full p-2 cursor-pointer border-b border-gray-300
            "
          >
            <X size={14} />
            Clear all
          </button>
        )}

        {countries.map((country) => (
          <label
            key={country.id}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox
              checked={selectedValues.includes(country.name)}
              onCheckedChange={() => toggleCountry(country.name)}
              className=" data-[state=checked]:bg-primary  data-[state=checked]:border-primary data-[state=checked]:text-white"
            />
            {country.name}
          </label>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CountryFilterModal;
