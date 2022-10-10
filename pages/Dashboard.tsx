import { useRouter } from "next/router";
import { useUser } from "../hooks/UseUser";
import SignIn from "./login/SignIn";

export default function Dashboard() {
  const user = useUser();

  if (!user) {
    return <SignIn />;
  }

  console.log(user);

  return (
    <div className="flex flex-col mt-10">
      <h3>
        <strong>{user.username}</strong>
      </h3>

      <ul>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
      </ul>
      <strong>Authorities:</strong>
      <ul>
        {user.roles &&
          //   @ts-ignore
          user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
}
