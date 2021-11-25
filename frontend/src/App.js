import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";

import AllRoutes from "./AllRoutes";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import JoblyApi from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";

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
            let currentUserRes = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUserRes);
            console.log("in appjsRes:", currentUserRes, currentUser);

            setApplicationIds(new Set(currentUserRes.applications));
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            console.log("in appjsErr:", err);
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
  console.log("in appjs:", currentUser);

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

  const updateProfile = async (username, newUserData) => {
    try {
      let updatedUser = await JoblyApi.updateProfile(username, newUserData);
      return { success: updatedUser };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, updateProfile }}
        >
          <NavBar signout={signout} />
          <Box sx={{ flexGrow: 1 }}>
            <AllRoutes signin={signin} signup={signup} />
          </Box>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
