import "./App.css";
import { BrowserRouter } from "react-router-dom";

import AllRoutes from "./AllRoutes";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <AllRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
