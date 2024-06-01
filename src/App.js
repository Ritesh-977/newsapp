import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = ()=> {
  const [progress, setProgress] = useState(0);
  
    return (
      <div>
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}  />
        <Routes>
          <Route exact  path="/general" element = { <News setProgress = {setProgress } key ="general" pageSize ={6} country = "in" category = "general"/> } > </Route>
          <Route exact  path="/business" element = { <News setProgress = {setProgress } key ="bininess" pageSize ={6} country = "in" category = "business"/> } > </Route>
          <Route exact path="/sports" element = { <News setProgress = {setProgress } key ="sports" pageSize ={6} country = "in" category = "sports"/> } > </Route>
          <Route exact path="/science" element = { <News setProgress = {setProgress } key ="science" pageSize ={6} country = "in" category = "science"/> } > </Route>
          <Route exact path="/technology" element = { <News setProgress = {setProgress } key ="technology" pageSize ={6} country = "in" category = "technology"/> } > </Route>
          <Route exact path="/health" element = { <News setProgress = {setProgress } key = "health" pageSize ={6} country = "in" category = "health"/> } > </Route>
          <Route exact path="/entertainment" element = { <News setProgress = {setProgress } key ="entertainment" pageSize ={6} country = "in" category = "entertainment"/> } > </Route>
          </Routes>
      </Router>
      </div>
    );
  }
 export default App;