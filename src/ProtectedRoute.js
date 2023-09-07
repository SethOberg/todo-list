import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
