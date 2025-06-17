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
              <p>I'm a Marketing and Entrepreneurship graduate with a proven ability to build brands, lead creative teams, and deliver digital experiences that drive measurable growth. With experience founding a marketing agency and directing high-impact campaigns for content brands, I thrive at the intersection of strategy and storytelling. I’m passionate about creating content that resonates, growing communities, and solving business challenges through bold, data-informed ideas.</p>
            </div>

            <div className="footer-nav">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/"><i className="fas fa-home"></i>Home</a></li>
                <li><a href="/about"><i className="fas fa-user"></i>About</a></li>
                <li><a href="/projects"><i className="fas fa-folder-open"></i> Creations</a></li>
                <li><a href="/contact"><i className="fas fa-envelope"></i>Contact</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3 className="footer-title">Contact Info</h3>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:hsgill2@asu.edu">hsgill2@asu.edu</a>
                </li>
                <li>
  <i className="fab fa-linkedin"></i>
  <a href="https://www.linkedin.com/in/gill-harry/" target="_blank" rel="noopener noreferrer">
    My LinkedIn
  </a>
</li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Phoenix, AZ, USA</span>
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
              &copy; {currentYear} Harry Gill. All Rights Reserved.
            </p>
            <p className="credit">
              Designed with <i className="fas fa-heart pulse"></i> by Harry Gill with the help of my friend Meharvir Randhawa.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
