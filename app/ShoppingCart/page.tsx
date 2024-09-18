"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  CartContext,
  CartContextType,
  CartItemType as ImportedCartItemType,
} from "../_components/CartContext";
import NavBarServer from "../_components/NavBarServer";
import { useSession } from "next-auth/react";
import styles from "../_styles/ShoppingCart.module.css";
import Spinner from "../loading";

export default function ShoppingCart() {
  const { cart, setCart, removeFromCart } =
    useContext<CartContextType>(CartContext);
  const [toastShown, setToastShown] = useState<boolean>(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  }, [setCart]);

  const handleRemoveFromCart = (id: number) => {
    Swal.fire({
      title: "آیا از حذف این محصول اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!بله، حذف کن",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        if (!toastShown) {
          toast.success(".محصول با موفقیت حذف شد", {
            onClose: () => setToastShown(false),
          });
          setToastShown(true);
        }
      }
    });
  };

  const calculateTotal = (): number => {
    return cart.reduce(
      (total: number, item: ImportedCartItemType) =>
        total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <NavBarServer showSearch={false} hideUserIcon={true} session={session} />
      <div className={styles.allAddedProducts}>
        {cart.length > 0 ? (
          cart.map((item: ImportedCartItemType) => (
            <div className={styles.addedProduct} key={item.id}>
              <Image
                className={styles.addedProductImage}
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
              <h2 className={styles.addedProductName}>{item.name}</h2>
              <p className={styles.addedProductPrice}>قیمت: {item.price}</p>
              <p className={styles.addedProductQuantity}>{item.quantity} عدد</p>

              <button
                className={styles.deleteAddedProduct}
                onClick={() => handleRemoveFromCart(item.id)}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className={styles.shoppingCartTitle}>
            سبد خرید شما در حال حاضر خالیست.
          </p>
        )}
        {cart.length > 0 && (
          <div className={styles.totalCost}>
            <h2 className={styles.totalPrice}>
              مجموع خرید شما: {calculateTotal()} تومان
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
