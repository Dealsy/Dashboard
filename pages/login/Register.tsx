import Button from "../../components/reuseable_components/Button";
import LoginCard from "../../components/login/LoginCard";
import AuthInput from "../../components/login/AuthInput";
import AuthService from "../../services/auth.service";
import { useState } from "react";
import { useRouter } from "next/router";
import AuthLink from "../../components/login/AuthLink";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const requiredFields = [username, email, password];

  const invalidFields = requiredFields.some((field) => field === "");
  const validFields = requiredFields.some((field) => field !== "");

  const onChangeUsername = (e: any) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e: any) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e: any) => {
    e.preventDefault();

    setMessage("");
    if (invalidFields) {
      setMessage("enables error messages");
    }
    if (validFields) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setMessage("");
          router.push("/login/SignIn");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-l from-yellow-300 via-orange-300 to-orange-400">
      <LoginCard header="Sign up">
        <form className="flex flex-col w-full gap-2">
          <AuthInput
            placeholder="Username"
            onChange={(e) => {
              onChangeUsername(e);
            }}
          />
          {username === ""
            ? message && (
                <p className="text-red-500 ml-3">Username is required</p>
              )
            : null}

          <AuthInput
            placeholder="Email"
            type="email"
            onChange={(e) => {
              onChangeEmail(e);
            }}
          />
          {email === ""
            ? message && <p className="text-red-500 ml-3">Email is required</p>
            : null}
          <AuthInput
            placeholder="Password"
            type="password"
            onChange={(e) => {
              onChangePassword(e);
            }}
          />

          {password === ""
            ? message && (
                <p className="text-red-500 ml-3">Pasword is required</p>
              )
            : null}

          <div className="flex flex-col justify-center">
            <Button
              text="Register"
              className="btn-blue"
              onClick={(e) => {
                handleRegister(e);
              }}
            />
          </div>
          <AuthLink text="Back to" linkText="Login" hrefPath="SignIn" />
        </form>
      </LoginCard>
    </div>
  );
}
