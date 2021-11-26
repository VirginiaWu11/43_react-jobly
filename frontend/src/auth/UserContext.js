import React, { useState, useContext, useEffect } from "react";
import JoblyApi from "../api";
import useLocalStorage from "../hooks/useLocalStorage";
import jwt from "jsonwebtoken";

export const UserContext = React.createContext();
export const TOKEN_STORAGE_ID = "jobly-token";

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);

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
      console.debug("appjs", { updatedUser });
      return { success: true, updatedUser };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }
  const applyToJob = async (jobId) => {
    if (hasAppliedToJob(jobId)) return;
    try {
      JoblyApi.applyToJob(currentUser.username, jobId);
      setApplicationIds(new Set([...applicationIds, jobId]));
    } catch (err) {
      console.error("applyToJob failed", err);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    applicationIds,
    setApplicationIds,
    token,
    setToken,
    signup,
    signin,
    signout,
    updateProfile,
    hasAppliedToJob,
    applyToJob,
    infoLoaded,
    setInfoLoaded,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
