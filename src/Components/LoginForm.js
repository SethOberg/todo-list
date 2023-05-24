import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SnackBarComponent from "./SnackBarComponent";
import { SnackbarSeverity } from "../Const/SnackbarSeverity";

const LoginForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const snackbarRef = useRef(null);

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
  };

  // const handleButtonClick = () => {
  //   snackbarRef.current.openSnackbar("Hello Snackbar!", "success");
  // };

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
