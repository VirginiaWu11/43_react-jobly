import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AllRoutes from "./routes-nav/AllRoutes";
import NavBar from "./routes-nav/NavBar";
import Box from "@mui/material/Box";
import LoadingSpinner from "./common/LoadingSpinner";
import { useUserContext } from "./auth/UserContext";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const { signup, signin, signout, infoLoaded } = useUserContext();

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar signout={signout} />
        <Box sx={{ flexGrow: 1 }}>
          <AllRoutes signin={signin} signup={signup} />
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
