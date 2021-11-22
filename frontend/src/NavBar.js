import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function NavBar({ signout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button component={Link} to="/" color="inherit">
            Jobly
          </Button>
        </Typography>
        <Button component={Link} to="/jobs" color="inherit">
          Jobs
        </Button>
        <Button component={Link} to="/companies" color="inherit">
          Companies
        </Button>
        <Button component={Link} to="/profile" color="inherit">
          Profile
        </Button>
        <Button component={Link} to="/" color="inherit" onClick={signout}>
          Logout
        </Button>
        <Button component={Link} to="/signin" color="inherit">
          Sign In
        </Button>
        <Button component={Link} to="/signup" color="inherit">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
}
