import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
