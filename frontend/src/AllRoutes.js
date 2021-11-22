import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Home";
import JobList from "./JobList";
import CompanyList from "./CompanyList";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import CompanyDetail from "./CompanyDetail";

const AllRoutes = ({ signup }) => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signin" element={<SigninForm />} />
      <Route exact path="/signup" element={<SignupForm signup={signup} />} />
      <Route exact path="/profile" element={<ProfileForm />} />
      <Route exact path="/jobs" element={<JobList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/companies" element={<CompanyList />} />

      <Route element={<p>not found</p>}></Route>
    </Routes>
  );
};

export default AllRoutes;
