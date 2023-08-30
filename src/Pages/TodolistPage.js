import {
  Accordion,
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
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import "../styles/TodoListPage.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/system";
import TodoDialog from "../Components/TodoDialog";

const TodolistPage = () => {
  // const accordionStyle = {
  //   background: "#eee",
  //   border: "1px solid #ccc",
  //   marginBottom: "10px",
  //   boxShadow: "none",
  //   "&:before": {
  //     display: "none",
  //   },
  //   borderRadius: "5px",
  //   textTransform: "capitalize",
  // };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [todoName, setTodoName] = useState("");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTodoCreate = (name) => {
    setTodoName(name);
  };

  const accordionSummaryStyle = {};

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

  const CustomAccordionDetails = styled(AccordionSummary)`
    border: 1px solid red;
  `;

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

  const addNewTodoListItem = () => {
    console.log("Todo, add new item");
  };

  const markTodolistCompleted = () => {
    console.log("Todo, mark todolist completed");
    console.log("Data stored: " + data.name);
  };

  const removeTodoList = () => {
    console.log("Todo, remove todolist");
  };

  const markTodolistItemCompleted = () => {
    console.log("Todo, mark todolist item completed");
  };

  const removeTodoListItem = () => {
    console.log("Todo, remove todolist item");
  };

  return (
    <div>
      <p>My todo lists</p>

      <div>
        {data.todoLists.map((todoList) => (
          <Accordion
            key={todoList.uuid}
            // style={accordionStyle}
            sx={{
              "& .MuiAccordion-root": { border: "none" },
              background: "#eee",
              border: "1px solid #ccc",
              marginBottom: "10px",
              boxShadow: "none",
              "&:before": {
                display: "none",
              },
              borderRadius: "5px",
              textTransform: "capitalize",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              style={accordionSummaryStyle}
            >
              <Typography>{todoList.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {todoList.todoListItems.map((todoItem) => (
                  <ListItem key={todoItem.id} style={listItemStyle}>
                    <ListItemText primary={todoItem.todoDescription} />
                    <IconButton
                      aria-label="Check"
                      onClick={markTodolistItemCompleted}
                    >
                      <RadioButtonUncheckedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Remove"
                      style={{ color: "#a53817" }}
                      onClick={removeTodoListItem}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <div style={accordionDetailsFooterStyle}>
                <IconButton
                  aria-label="Add"
                  style={{ color: "#0c7936" }}
                  onClick={addNewTodoListItem}
                >
                  <AddCircleIcon />
                </IconButton>
                <IconButton
                  aria-label="CheckAll"
                  onClick={markTodolistCompleted}
                >
                  <RadioButtonUncheckedIcon />
                </IconButton>
                <IconButton
                  aria-label="RemoveAll"
                  style={{ color: "#a53817" }}
                  onClick={removeTodoList}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
          >
            Create new
          </Button>
        </Grid>
      </Grid>
      <TodoDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onCreate={handleTodoCreate}
      />
    </div>
  );
};

export default TodolistPage;
