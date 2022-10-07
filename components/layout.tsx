import { useRouter } from "next/router";
import { useEffect } from "react";
import SignIn from "../pages/login/SignIn";
import AuthService from "../services/auth.service";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  // Only the login paths are public right now
  const publicPath = router.pathname.includes("/login");

  //   const adminPath = router.pathname.startsWith('/admin')

  useEffect(() => {
    if (!AuthService.getCurrentUser() && !publicPath) {
      router.push("/login/SignIn");
    }
  }, [router, publicPath]);

  // Will require the user to be authenticated if not public
  // const { ready, user, isLoggedIn } = useAuth(!publicPath)

  if (publicPath) {
    // Using fragment to please the linter
    return <>{children}</>;
  }

  return (
    <>
      <main className="flex bg-gray-50">
        <div className="w-full">{children}</div>
      </main>
    </>
  );
}