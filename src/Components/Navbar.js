// src/Components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css'; // Import the CSS for styling

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Directly toggle the game
  const toggleGame = () => {
    // Check if the toggle function exists in the window object
    if (typeof window.toggleEasterEgg === 'function') {
      window.toggleEasterEgg();
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">Mehar</span>
          </Link>
          <a 
            href={process.env.PUBLIC_URL + '/Randhawa-Meharvir Resume.pdf'}
            download="Randhawa-Meharvir Resume.pdf"
            className="btn btn-resume"
          >
            <i className="fas fa-download"></i> Resume
          </a>
        </div>

        <div className="navbar-right">
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul className="navbar-links">
              <li className={location.pathname.toLowerCase() === '/' ? 'active' : ''}>
                <Link to="/">Home</Link>
              </li>
              <li className={location.pathname.toLowerCase() === '/about' ? 'active' : ''}>
                <Link to="/About">About</Link>
              </li>
              <li className={location.pathname.toLowerCase() === '/projects' ? 'active' : ''}>
                <Link to="/Projects">Projects</Link>
              </li>
              <li className={location.pathname.toLowerCase() === '/contact' ? 'active' : ''}>
                <Link to="/Contact">Contact</Link>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-links game-button"
                  onClick={toggleGame}
                >
                  <i className="fas fa-gamepad"></i>
                </button>
              </li>
              <li className="nav-item">
                <a href="https://github.com/Meharvir" target="_blank" rel="noopener noreferrer" className="nav-links social-link">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li className="nav-item">
                <a href="https://www.linkedin.com/in/meharvir-randhawa-558b372a0/" target="_blank" rel="noopener noreferrer" className="nav-links social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
