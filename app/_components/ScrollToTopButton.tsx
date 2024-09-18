"use client"
import React, { useState, useEffect } from "react";
import styles from "../_styles/ScrollToTopButton.module.css";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <button
        onClick={scrollToTop}
        style={{ display: isVisible ? "inline" : "none" }}
        className={`${styles.scrollToTop} ${
          isVisible ? styles.slideUpBounce : ""
        }`}
      >
        ↑
      </button>
    </div>
  );
}
