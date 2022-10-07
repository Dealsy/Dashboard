import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import SignIn from "./login/SignIn";

interface Props {
  username: string;
  accessToken: string;
  id: string;
  email: string;
  roles: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Props>();

  const logOut = () => {
    AuthService.logout();
    router.push("/login/SignIn");
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      window.location.href = "/login";
    }
    setCurrentUser(user);
  }, []);

  if (!currentUser) {
    return <SignIn />;
  }

  return (
    <div className="flex flex-col mt-10">
      <h3>
        <strong>{currentUser.username}</strong> Profile
      </h3>

      <ul>
        <li>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </li>
        <li>
          <strong>Id:</strong> {currentUser.id}
        </li>
        <li>
          <strong>Email:</strong> {currentUser.email}
        </li>
      </ul>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          //   @ts-ignore
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      <button onClick={logOut}>log out</button>
    </div>
  );
}
