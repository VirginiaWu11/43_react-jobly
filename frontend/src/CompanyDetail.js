import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const CompanyDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState([]);

  const { handle } = useParams();

  useEffect(() => {
    async function getCompany() {
      let comp = await JoblyApi.getCompany(handle);
      setCompany(comp);
      setIsLoading(false);
    }
    getCompany();
  }, [handle]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    company.jobs.length && (
      <div>
        <Grid container spacing={1} justifyContent="center" p={2}>
          <Typography variant="h4" display="block">
            {company.name}
          </Typography>
          <Typography variant="span" display="block">
            {company.description}
          </Typography>
          <JobCardList jobs={company.jobs} />)
        </Grid>
      </div>
    )
  );
};

export default CompanyDetail;
