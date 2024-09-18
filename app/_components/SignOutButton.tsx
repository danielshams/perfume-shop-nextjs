import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  const handleSignOut = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    Swal.fire({
      title: "آیا مطمئنید می‌خواهید از حساب خارج شوید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!بله، خارج شو",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutAction();
        toast.success(".شما با موفقیت خارج شدید");
      }
    });
  };

  return (
    <form onSubmit={handleSignOut}>
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <span>خارج شدن از حساب کاربری</span>
      </button>
    </form>
  );
}

export default SignOutButton;
