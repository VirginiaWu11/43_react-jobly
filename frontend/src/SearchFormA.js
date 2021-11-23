import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

function SearchFormA({ searchFor, companiesAutocomplete }) {
  const [searchTerm, setSearchTerm] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   searchFor(searchTerm.trim() || undefined);
  //   setSearchTerm(searchTerm.trim());
  // };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    searchFor(data.get("Search").trim() || undefined);

    console.log({
      username: data.get("Search"),
    });
  };

  return (
    <div>
      <form fullWidth onSubmit={handleSubmit}>
        <Grid container>
          <Grid item sx={{ flexGrow: 1 }}>
            <Autocomplete
              fullWidth
              freeSolo
              // disablePortal
              id="combo-box-demo"
              options={companiesAutocomplete.map((option) => option.name)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search" />}
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SearchFormA;
