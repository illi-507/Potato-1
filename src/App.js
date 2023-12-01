////NODE_OPTIONS=--openssl-legacy-provider
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Profile from "./components/Login/Profile";
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout />} />
        <Route exact path="/profile" element={<Profile />} />
        
      </Routes>
    </Router>
  );
}

export default App;
