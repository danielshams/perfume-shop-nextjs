import React from "react";
import styles from "../_styles/Product.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import "@/app/_styles/customSwal.module.css";

interface Perfume {
  id: number;
  name: string;
  image: string;
  price: string | number;
}

interface ProductProps {
  perfume: Perfume | null;
}

export function Product({ perfume }: ProductProps) {
  const { data: session } = useSession();

  if (!perfume) {
    return null;
  }
  const { id } = perfume;

  const handleViewClick = () => {
    if (!session) {
      Swal.fire({
        title: "لطفا اول وارد حساب خود شوید",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ورود به حساب",
        cancelButtonText: "لغو",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/Login";
        }
      });
    } else {
      window.location.href = `/ProductDetails/${id}`;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.productBox}>
        <div className={styles.productsDetails}>
          <div className={styles.productImageContainer}>
            <Image
              className={styles.productImage}
              src={perfume.image}
              alt="product"
              width={300}
              height={300}
            />
          </div>

          <p className={styles.productName}>{perfume.name}</p>
          <p className={styles.productPrice}>قیمت : {perfume.price}</p>
          <button className={styles.productBut} onClick={handleViewClick}>
            مشاهده
          </button>
        </div>
      </div>
    </section>
  );
}
