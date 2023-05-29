import React from "react";
import "../styles/LoginPage.css";
import LoginForm from "../Components/LoginForm.js";
import SnackBarComponent from "../Components/SnackBarComponent.js";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>Welcome back!</p>
      <LoginForm />
      <p>
        Not already a user? <br />
        <Link to="/signup">Create an account</Link>{" "}
      </p>
      {/* <div class="box"></div> */}
    </div>
  );
};

export default LoginPage;
