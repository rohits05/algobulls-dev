import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "antd";

const Logout: React.FC = () => {
  const user = useContext(AuthContext);
  const handleLogOut = () => {
    if (user) {
      user.logout();
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  };

  return (
    <div>
      <Button type="primary" danger onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
};

export default Logout;
