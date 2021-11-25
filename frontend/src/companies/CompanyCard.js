import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

const CompanyCard = ({ company }) => {
  return (
    <Card
      sx={{ minWidth: 275, display: "flex", justifyContent: "space-between" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {company.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Number of Employees: {company.numEmployees}
          </Typography>
          <Typography variant="body2">{company.description}</Typography>
        </CardContent>
      </Box>
      {company.logoUrl && (
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            width: "8rem",
            display: { xs: "none", sm: "block" },
          }}
          image={company.logoUrl}
          alt={`${company.name} logo`}
        />
      )}
    </Card>
  );
};
export default CompanyCard;
