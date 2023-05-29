import "./App.css";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import TodolistPage from "./Pages/TodolistPage";
import Header from "./Components/Header";
import { UserContextProvider } from "./Contexts/UserContext";
import ProfilePage from "./Pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Header />
        <Container sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/todos"
              element={
                <ProtectedRoute>
                  <TodolistPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </UserContextProvider>
    </div>
  );
}

export default App;
