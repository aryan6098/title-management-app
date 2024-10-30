import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const user = localStorage.getItem("user");

  return (
    <AppBar position="static">
        
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6">Title Management Application</Typography>
        </Box>
        {isAuthenticated && (
          <Box display="flex" alignItems="center">
            <Typography variant="body1" style={{ marginRight: "10px" }}>
              Welcome, {user}
            </Typography>
            <IconButton color="inherit" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        )}

       
      </Toolbar>
    </AppBar>
  );
};

export default Header;
