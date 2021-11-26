import { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";
import Grid from "@mui/material/Grid";
import SearchForm from "../common/SearchForm";

const JobList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    searchJobs();
    setIsLoading(false);
  }, []);

  async function searchJobs(title) {
    let resp = await JoblyApi.getJobs(title);
    setJobs(resp);
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <Grid container spacing={1} justifyContent="center" pt={2}>
        <Grid item xs={8}>
          <SearchForm searchFor={searchJobs} />
        </Grid>
        {jobs.length ? (
          <JobCardList jobs={jobs} />
        ) : (
          <Grid item xs={8}>
            <p>No jobs found</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default JobList;
