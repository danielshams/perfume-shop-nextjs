"use client";

import { ReactNode, useEffect, useState } from "react";
import { getPerfumes, PerfumeType } from "@/app/_lib/apiPerfumes";
import { SearchProvider } from "./SearchContext";

interface ProductLoaderProps {
  children: ReactNode;
}
const ProductLoader = ({ children }: ProductLoaderProps) => {
  const [products, setProducts] = useState<PerfumeType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const perfumes = await getPerfumes();
        setProducts(perfumes);
      } catch (error) {
        console.error("Error loading perfumes:", error);
      }
    };

    fetchProducts();
  }, []);

  return <SearchProvider products={products}>{children}</SearchProvider>;
};

export default ProductLoader;
