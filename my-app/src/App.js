// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Header from './files/header';
import Toggle from './files/body';
import Projects from './files/projects'
import Experiance from './files/experiance'
import Contact from './files/contact'

function App() {
  return (
< >
    <Header/>
    <Projects/>
    <Experiance/>
    <Contact/>
</>
  );
}

export default App;
