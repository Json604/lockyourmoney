import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"
import Works from "./pages/Works"
import Features from "./pages/Features"
import Navbar from "./components/Navbar";
import './App.css'

export default function App(){
  return(
    <>
    <Router>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='works' element={<Works />} />
        <Route path='feautures' element={<Features />} />
      </Routes>

    </Router>
    </>

  )
}