import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import TodolistPage from "./Pages/TodolistPage";
import Header from "./Components/Header";
import { UserContextProvider } from "./Contexts/UserContext";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/todos" element={<TodolistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
