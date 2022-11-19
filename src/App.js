import logo from './logo.svg';
import React,{useEffect, useState} from 'react'
import './App.css';
import Home from './Components/Home';
import Nav from './Components/Nav';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

function App() {
  return (
     <>
      <Home/>
     </>
  
  );
}

export default App;
