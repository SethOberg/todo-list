import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, updateData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOutUser = () => {
    console.log("Log out user here");
    updateData(null);
  };

  const logInUser = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#81431a" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          TodoList
        </Typography>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/signup">
            Sign up
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/todos">
            Todo lists
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
            Profile
          </MenuItem>
          <Divider />

          {data === null && (
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              <Button variant="contained" color="primary" onClick={logInUser}>
                Log in
              </Button>
            </MenuItem>
          )}

          {data != null && (
            <MenuItem onClick={handleMenuClose}>
              <Button variant="contained" color="primary" onClick={logOutUser}>
                Log out
              </Button>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
