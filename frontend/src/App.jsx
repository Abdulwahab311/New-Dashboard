import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import New2Healthcare from "./New2HealthCareContractPhase/layout/Layout.jsx";
import New2dashboard from "./New2HealthCareContractPhase/pages/Dashboard.jsx";
import New3Healthcare from "./New3HealthcareContractPhase/layout/Layout.jsx";
import New3dashboard from "./New3HealthcareContractPhase/pages/Dashboard.jsx";
import New4dashboard from "./New4HealthcareContractPhase/pages/Dashboard.jsx";
import New4Healthcare from "./New4HealthcareContractPhase/layout/Layout.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Healthcare main dashboard */}
        <Route
          path="/new2healthcare/dashboard"
          element={
            <New2Healthcare>
              <New2dashboard />
            </New2Healthcare>
          }
        />

        {/* Healthcare main dashboard */}
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
      </Routes>
    </Router>
  );
};

export default App;
