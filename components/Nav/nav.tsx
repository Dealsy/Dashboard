import AuthService from "../../services/auth.service";
import { useUser } from "../../hooks/UseUser";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const user = useUser();

  const logOut = () => {
    AuthService.logout();
    router.push("/login/SignIn");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 p-6 text-white">
      <div className="flex flex-col">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Logo</span>
        </div>
        <div className="mt-10">
          <div>Welcome {user?.username} </div>
        </div>
      </div>
    </nav>
  );
}
