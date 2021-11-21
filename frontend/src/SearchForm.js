import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <form fullWidth onSubmit={handleSubmit}>
        <Grid container>
          <Grid item sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              variant="filled"
              label="Search"
              placeholder="Search "
              onChange={handleChange}
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

export default SearchForm;
