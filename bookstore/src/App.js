import React from "react";

import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import Create from "./pages/Create";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Books" Component={Books} />
        <Route path="/Create" Component={Create} />
      </Routes>
    </div>
  );
};

export default App;
