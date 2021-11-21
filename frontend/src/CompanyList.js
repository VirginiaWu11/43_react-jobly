import { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const CompanyList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    searchCompanies(companies);
  }, []);

  async function searchCompanies(name) {
    let resp = await JoblyApi.getCompanies(name);
    setCompanies(resp);
    console.log(resp);
    setIsLoading(false);
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
      <Grid container spacing={1} justifyContent="center" p={2}>
        <SearchForm searchFor={searchCompanies} />

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
          <p>No companies found</p>
        )}
      </Grid>
    </div>
  );
};

export default CompanyList;
