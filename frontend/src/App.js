import "./App.css";
import { BrowserRouter } from "react-router-dom";

import AllRoutes from "./AllRoutes";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <AllRoutes />
          </Grid>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
