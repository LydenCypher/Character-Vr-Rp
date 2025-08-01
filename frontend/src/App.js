import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import About from "./components/About";
import Features from "./components/Features";
import Contact from "./components/Contact";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const testConnection = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log("✅ Backend connection successful:", response.data.message);
    } catch (e) {
      console.error("❌ Backend connection failed:", e.message);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;