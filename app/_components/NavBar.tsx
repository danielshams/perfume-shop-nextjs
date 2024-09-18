"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import styles from "../_styles/NavBar.module.css";
import { CartContext } from "./CartContext";
import { SearchContext } from "./SearchContext";

interface NavBarProps {
  showSearch?: boolean;
  session: any;
  hideUserIcon?: boolean;
}

export function NavBar({
  showSearch = true,
  hideUserIcon = false,
}: NavBarProps) {
  const { data: session } = useSession();
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("SearchContext must be used within a SearchProvider");
  }

  const { searchTerm, setSearchTerm } = searchContext;

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cart } = cartContext;
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [cartLength, setCartLength] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [hasAppeared, setHasAppeared] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    if (session && !localStorage.getItem("welcomeToastShown")) {
      toast.success(`${session?.user?.name}! خوش آمدید ,`);
      localStorage.setItem("welcomeToastShown", "true");
    }
  }, [session]);

  useEffect(() => {
    setCartLength(cart.length);
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasAppeared) {
        if (window.scrollY > lastScrollY.current) {
          setIsVisible(false);
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            setIsVisible(true);
            setHasAppeared(true);
          }, 1000);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hasAppeared]);

  function handleClick() {
    setIsClicked((isClicked) => !isClicked);
  }

  function handleSearchClick() {
    setIsSearchOpen((isSearchOpen) => !isSearchOpen);
    setIsClicked(false);
  }

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
      window.location.href = "/";
    }
  };

  const handleSignOut = () => {
    Swal.fire({
      title: "آیا مطمئنید می‌خواهید از حساب خارج شوید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!بله، خارج شو",
      cancelButtonText: "خیر",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut({ redirect: false }); // تغییر این خط
        toast.success(".شما با موفقیت خارج شدید");
        localStorage.removeItem("welcomeToastShown"); // Reset the flag on sign out
      }
    });
  };

  function handleClose(e: unknown) {
    const event = e as MouseEvent;
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setIsClicked(false);
      setIsSearchOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <div className={styles.headerContainer}>
      <ToastContainer />
      <header
        ref={navbarRef}
        className={`${styles.header} ${
          isVisible ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles.leftIcons}>
          {session?.user ? (
            <div className={styles.shopCounts}>
              <p className={styles.cartLength}>{cartLength}</p>
              <Link href="/ShoppingCart">
                <i className="fas fa-shopping-bag" id={styles.cartBtn}></i>
              </Link>
            </div>
          ) : (
            ""
          )}
          {showSearch && (
            <i className="fas fa-search" onClick={handleSearchClick}></i>
          )}

          {!hideUserIcon && session?.user?.image ? (
            <>
              <Image
                className={styles.userImage}
                width={25}
                height={25}
                alt="default-user.svg"
                src={session.user.image}
              />
              <i
                className="fa-solid fa-right-from-bracket"
                onClick={handleSignOut}
              ></i>
            </>
          ) : (
            !hideUserIcon && (
              <Link href="/Login">
                <i className="fas fa-user" id={styles.faUser}></i>
              </Link>
            )
          )}
        </div>

        <Link href="/" className={styles.logo}>
          <Image
            src="/logoipsum-329.svg"
            width="60"
            height="60"
            alt="logo"
            className={styles.logoPic}
          />
        </Link>

        <div className={styles.icons}>
          <div
            className={`${styles.searchBox} ${isSearchOpen ? styles.show : ""}`}
          >
            <input
              type="text"
              placeholder="جستجو . . ."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i
              className="fas fa-times"
              onClick={handleSearchClick}
              id={styles.closeSearch}
            ></i>
          </div>
          <div className={styles.mobile} onClick={handleClick}></div>
        </div>
      </header>
      {isClicked && (
        <div
          className={`${styles.overlay} ${isClicked ? styles.show : ""}`}
          onClick={handleClose}
        ></div>
      )}
    </div>
  );
}
