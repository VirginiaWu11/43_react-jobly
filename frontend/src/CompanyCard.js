import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CompanyCard = ({ company }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {company.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Number of Employees: {company.numEmployees}
        </Typography>
        <Typography variant="body2">{company.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
export default CompanyCard;
