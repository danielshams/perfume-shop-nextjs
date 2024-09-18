"use client";
import { useContext, useState, useEffect } from "react";
import { getPerfumes, PerfumeType } from "../_lib/apiPerfumes";
import styles from "../_styles/ProductsList.module.css";
import { Product } from "./Product";
import { SearchContext } from "./SearchContext";
import Spinner from "../loading";

async function fetchPerfumes() {
  const perfumeData = await getPerfumes();
  return perfumeData;
}


export function ProductsList() {
  const [perfumes, setPerfumes] = useState<PerfumeType[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [loading, setLoading] = useState<boolean>(true);

  const context = useContext(SearchContext);
  const searchTerm = context ? context.searchTerm : "";

  useEffect(() => {
    fetchPerfumes().then((perfumeData) => {
      setPerfumes(perfumeData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  let filteredPerfumes = perfumes.filter((perfume) =>
    perfume.name.includes(searchTerm)
  );

  if (sortOrder === "highest") {
    filteredPerfumes.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "lowest") {
    filteredPerfumes.sort((a, b) => a.price - b.price);
  }

  return (
    <div className={styles.productsContainer}>
      {filteredPerfumes.length === 0 ? (
        <div className={styles.noResults}>!محصول یافت نشد</div>
      ) : (
        <>
          <div className={styles.sortContainer}>
            <label htmlFor="sortOrder">مرتب سازی</label>
            <select
              id="sortOrder"
              className={styles.order}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">پیش فرض</option>
              <option value="highest">بیشترین قیمت</option>
              <option value="lowest">کمترین قیمت</option>
            </select>
          </div>
          <div className={styles.grid3Cols}>
            {filteredPerfumes.map((perfume) => (
              <Product perfume={perfume} key={perfume.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsList;
