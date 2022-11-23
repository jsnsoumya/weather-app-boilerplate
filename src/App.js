import React from "react";
import "./App.css";
import Weather from "./components/Weather";
import CountryFetch from "./components/CountryFetch";
import {Routes, Route, useNavigate} from 'react-router-dom';

function App() {
  // const navigate = useNavigate();
  // const navigateToDetails = () => {
  //   // 👇️ navigate to /contacts
  //   navigate('/details');
  // };
  // const navigateHome = () => {
  //   // 👇️ navigate to /
  //   navigate('/');
  // };

  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;