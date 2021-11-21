import { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import Grid from "@mui/material/Grid";

const CompanyList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let resp = await JoblyApi.getCompanies();
      setCompanies(resp);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <Grid container spacing={1} justifyContent="center" p={2}>
        {companies.map((company) => (
          <Grid item xs={10}>
            <CompanyCard key={company.handle} company={company} />{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CompanyList;
