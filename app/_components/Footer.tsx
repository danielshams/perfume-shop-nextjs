import React from "react";
import styles from "../_styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.footerFirstPart}>
          <h4 className={styles.h4}>محصولات</h4>
          <p>عطر اورجینال</p>
          <p>عطر عربی</p>
          <p>عطر شرکتی</p>
          <p>عطر مینیاتوری</p>
        </div>
        <div className={styles.footerLastPart}>
          <h4 className={styles.h4}>فرتینی</h4>
          <p>تماس با ما</p>
          <p>سوالات متداول</p>
        </div>
      </footer>
    </div>
  );
}
