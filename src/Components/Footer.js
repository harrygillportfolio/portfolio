import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import '../Styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content container">
        <ScrollReveal>
          <div className="footer-grid">
            <div className="footer-about">
              <h3 className="footer-title">Summary</h3>
              <p>I'm a Computer Science student with a passion for building impactful digital experiences and solving real-world problems through innovative software solutions. I thrive at the intersection of creativity and technology, constantly seeking opportunities to turn ideas into user-focused applications.</p>
            </div>

            <div className="footer-nav">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/"><i className="fas fa-home"></i>Home</a></li>
                <li><a href="/about"><i className="fas fa-user"></i>About</a></li>
                <li><a href="/projects"><i className="fas fa-code"></i>Projects</a></li>
                <li><a href="/contact"><i className="fas fa-envelope"></i>Contact</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3 className="footer-title">Contact Info</h3>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:meharvir.randhawa@outlook.com">meharvir.randhawa@outlook.com</a>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <a href="tel:+5108268380">+1 (510) 826-8380</a>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Charlotte, NC, USA</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <ScrollReveal delay={300}>
            <p className="copyright">
              &copy; {currentYear} Meharvir Randhawa. All Rights Reserved.
            </p>
            <p className="credit">
              Designed & Built with <i className="fas fa-heart pulse"></i> by Meharvir Randhawa
            </p>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
