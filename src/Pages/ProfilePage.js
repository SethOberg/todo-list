import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const ProfilePage = () => {
  const { data } = useContext(UserContext);

  function printName() {
    console.log(data);
  }

  return (
    <>
      <p>Profile page</p>
      <p>{data.name}</p>
    </>
  );
};

export default ProfilePage;
