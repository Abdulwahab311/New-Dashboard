import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import New2Healthcare from "./New2HealthCareContractPhase/layout/Layout.jsx";
import New2dashboard from "./New2HealthCareContractPhase/pages/Dashboard.jsx";
import New3Healthcare from "./New3HealthcareContractPhase/layout/Layout.jsx";
import New3dashboard from "./New3HealthcareContractPhase/pages/Dashboard.jsx";
import New4dashboard from "./New4HealthcareContractPhase/pages/Dashboard.jsx";
import New4Healthcare from "./New4HealthcareContractPhase/layout/Layout.jsx";

import New2industrydashboard from "./New2industryContractPhase/pages/Dashboard.jsx"
import New2industrydashboardlayout from "./New2industryContractPhase/layout/Layout.jsx"
import New3industrydashboard from "./New3industryContractPhase/pages/Dashboard.jsx"
import New3industrydashboardlayout from "./New3industryContractPhase/layout/Layout.jsx"
import New4industrydashboard from "./New4industryContractPhase/pages/Dashboard.jsx"
import New4industrydashboardlayout from "./New4industryContractPhase/layout/Layout.jsx"
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Healthcare  dashboard */}
        <Route
          path="/new2healthcare/dashboard"
          element={
            <New2Healthcare>
              <New2dashboard />
            </New2Healthcare>
          }
        />

       
        <Route
          path="/new3healthcare/dashboard"
          element={
            <New3Healthcare>
              <New3dashboard />
            </New3Healthcare>
          }
        />
        <Route
          path="/new4healthcare/dashboard"
          element={
            <New4Healthcare>
              <New4dashboard />
            </New4Healthcare>
          }
        />

        {/* Industry  dashboard */}

        <Route
          path="/new2industry/dashboard"
          element={
            <New2industrydashboardlayout>
              <New2industrydashboard />
            </New2industrydashboardlayout>
          }
        />

    
        <Route
          path="/new3industry/dashboard"
          element={
            <New3industrydashboardlayout>
              <New3industrydashboard />
            </New3industrydashboardlayout>
          }
        />
        <Route
          path="/new4industry/dashboard"
          element={
            <New4industrydashboardlayout>
              <New4industrydashboard />
            </New4industrydashboardlayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
