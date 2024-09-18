"use client";

import { NavBar } from "@/app/_components/NavBar";
import styles from "@/app/_styles/ProductDetails.module.css";
import Spinner from "@/app/loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CartContext,
  CartContextType,
  CartItemType,
} from "../../_components/CartContext";
import { getPerfumes, PerfumeType } from "../../_lib/apiPerfumes";

export default function ProductDetails() {
  const { data: session } = useSession();

  const { id } = useParams();
  const [perfume, setPerfume] = useState<PerfumeType | null>(null);
  const [count, setCount] = useState<number>(1);
  const [buttonText, setButtonText] = useState<string>("افزودن به سبد خرید");

  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [toastShown, setToastShown] = useState<boolean>(false);
  const { cart, setCart } = useContext<CartContextType>(CartContext) || {
    cart: [],
    setCart: () => {},
  };



  useEffect(() => {
    if (id) {
      const fetchPerfume = async () => {
        const data = await getPerfumes();
        const selectedPerfume = data.find(
          (item: PerfumeType) => item.id === parseInt(id as string)
        );
        setPerfume(selectedPerfume || null);
      };
      fetchPerfume();
    }
  }, [id]);

  useEffect(() => {
    if (perfume) {
      const productInCart = cart.find(
        (item: CartItemType) => item.id === perfume.id
      );
      if (productInCart) {
        setButtonText("اضافه شد به سبد خرید");
        setIsAddedToCart(true);
        setCount(productInCart.quantity);
      } else {
        setButtonText("افزودن به سبد خرید");
        setIsAddedToCart(false);
      }
    }
  }, [cart, perfume]);

  const addToCart = () => {
    if (!perfume) return;

    const productInCart = cart.find(
      (item: CartItemType) => item.id === perfume.id
    );
    if (!productInCart) {
      const newCart: CartItemType[] = [
        ...cart,
        { ...perfume, quantity: count } as CartItemType,
      ];
      setCart(newCart);
      setButtonText("اضافه شد به سبد خرید");
      setIsAddedToCart(true);
      localStorage.setItem("cart", JSON.stringify(newCart));
      if (!toastShown) {
        toast.success("محصول با موفقیت به سبد خرید اضافه شد", {
          onClose: () => setToastShown(false),
        });
        setToastShown(true);
      }
    }
  };

  if (!perfume) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <NavBar showSearch={false} hideUserIcon={true} session={session} />{" "}
      <ToastContainer />
      <div className={styles.productDetails}>
        <Image
          className={styles.productDetailsImg}
          src={perfume.image}
          alt="Product"
          width={300}
          height={300}
        />

        <div className={styles.productDetailsOptions}>
          <h2 className={styles.productDetailsName}>{perfume.name}</h2>
          <p className={styles.productDetailsDes}>{perfume.description}</p>
          <p>نت اولیه: {perfume.firstnote}</p>
          <p>دومین نت: {perfume.secondnote}</p>
          <p>نت پایه: {perfume.mainnote}</p>
          <p className={styles.productDetailsCapacity}>
            تعداد موجود در انبار : {perfume.Capacity} عدد
          </p>
          <p className={styles.productPrices}>قیمت : {perfume.price}</p>
          <div className={styles.productDetailsCountBut}>
            <div className={styles.productDetailsCount}>
              <button
                className={styles.decreaseBut}
                disabled={count <= 1 || isAddedToCart}
                onClick={() => setCount(count - 1)}
              >
                -
              </button>
              {count}
              <button
                className={styles.increaseBut}
                disabled={count >= perfume.Capacity || isAddedToCart}
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>
            <button
              className={styles.addToCartBut}
              onClick={addToCart}
              disabled={isAddedToCart}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
