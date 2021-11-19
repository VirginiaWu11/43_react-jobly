import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Home";
import JobList from "./JobList";
import CompanyList from "./CompanyList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
      <Route exact path="/profile" element={<ProfileForm />} />
      <Route exact path="/jobs" element={<JobList />} />
      <Route exact path="/companies" element={<CompanyList />} />
      <Route exact path="/companies/:name" element={<JobList />} />

      <Route element={<p>not found</p>}></Route>
    </Routes>
  );
};

export default AllRoutes;
