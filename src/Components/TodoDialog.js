import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { UserContext } from "../Contexts/UserContext";

function TodoDialog({ open, onClose, onCreate }) {
  const [todoName, setTodoName] = useState("");
  const { data, updateData } = useContext(UserContext);

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleCreate = () => {
    onCreate(todoName);
    sendPutRequest();
    // console.log("Todo list name: " + todoName);
    // console.log("Person id: " + data.uuid);
    setTodoName(""); // Clear the input field
    onClose();
  };

  async function sendPutRequest() {
    try {
      // Define the URL for your PUT request
      console.log("UUID value: " + data.uuid);
      const url = `http://localhost:8080/person/addToDoList/${data.uuid}`; // Replace with your API endpoint

      // Define the data you want to send in the request body
      const dataToSend = {
        completed: false,
        name: todoName,
      };

      // Configure the request options
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
          // Add any other headers your API requires
        },
        body: JSON.stringify(dataToSend), // Convert data to JSON format
      };

      // Use "await" to make the PUT request and wait for the response
      const response = await fetch(url, requestOptions);

      // Check if the response status is OK (usually 200)
      if (response.ok) {
        // Parse the response data as JSON
        // const responseData = await response.json();
        // console.log("PUT request successful:", responseData);
        // Do something with the successful response data
      } else {
        // Handle the case when the response status is not OK
        console.error("PUT request failed with status:", response.status);

        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error);
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <p>Create a new todo list</p>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={todoName}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TodoDialog;
