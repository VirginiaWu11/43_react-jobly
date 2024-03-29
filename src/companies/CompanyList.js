import { useEffect, useState } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import SearchForm from "../common/SearchForm";

const CompanyList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    searchCompanies();
  }, []);

  async function searchCompanies(name) {
    let resp = await JoblyApi.getCompanies(name);
    setCompanies(resp);
    setIsLoading(false);
    return resp;
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <Grid container spacing={1} justifyContent="center" p={2}>
        <Grid item xs={8}>
          <SearchForm searchFor={searchCompanies} />
        </Grid>
        {companies.length ? (
          companies.map((company) => (
            <Grid item xs={8}>
              <CardActionArea
                component={Link}
                to={`/companies/${company.handle}`}
              >
                <CompanyCard key={company.handle} company={company} />{" "}
              </CardActionArea>
            </Grid>
          ))
        ) : (
          <Grid item xs={8}>
            <p>No companies found</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CompanyList;
