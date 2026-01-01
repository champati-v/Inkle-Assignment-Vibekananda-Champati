"use client";

import { createContext, useContext } from "react";

type Country = {
  id: string;
  name: string;
};

const CountriesContext = createContext<Country[]>([]);

export const CountriesProvider = ({
  countries,
  children,
}: {
  countries: Country[];
  children: React.ReactNode;
}) => {
  return (
    <CountriesContext.Provider value={countries}>
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountries = () => useContext(CountriesContext);
