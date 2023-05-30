import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import "../styles/TodoListPage.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TodolistPage = () => {
  const accordionStyle = {
    background: "#eee",
    border: "1px solid #ccc",
    marginBottom: "10px",
    boxShadow: "none",
    borderRadius: "5px",
    textTransform: "capitalize",
  };

  const listItemStyle = {
    background: "#eee",
    border: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    borderRadius: "5px",
  };

  const accordionDetailsFooterStyle = {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "10px",
  };

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

      <div>
        {data.todoLists.map((todoList) => (
          <Accordion key={todoList.uuid} style={accordionStyle}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{todoList.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {todoList.todoListItems.map((todoItem) => (
                  <ListItem key={todoItem.id} style={listItemStyle}>
                    <ListItemText primary={todoItem.todoDescription} />
                    <IconButton aria-label="Check">
                      <RadioButtonUncheckedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Remove"
                      style={{ color: "#a53817" }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <div style={accordionDetailsFooterStyle}>
                <IconButton aria-label="Add" style={{ color: "#0c7936" }}>
                  <AddCircleIcon />
                </IconButton>
                <IconButton aria-label="CheckAll">
                  <RadioButtonUncheckedIcon />
                </IconButton>
                <IconButton aria-label="RemoveAll" style={{ color: "#a53817" }}>
                  <RemoveCircleIcon />
                </IconButton>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

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
