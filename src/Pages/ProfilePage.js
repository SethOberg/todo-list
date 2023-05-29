import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid, Button } from "@mui/material";
import "../styles/Profile.css";

const ProfilePage = () => {
  const { data } = useContext(UserContext);

  function printName() {
    console.log(data);
  }

  const logOutUser = () => {
    console.log("Log out user");
  };

  const removeUser = () => {
    console.log("Remove user");
  };

  return (
    <>
      <AccountCircleIcon style={{ fontSize: 50 }} />
      <p id="name">{data.name}</p>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={logOutUser}>
            Log out
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={removeUser}
            style={{ backgroundColor: "#831c0a" }}
          >
            Remove account
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
