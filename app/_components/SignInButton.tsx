import { signInAction } from "../_lib/actions";
import Image from "next/image";
import styles from "@/app/_styles/SignInButton.module.css"

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className={styles.signInBut}>
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span className={styles.span}>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
