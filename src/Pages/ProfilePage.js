import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage = () => {
  const { data } = useContext(UserContext);

  function printName() {
    console.log(data);
  }

  return (
    <>
      <AccountCircleIcon style={{ fontSize: 50 }} />
      <p>{data.name}</p>
    </>
  );
};

export default ProfilePage;
