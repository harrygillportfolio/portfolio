import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import ScrollProgress from './Components/ScrollProgress';
import RandomThemeButton from './Components/ThemeToggle';
import Particles from './Components/Particles';
import EasterEgg from './Components/EasterEgg';
import SpotifyWidget from './Components/SpotifyWidget';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  const [isGameVisible, setIsGameVisible] = useState(false);

  const toggleGame = () => {
    setIsGameVisible(prevState => !prevState);
  };

  return (
    <ThemeProvider>
      <Router>
        <ScrollProgress />
        <RandomThemeButton />
        <Particles density={100} />
        <SpotifyWidget />
        <EasterEgg />
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route index element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Projects" element={<Projects />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <ScrollToTop />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}




export default App; 