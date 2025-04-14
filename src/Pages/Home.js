import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";
import '../Styles/Home.css';

const Home = () => {
  const projectsRef = useRef(null);

  const scrollToProjects = () => {
    const offset = 100; // Adjust this value to control how far above the section it stops
    const elementPosition = projectsRef.current?.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => observer.disconnect();
  }, []);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="animated-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div className="hero-text-container">
          <h1 className="name-title">Meharvir Randhawa</h1>
          <p className="hero-subtitle">CS + Data Science at UNC</p>
          <div className="cta-buttons">
            <Link to="/Projects" className="cta-button">
              <span className="button-content">
                <i className="fas fa-code"></i>
                View Projects
              </span>
            </Link>
            <Link to="/contact" className="cta-button outline">
              <span className="button-content">
                <i className="fas fa-envelope"></i>
                Contact Me
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-section fade-in" id="about">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Introduction</h2>
              <p>
                {`I'm a Computer Science student at the University of North Carolina at Chapel Hill, minoring in Data Science with an expected graduation in December 2025. With a strong foundation in software engineering and data analytics, I combine technical expertise with proven leadership abilities.`.split(' ').map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </p>
              <p>
                {`My passion for data analytics and software development has been demonstrated through impactful projects and internships. At Beats by Dre, I conducted extensive data analysis on over 10,000 product reviews, leading to key product improvements. I bring a unique blend of technical skills, analytical thinking, and project management expertise, consistently delivering innovative solutions while maintaining inclusive team environments.`.split(' ').map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </p>
              <p>
                {`Looking ahead, I aim to leverage these skills to drive meaningful change across tech-driven industries—building scalable solutions that empower users, enhance decision-making, and bridge the gap between data and real-world impact. With a strong interest in diverse endeavors ranging from fintech and healthcare innovation to artificial intelligence and entrepreneurship, I’m passionate about applying my knowledge to solve complex challenges, create accessible technologies, and make a lasting, positive difference across communities and sectors.`.split(' ').map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </p>
            </div>
            
            <div className="about-text">
              <h2 className="section-title">Technical Skills</h2>
            </div>
            
            <div className="skills-container">
              <div className="skill-box">
                <h3><i className="fas fa-desktop"></i>Frontend Development</h3>
                <div className="skill-tags">
                  <span><i className="fab fa-react"></i>React</span>
                  <span><i className="fab fa-js"></i>JavaScript</span>
                  <span><i className="fab fa-html5"></i>HTML5</span>
                  <span><i className="fab fa-css3-alt"></i>CSS3</span>
                  <span><i className="fab fa-js-square"></i>TypeScript</span>
                  <span><i className="fab fa-bootstrap"></i>Bootstrap</span>
                </div>
              </div>
              <div className="skill-box">
                <h3><i className="fas fa-server"></i>Backend Development</h3>
                <div className="skill-tags">
                  <span><i className="fab fa-python"></i>Python</span>
                  <span><i className="fab fa-java"></i>Java</span>
                  <span><i className="fas fa-c"></i>C++</span>
                  <span><i className="fas fa-database"></i>SQL</span>
                  <span><i className="fab fa-node-js"></i>Node.js</span>
                  <span><i className="fas fa-database"></i>MongoDB</span>
                  <span><i className="fas fa-plug"></i>REST APIs</span>
                </div>
              </div>
              <div className="skill-box">
                <h3><i className="fas fa-chart-line"></i>Finance</h3>
                <div className="skill-tags">
                  <span><i className="fas fa-chart-bar"></i>Financial Analysis</span>
                  <span><i className="fas fa-chart-line"></i>Corporate Finance</span>
                  <span><i className="fas fa-shield-alt"></i>Risk Management</span>
                  <span><i className="fas fa-chart-line"></i>Quantitative Finance</span>
                  <span><i className="fas fa-search-dollar"></i>Market Research</span>
                  <span><i className="fas fa-exchange-alt"></i>Trading</span>
                  <span><i className="fas fa-chart-line"></i>Financial Modeling</span>
                </div>
              </div>
              <div className="skill-box">
                <h3><i className="fas fa-brain"></i>Data Analytics</h3>
                <div className="skill-tags">
                  <span><i className="fas fa-robot"></i>Machine Learning</span>
                  <span><i className="fas fa-chart-pie"></i>Data Visualization</span>
                  <span><i className="fas fa-square-root-alt"></i>Statistical Analysis</span>
                  <span><i className="fas fa-code"></i>NumPy</span>
                  <span><i className="fas fa-code"></i>Pandas</span>
                  <span><i className="fas fa-code"></i>Scikit-learn</span>
                  <span><i className="fas fa-code"></i>Matplotlib</span>
                  <span><i className="fas fa-code"></i>Seaborn</span>
                  <span><i className="fas fa-code"></i>R</span>
                  <span><i className="fas fa-chart-area"></i>Tableau</span>
                  <span><i className="fas fa-chart-bar"></i>Power BI</span>
                  <span><i className="fas fa-chart-area"></i>Alteryx</span>
                </div>
              </div>
              <div className="skill-box">
                <h3><i className="fas fa-chart-line"></i>Additional Tools & Skills</h3>
                <div className="skill-tags">
                  <span><i className="fab fa-git"></i> Git</span>
                  <span><i className="fab fa-docker"></i> Docker</span>
                  <span><i className="fas fa-tasks"></i> JIRA</span>
                  <span><i className="fas fa-table"></i> Excel</span>
                  <span><i className="fas fa-linux"></i> Linux</span>
                  <span><i className="fas fa-terminal"></i> Bash</span>
                  <span><i className="fas fa-project-diagram"></i> Astah</span>
                  <span><i className="fas fa-tasks"></i> Trello</span>
                  <span><i className="fas fa-chart-line"></i> Google Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
