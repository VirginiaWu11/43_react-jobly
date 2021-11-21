import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const JobCard = ({ job }) => {
  return (
    <Card sx={{ minWidth: 275, display: "flex" }}>
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
    </Card>
  );
};
export default JobCard;
