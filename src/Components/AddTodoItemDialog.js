import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function AddTodoItemDialog({ snackbar, open, onClose, onAdd, todoListId }) {
  const [todoDescription, setTodoDescription] = useState("");

  const handleAddClick = () => {
    // Perform any necessary validation here before adding the item
    if (todoDescription.trim() === "") {
      // You can show an error message or handle it as needed
      return;
    }

    addTodoListItem(todoListId, todoDescription, false);
  };

  async function addTodoListItem(todoListId, todoDescription, completed) {
    const apiUrl = `http://localhost:8080/todolists/addTodoListItem/${todoListId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoDescription,
          completed,
        }),
      });

      if (!response.ok) {
        snackbar.current.openSnackbar("Error occurred, input not ok?", "error");
        throw new Error(`Failed to add todo list item: ${response.status}`);
      } else if (response.ok) {
        snackbar.current.openSnackbar("Todolist item added", "success");
        // Call the onAdd function with the todoDescription and todoListId
        onAdd(todoDescription, todoListId);
        // Clear the input field
        setTodoDescription("");
        // Close the dialog
        onClose();
      }

      // You can handle the response data here if needed
      const data = await response.json();
      return data; // or do something with the response data
    } catch (error) {
      console.error("Error adding todo list item:", error);
      snackbar.current.openSnackbar("Error occurred", "error");
      // Handle the error appropriately, e.g., show a message to the user
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Todo Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Todo Description"
          fullWidth
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddClick} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTodoItemDialog;
