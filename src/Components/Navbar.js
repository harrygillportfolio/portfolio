import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';
import { TbGalaxy, TbUfo } from 'react-icons/tb';

const Navbar = () => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  // This closes navbar on link click (mobile usability)
  const handleNavLinkClick = () => setNavOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="navbar-left">
          <NavLink to="/" className="navbar-logo" end>
            <span className="logo-text">My Life.</span>
          </NavLink>
        </div>

        {/* Hamburger/toggle arrow for mobile */}
        <button
  className={`navbar-toggle${navOpen ? ' open' : ''}`}
  onClick={() => setNavOpen((prev) => !prev)}
  aria-label={navOpen ? "Close menu" : "Open menu"}
>
  {navOpen ? <TbUfo size={32} /> : <TbGalaxy size={32} />}
</button>
        {/* Links and Resume, collapsible on mobile */}
        <div className={`navbar-links-wrapper${navOpen ? ' open' : ''}`}>
          <ul className="navbar-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={handleNavLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/About"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={handleNavLinkClick}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Projects"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={handleNavLinkClick}
              >
                Creations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={handleNavLinkClick}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <a
                href="https://flocove.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                onClick={handleNavLinkClick}
              >
                <i className="fa-solid fa-droplet"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/gill-harry/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                onClick={handleNavLinkClick}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
          <div className="navbar-right">
            <a
              href={process.env.PUBLIC_URL + '/Harry Gill Resume for Portfolio.pdf'}
              download="Harry Gill Resume for Portfolio.pdf"
              className="btn btn-resume"
            >
              <i className="fas fa-download"></i> Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
