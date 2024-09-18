"use client";

import { createContext, ReactNode, useState, useEffect } from "react";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  noResults: boolean;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

interface SearchProviderProps {
  children: ReactNode;
  products: { id: number; name: string }[]; 
}

export function SearchProvider({ children, products }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    if (
      searchTerm &&
      products &&
      !products.some((product) => product.name.includes(searchTerm))
    ) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [searchTerm, products]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, noResults }}>
      {children}
    </SearchContext.Provider>
  );
}
