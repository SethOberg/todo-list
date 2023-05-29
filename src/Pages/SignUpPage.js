import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      SignUpPage
      <p>
        Already a user? <br />
        <Link to="/">Log in</Link>{" "}
      </p>
    </div>
  );
};

export default SignUpPage;
