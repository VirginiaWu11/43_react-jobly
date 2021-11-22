import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";

import AllRoutes from "./AllRoutes";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import JoblyApi from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [infoLoaded, setInfoLoaded] = useState(false);

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            // put the token on the Api class so it can use it to call the API.
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  async function signup(signupData) {
    try {
      let token = await JoblyApi.register(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }
  console.log("app:", typeof signup);

  async function signin(loginData) {
    try {
      let token = await JoblyApi.signin(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function signout() {
    setCurrentUser(null);
    setToken(null);
  }

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
