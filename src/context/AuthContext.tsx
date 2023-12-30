import React, { createContext, useState, useEffect, ReactNode } from "react";
// import UserPreview from "../pages/UserPreview";

interface User {
  _id?: string;
  email?: string;
  isLoggedIn: boolean;
  name?: string;
  password?: string;
  profilephoto?: {
    type: string;
  };
  username?: string;
  __v?: number;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  name?:string;
  _id?: string;
  email?: string;
  password?: string;
  profilephoto?: {
    type: string;
  };
  username?: string;
  __v?: number;
  login: (retrievedUserData: User) => void;
  logout: () => void;
  
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    _id: "",
    email: "",
    isLoggedIn: false,
    name: "",
    password: "",
    username: "",
    __v: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (retrievedUserData: User) => {
    setUser({ ...retrievedUserData, isLoggedIn: true });

    localStorage.setItem(
      "user",
      JSON.stringify({ ...retrievedUserData, isLoggedIn: true })
    );
  };

  const logout = () => {
    setUser({
      _id: "",
      email: "",
      isLoggedIn: false,
      name: "",
      password: "",
      username: "",
      __v: 0,
    });

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ ...user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
