import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import TodolistPage from "./Pages/TodolistPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/todos" element={<TodolistPage />} />
      </Routes>
    </div>
  );
}

export default App;
