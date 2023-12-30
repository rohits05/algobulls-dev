import React, { useState } from "react";
import HomePage from "./HomeContext";
// import { Router } from "react-router-dom";
import SignInPage from "./SignInPageContext";
import SignUpPage from "./SignUpPageContext";

import { useContext } from "react";
// import { icons } from "antd/es/image/PreviewGroup";
import { AuthContext } from "../context/AuthContext";
import { Button, Row, Col } from "antd";


const UserPreview: React.FC = () => {
  const userContext = useContext(AuthContext);

  const [toggleSignIn, setToggleSignIn] = useState(true);
  const handleToggle = () => {
    setToggleSignIn(!toggleSignIn);
  };

  if (userContext && userContext.isLoggedIn) {
    return <HomePage />;
  } else {
    return (
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={8} style={{ textAlign: "center" }}> 
        {/* Proving User Choice for registration */}
          {toggleSignIn ? <SignInPage /> : <SignUpPage />}
          <Button
            type="link"
            onClick={handleToggle}
            style={{ marginTop: "16px", borderRadius: "38px", }}
          >
            {toggleSignIn
              ? "New User? - Sign Up"
              : "Already have an account? - Sign In"}
          </Button>
        </Col>
      </Row>
    );
  }
};

export default UserPreview;
