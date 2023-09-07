import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid, Button } from "@mui/material";
import "../styles/Profile.css";

const ProfilePage = () => {
  const { data, updateData } = useContext(UserContext);

  function printName() {
    console.log(data);
  }

  const logOutUser = () => {
    updateData(null);
  };

  const removeUser = async () => {
    console.log("Remove user");

    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:8080/person/${data.uuid}`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);

      if (response.ok) {
        updateData(null);
        console.log("Successfully logged out");
      }
    } catch (error) {
      console.log("error", error);
      console.log("could not log out");
    }
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
