import styles from "../_styles/Main.module.css";

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return (
    <div className={styles.main}>
      <p className={styles.productsText}>محصولات</p>
      {children}
    </div>
  );
}
