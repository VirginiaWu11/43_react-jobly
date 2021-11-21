import { BrowserRouter } from "react-router-dom";

import AllRoutes from "./AllRoutes";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Box sx={{ flexGrow: 1 }}>
          <AllRoutes />
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
