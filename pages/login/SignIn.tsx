import Button from "../../components/reuseable_components/Button";
import LoginCard from "../../components/login/LoginCard";
import AuthInput from "../../components/login/AuthInput";
import AuthService from "../../services/auth.service";
import { useState } from "react";
import { useRouter } from "next/router";
import AuthLink from "../../components/login/AuthLink";

export default function SignIn() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [mailerState, setMailerState] = useState({
    email: "",
  });

  console.log("state", mailerState);

  function handleStateChange(e: any) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onChangeUsername = (e: any) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    AuthService.login(username, password).then(
      () => {
        router.push("/");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const submitEmail = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;

        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          email: "",
        });
      });
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-indigo-300 via-indigo-400 to-purple-800">
      <LoginCard header={isLogin ? "Sign in" : "Forgot password"}>
        <form onSubmit={submitEmail} className="flex flex-col w-full gap-2">
          <AuthInput
            placeholder={isLogin ? "Username" : "Enter your email"}
            type={isLogin ? "text" : "email"}
            onChange={(e) => {
              isLogin ? onChangeUsername(e) : handleStateChange(e);
            }}
            name="email"
            value={mailerState.email}
          />
          {isLogin && (
            <AuthInput
              placeholder="Password"
              type="password"
              onChange={(e) => {
                onChangePassword(e);
              }}
            />
          )}
          {message && (
            <p className="text-red-500 text-center">
              {" "}
              Username or Password is wrong
            </p>
          )}
          <div className="flex flex-col justify-center">
            {isLogin && (
              <AuthLink
                text="Don't have an account?"
                linkText="Sign up"
                hrefPath="Register"
                className="mt-5"
              />
            )}
            {isLogin && (
              <Button
                text="Sign in"
                className="bg-indigo-500 text-white w-full  hover:bg-indigo-600"
                onClick={(e) => {
                  handleLogin(e);
                }}
              />
            )}
            {!isLogin && (
              <Button
                text="Send password reset link"
                className="bg-indigo-500 text-white w-full  hover:bg-indigo-600"
                onClick={() => {}}
              />
            )}

            <div className="flex justify-end">
              {!isLogin && (
                <Button
                  onClick={() => setIsLogin(true)}
                  className="text-indigo-400 text-sm border-0"
                  text="Back to login"
                  type="button"
                />
              )}
              {isLogin && (
                <Button
                  onClick={() => setIsLogin(false)}
                  className="text-indigo-400 text-sm border-0 w-32"
                  text="Forgot password?"
                  type="button"
                />
              )}
            </div>
          </div>
        </form>
      </LoginCard>
    </div>
  );
}
