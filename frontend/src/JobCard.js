import React, { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import UserContext from "./UserContext";

const JobCard = ({ job }) => {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(
    function updateAppliedStatus() {
      setApplied(hasAppliedToJob(job.id));
    },
    [hasAppliedToJob, job.id]
  );

  const handleApply = async () => {
    if (hasAppliedToJob(job.id)) return;
    applyToJob(job.id);
    setApplied(true);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {job.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {job.companyName}
          </Typography>
          <Typography variant="body2">{`Salary: $${job.salary}`}</Typography>
          <Typography variant="body2">{`Equity: $${job.equity}`}</Typography>
        </CardContent>
      </Box>
      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={handleApply}
          size="large"
          disabled={applied}
          sx={{ mb: 2, mr: 2 }}
        >
          {applied ? "Applied" : "Apply"}
        </Button>
      </Grid>
    </Card>
  );
};
export default JobCard;
