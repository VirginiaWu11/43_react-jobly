import Grid from "@mui/material/Grid";
import JobCard from "./JobCard";

const JobCardList = ({ jobs }) => {
  console.log("inside JobCardList", jobs);
  return (
    <div>
      <Grid container spacing={1} justifyContent="center" p={2}>
        {jobs.map((job) => (
          <Grid item xs={8}>
            <JobCard key={job.id} job={job} />{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default JobCardList;
