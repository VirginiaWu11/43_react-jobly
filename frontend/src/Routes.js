import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./Home";
import JobList from "./JobList";
import CompanyList from "./CompanyList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

const Routes = () => {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/companies/:name">
          <JobList jobs={jobs} />
        </Route>
        <Route exact path="/companies">
          <CompanyList companies={companies} />
        </Route>
        <Route exact path="/jobs">
          <JobList jobs={jobs} />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <SignupForm />
        </Route>
        <Route exact path="/profile">
          <ProfileForm />
        </Route>
        <Route>
          <p>not found</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
