import { Button, Grid, IconButton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import "../styles/TodoListPage.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TodolistPage = () => {
  const { data, updateData } = useContext(UserContext);

  useEffect(() => {
    // Function to be triggered once the component is mounted/loaded
    fetchTodoLists();
    // Clean-up function (optional)
    return () => {
      // Perform any clean-up tasks if needed
    };
  }, []); // Empty dependency array to run the effect only once

  const fetchTodoLists = async (uuid) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:8080/person/getByName/${uuid}`,
        requestOptions
      );
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkData = () => {
    console.log("Hejsan");
    console.log(data);
  };

  //Todo
  const addNewTodoList = () => {
    console.log("Todo");
  };

  const handleExpandClick = (id) => {
    console.log("Clicked todo list ID:", id);
  };

  return (
    <div>
      <p>My todo lists</p>

      <ul id="todolists">
        {data.todoLists.map((todolist) => (
          <li>
            <Grid container alignItems="center">
              <Grid item xs>
                {todolist.name}
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleExpandClick(todolist.id)}>
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            </Grid>
          </li>
          // <li key={todolist.id}>
          //   {todolist.name}
          //   <IconButton onClick={() => handleExpandClick(todolist.id)}>
          //     <ExpandMoreIcon />
          //   </IconButton>
          // </li>
        ))}
      </ul>

      {/* <Button variant="contained" color="primary" onClick={checkData}>
        Check data
      </Button>
      <Button variant="contained" color="primary" onClick={addNewTodoList}>
        Create new
      </Button> */}

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={checkData}>
            Check data
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={addNewTodoList}>
            Create new
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodolistPage;
