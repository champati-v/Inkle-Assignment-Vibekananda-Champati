"use client";

import { FilterIcon } from "lucide-react";
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-[#5622FF] hover:opacity-80"
        >
          <FilterIcon size={16} className="ml-20" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-48 p-3 h-52 space-y-2 overflow-y-scroll"
      >
        {countries.map((country) => (
          <label
            key={country.id}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox
              checked={selectedValues.includes(country.name)}
              onCheckedChange={() => toggleCountry(country.name)}
              className=" data-[state=checked]:bg-[#5622FF]  data-[state=checked]:border-[#5622FF] data-[state=checked]:text-white"
            />
            {country.name}
          </label>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CountryFilterModal;
