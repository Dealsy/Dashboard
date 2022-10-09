import AuthInput from "../../components/login/AuthInput";
import LoginCard from "../../components/login/LoginCard";
import Button from "../../components/reuseable_components/Button";

export default function ResetPassword() {
  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-500 via-blue-300 to-indigo-500">
      <LoginCard header="Reset password">
        <form className="flex flex-col ">
          <AuthInput onChange={() => {}} placeholder="New password" />
          <AuthInput onChange={() => {}} placeholder="Confirm new password" />
          <Button
            onClick={() => {}}
            text="Reset password"
            className="btn-blue"
          />
        </form>
      </LoginCard>
    </div>
  );
}
