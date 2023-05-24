import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SnackBarComponent from "./SnackBarComponent";
import { SnackbarSeverity } from "../Const/SnackbarSeverity";
import { UserContext } from "../Contexts/UserContext";

const LoginForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { data, updateData } = useContext(UserContext);
  const snackbarRef = useRef(null);
  const navigate = useNavigate();

  async function postData() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: username,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/person",
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      if (response.ok) {
        snackbarRef.current.openSnackbar("User added!", "success");
        navigate("/todos");
      } else {
        snackbarRef.current.openSnackbar("Error adding user", "error");
      }
    } catch (error) {
      console.log("error", error);
      snackbarRef.current.openSnackbar("Error occurred", "error");
    }
  }

  async function fetchPersonByName(name) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:8080/person/getByName/${name}`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      if (response.ok) {
        snackbarRef.current.openSnackbar("User found", "success");
        updateData(result);
        console.log(data);
        navigate("/todos");
      } else {
        snackbarRef.current.openSnackbar("User not found", "error");
        postData();
      }
    } catch (error) {
      console.log("error", error);
      snackbarRef.current.openSnackbar("Error occurred", "error");
    }
  }

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const inputStyle = {
    "&:focus": {
      borderColor: "#d66d27",
    },
  };

  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(username.length > 0 && username.length < 3);
  }, [username]);

  const handleChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleSubmit = () => {
    console.log("Log in user here");
    console.log(username);
    if (username.length === 0) {
      setError(true);
      snackbarRef.current.openSnackbar("Username too short", "error");
    } else {
      snackbarRef.current.openSnackbar("Username ok", "success");
    }

    fetchPersonByName(username);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Username"
          variant="outlined"
          InputProps={{ style: inputStyle }}
          value={username}
          onChange={handleChange}
          sx={{
            "& input:hover": {
              borderColor: "#d66d27",
            },
            "& input:focus": {
              borderColor: "#d66d27",
            },
          }}
          error={error}
          helperText={error ? "Username requires 3 letters" : ""}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#a65017",
          "&:hover": {
            backgroundColor: "#d66d27",
          },
        }}
        onClick={handleSubmit}
        disabled={error}
      >
        Log in
      </Button>
      <SnackBarComponent ref={snackbarRef} />
    </>
  );
};

export default LoginForm;
