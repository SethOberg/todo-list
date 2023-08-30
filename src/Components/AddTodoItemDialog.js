import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function AddTodoItemDialog({ open, onClose, onAdd, todoListId }) {
  const [todoDescription, setTodoDescription] = useState("");

  const handleAddClick = () => {
    // Perform any necessary validation here before adding the item
    if (todoDescription.trim() === "") {
      // You can show an error message or handle it as needed
      return;
    }

    // Call the onAdd function with the todoDescription and todoListId
    onAdd(todoDescription, todoListId);

    // Clear the input field
    setTodoDescription("");

    // Close the dialog
    onClose();
  };

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
