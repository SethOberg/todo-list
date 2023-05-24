import React from "react";
import "../styles/LoginPage.css";
import LoginForm from "../Components/LoginForm.js";
import SnackBarComponent from "../Components/SnackBarComponent.js";

const LoginPage = () => {
  return (
    <div>
      <p>Welcome back!</p>
      <LoginForm />
      {/* <div class="box"></div> */}
    </div>
  );
};

export default LoginPage;
