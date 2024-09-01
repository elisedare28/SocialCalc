import { useState } from 'react'
import './App.css'
import Spreadsheet from './components/Spreadsheet/Spreadsheet'
import FileHandler from './components/FileHandler'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './components/Signup'
import Login from './components/Login'
import "./index.css"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/" element={<Spreadsheet/>}/>

    </Routes>
  </BrowserRouter>
  );
}

export default App
