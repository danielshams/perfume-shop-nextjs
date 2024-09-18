import Link from "next/link";

export default function page() {
  return (
    <div >
      <h2>لطفا اول وارد حساب کاربری خود شوید :</h2>
      <Link href="/Login">وارد شدن با حساب گوگل</Link>
    </div>
  );
}
