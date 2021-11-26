import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AllRoutes from "./routes-nav/AllRoutes";
import NavBar from "./routes-nav/NavBar";
import Box from "@mui/material/Box";
import JoblyApi from "./api";
import jwt from "jsonwebtoken";
import LoadingSpinner from "./common/LoadingSpinner";
import { useUserContext } from "./auth/UserContext";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const { setCurrentUser, setApplicationIds, token, signup, signin, signout } =
    useUserContext();

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

            setApplicationIds(new Set(currentUserRes.applications));
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
    [token, setCurrentUser, setApplicationIds]
  );

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
