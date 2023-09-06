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
import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../Contexts/UserContext";
import "../styles/TodoListPage.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/system";
import TodoDialog from "../Components/TodoDialog";
import SnackBarComponent from "../Components/SnackBarComponent";
import { SnackbarSeverity } from "../Const/SnackbarSeverity";
import AddTodoItemDialog from "../Components/AddTodoItemDialog";

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
  const [dialogTodoItemOpen, setDialogTodoItemOpen] = useState(false);
  const [todoName, setTodoName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const snackbarRef = useRef(null);
  const [selectedId, setSelectedId] = useState("");

  const handleAddNewTodoItem = (todoDescription, todoListId) => {
    console.log(
      `Adding todo item '${todoDescription}' to todo list with ID ${todoListId}`
    );

    fetchPersonById(data.uuid);

    setDialogTodoItemOpen(false);
  };

  async function fetchPersonById(id) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:8080/person/${id}`,
        requestOptions
      );
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        //snackbarRef.current.openSnackbar("User found", "success");
        updateData(result);
        console.log(data);
        //navigate("/todos");
      } else {
        //snackbarRef.current.openSnackbar("User not found", "error");
        //postData();
      }
    } catch (error) {
      console.log("error", error);
      //snackbarRef.current.openSnackbar("Error occurred", "error");
    }
  }

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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

  const addNewTodoListItem = (todolistId) => {
    setSelectedId(todolistId);
    console.log("Todo, add new item");
    setDialogTodoItemOpen(true);
  };

  // const markTodolistCompleted = (todolistId) => {
  //   console.log("Todo list id: " + todolistId);
  //   console.log("Todo, mark todolist completed");
  //   console.log("Data stored: " + data.name);
  // };

  async function markTodolistCompleted(todolistId) {
    try {
      const response = await fetch(
        `http://localhost:8080/todolists/complete/${todolistId}`,
        {
          method: "PUT",
        }
      );

      // Check if the response status is in the 200-299 range for success
      if (!response.ok) {
        snackbarRef.current.openSnackbar("Failed to update", "error");
        throw new Error(`Request failed with status ${response.status}`);
      }

      fetchPersonById(data.uuid);

      snackbarRef.current.openSnackbar(
        "Todo list marked as completed",
        "success"
      );

      // Request succeeded
      console.log(
        `Todo list with ID ${todolistId} has been updated successfully.`
      );
    } catch (error) {
      console.error("Error:", error);
      snackbarRef.current.openSnackbar("Error occurred", "error");
      throw error; // Rethrow the error for handling at a higher level if needed
    }
  }

  const removeTodoList = async (todolistId) => {
    const url = `http://localhost:8080/todolists/${todolistId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type if needed
          // You can add any additional headers here if required
        },
      });

      if (response.ok) {
        console.log(`Todo, remove todolist with id: ${todolistId} - Success`);
        snackbarRef.current.openSnackbar("Todo list removed", "success");
        fetchPersonById(data.uuid);
      } else {
        console.error(`Error removing todolist with id: ${todolistId}`);
        snackbarRef.current.openSnackbar("Error removing todolist", "error");
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      snackbarRef.current.openSnackbar("Error occurred", "error");
    }
  };

  const removeLater = (id) => {
    markTodolistCompleted(id);
  };

  async function markTodolistItemCompleted(todolistItemId) {
    try {
      const response = await fetch(
        `http://localhost:8080/todolistitems/${todolistItemId}`,
        {
          method: "PUT",
        }
      );

      // Check if the response status is in the 200-299 range for success
      if (!response.ok) {
        snackbarRef.current.openSnackbar("Failed to update", "error");
        throw new Error(`Request failed with status ${response.status}`);
      }

      fetchPersonById(data.uuid);
      //const responseData = await response.json();

      //console.log(responseData);

      snackbarRef.current.openSnackbar(
        "Todo item updated successfully",
        "success"
      );

      // Request succeeded
      console.log(
        `Todo list item with ID ${todolistItemId} has been updated successfully.`
      );
    } catch (error) {
      console.error("Error:", error);
      snackbarRef.current.openSnackbar("Error occurred", "error");
      throw error; // Rethrow the error for handling at a higher level if needed
    }
  }

  const removeTodoListItem = (todoItemId) => {
    console.log("Todo, remove todolist item");
    removeTodoListItemRequest(todoItemId);
  };

  async function removeTodoListItemRequest(id) {
    try {
      // Define the URL for the DELETE request
      const url = `http://localhost:8080/todolistitems/${id}`;

      // Configure the request options
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers your API requires
        },
      };

      // Use "await" to make the DELETE request and wait for the response
      const response = await fetch(url, requestOptions);

      // Check if the response status is OK (usually 200 for successful DELETE)
      if (response.ok) {
        // The todo list item has been successfully deleted
        console.log(`Todo list item with ID ${id} has been deleted.`);
        snackbarRef.current.openSnackbar("Todo item removed", "success");

        const updatedData = {
          ...data,
          todoLists: data.todoLists.map((todoList) => ({
            ...todoList,
            todoListItems: todoList.todoListItems.filter(
              (item) => item.id !== id
            ),
          })),
        };

        updateData(updatedData);

        // Perform any additional actions if needed
      } else {
        // Handle the case when the response status is not OK
        console.error(`Failed to delete todo list item with ID ${id}.`);
        // Handle the error, e.g., show an error message to the user
        snackbarRef.current.openSnackbar("Could not remove item", "error");
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error);
      snackbarRef.current.openSnackbar("Something went wrong", "error");
    }
  }

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
                      onClick={() => markTodolistItemCompleted(todoItem.id)}
                    >
                      {/* <RadioButtonUncheckedIcon /> */}
                      {todoItem.completed ? (
                        <CheckCircleOutlineIcon style={{ color: "green" }} />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="Remove"
                      style={{ color: "#a53817" }}
                      onClick={() => removeTodoListItem(todoItem.id)}
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
                  onClick={() => addNewTodoListItem(todoList.id)}
                >
                  <AddCircleIcon />
                </IconButton>
                <IconButton
                  aria-label="CheckAll"
                  onClick={() => markTodolistCompleted(todoList.id)}
                >
                  {todoList.completed ? (
                    <CheckCircleOutlineIcon style={{ color: "green" }} />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </IconButton>
                <IconButton
                  aria-label="RemoveAll"
                  style={{ color: "#a53817" }}
                  onClick={() => removeTodoList(todoList.id)}
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
        snackbar={snackbarRef}
        open={dialogOpen}
        onClose={handleDialogClose}
        onCreate={handleTodoCreate}
      />
      <SnackBarComponent ref={snackbarRef} />
      <AddTodoItemDialog
        snackbar={snackbarRef}
        open={dialogTodoItemOpen}
        onClose={() => setDialogTodoItemOpen(false)}
        onAdd={handleAddNewTodoItem}
        todoListId={selectedId}
      />
    </div>
  );
};

export default TodolistPage;
