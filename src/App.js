import React from "react";
import './App.scss';
import Header from './Components/Header.js';
import HomeBanner from "./Components/HomeBanner";
import Login from "./Components/Login";
import Banner from "./Components/Banner";
import List from "./Components/List";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={
            <React.Fragment>
              <Header/>
              <HomeBanner/>
            </React.Fragment>
          }/>
          <Route path="/login" element={
            <React.Fragment>
              <Header/>
              <Login/>
            </React.Fragment>
          }/>
          <Route path="/register" element={
            <React.Fragment>
              <Header/>
              <Login/>
            </React.Fragment>
          }/>
          <Route path="/dashboard" element={
            <React.Fragment>
              <Header/>
              <Banner/>
              <List title="Netflix Originals" param="originals"/>
              <List title="Trending Now" param="trending"/>
              <List title="Now Playing" param="now_playing"/>
              <List title="popular" param="popular"/>
              <List title="Top Rated" param="top_rated"/>
              <List title="Upcoming" param="upcoming"/>
            </React.Fragment>
          }/>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;

//import "./App.scss";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "./Components/Home/Home";
//import Header from "./Components/Header/Header";


//function App() {
  ////return (
    //<Router>
    //<Header />
    //<Routes>
     // <Route path="/" element={<Home />} />
   // </Routes>
  //</Router>
 // );
//}

//export default App;
