import SignInButton from "@/app/_components/SignInButton";
import styles from "@/app/_styles/Login.module.css";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <section className={styles.section}>
      <div className={styles.loginContainer}>
        <h2 className={styles.h2}>وارد شدن با حساب گوگل </h2>
        <div className={styles.google}>
          <SignInButton />
        </div>
      </div>
    </section>
  );
}
