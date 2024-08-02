import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Scanner from "./Scanner";
import Home from "./home";
import ResultPage from "./ResultPage";
import FireExtinguisherStatus from "./FireExtinguisherStatus";
import Layercuz from "./Layer";
import "./App.css";

const App = () => {
  return (
    <Router basename="/mick">
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/fire-extinguisher-status" element={<FireExtinguisherStatus />} />
            <Route path="/mapper" element={<Layercuz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
