// Hooks/UseUser.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useRouter } from "next/router";

interface Props {
  username: string;
  accessToken: string;
  id: string;
  email: string;
  roles: string[];
}

type UserContextType = {
  children: React.ReactNode;
};

const initialUser = {
  username: "",
  accessToken: "",
  id: "",
  email: "",
  roles: [],
};

const UserContext = createContext<Props | undefined>(initialUser);

export function UserProvider({ children }: UserContextType) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Props>();

  useEffect(() => {
    const user: Props = AuthService.getCurrentUser();
    if (!user) {
      router.push("/login/SignIn");
    }
    setCurrentUser(user);
  }, [router]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
