import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";
import '../Styles/Home.css';
import { SiAdobe, SiFigma, SiCanva, SiHubspot, SiReact, SiJavascript} from 'react-icons/si';
import { DiVisualstudio } from "react-icons/di";
import Flag from 'react-world-flags';
import { FaCertificate, FaGraduationCap } from 'react-icons/fa';
import { TbDeviceAnalytics } from "react-icons/tb";
import { RiEmotionLine } from "react-icons/ri";
import { PiStrategyBold } from "react-icons/pi";


const Home = () => {
  const projectsRef = useRef(null);

  const scrollToProjects = () => {
    const offset = 100;
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
          <h1 className="name-title">Harry Gill</h1>

          <div className="shimmer-wrapper">
            <p className="hero-subtitle">Creator • Leader • Marketer</p>
            <div className="shimmer-bar"></div>
          </div>

          <div className="cta-buttons">
            <Link to="/Projects" className="cta-button">
              <span className="button-content">
                <i className="fas fa-folder-open"></i> Creations
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
                {`I recently earned my Bachelor of Science in Business Entrepreneurship from the W. P. Carey School of Business at Arizona State University, graduating in May 2025. With a strong foundation in digital marketing and creative strategy, I blend business acumen with a deep passion for visual storytelling and content creation.`.split(' ').map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </p>
              <p>
                {`My journey into videography began at age 12, sparking a lifelong dedication to media production. Since then, I’ve evolved from editing meme mashups and sports highlights to leading viral content strategies across platforms like YouTube, TikTok, and Instagram. Through collaborations with creators such as ThatWasEpic, Yung Gravy, and bbno$, my work has reached billions of viewers—driven by a mix of cinematic editing, narrative intuition, and platform-native strategy.`.split(' ').map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </p>
              <p>
                {`From building brand identities to managing digital communities, my experience spans content development, influencer partnerships, and social media growth within the entertainment and media landscape. I approach every project with a balance of creative instinct and business insight, crafting content that not only engages but scales. I aim to continue bridging creativity and strategy to drive impactful campaigns and meaningful brand experiences—helping ideas resonate, grow, and make a lasting impression.`.split(' ').map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </p>
            </div>

            <div className="about-text">
              <h2 className="section-title">Skills</h2>
            </div>

            <div className="skills-container">
              <div className="skill-box">
                <h3><i className="fa-solid fa-chart-simple"></i>Marketing & Technical</h3>
                <div className="skill-tags">
                  <span><i className="fa-solid fa-globe"></i>SEO</span>
                  <span><i className="fa-solid fa-magnifying-glass-chart"></i>SEM</span>
                  <span><i className="fa-solid fa-robot"></i>Marketing Automation</span>
                  <span><i className="fas fa-shield-alt"></i>Risk Management</span>
                  <span><i className="fas fa-chart-bar"></i>Financial Analysis</span>
                  <span><TbDeviceAnalytics /> Quantitative Finance</span>
                  <span><i className="fa-solid fa-brush"></i>Branding</span>
                  <span><i className="fa-solid fa-chess-knight"></i>Creative Strategy</span>
                  <span><SiAdobe /> Adobe Creative Suite</span>
                  <span><SiFigma /> Figma</span>
                  <span><SiCanva /> Canva</span>
                  <span><SiHubspot /> HubSpot</span>
                  <span><SiReact /> React</span>
  <span><SiJavascript /> JavaScript</span>
                   <span><DiVisualstudio /> Visual Studio</span>
                </div>
              </div>
              <div className="skill-box">
                <h3><i className="fas fa-users-cog"></i>Strategic Leadership & Management</h3>
                <div className="skill-tags">
                  <span><i className="fas fa-bolt"></i>Transformational Leadership</span>
                  <span><i className="fas fa-tasks"></i>Project Management</span>
                  <span><i className="fas fa-handshake"></i>Negotiation</span>
                  <span><i className="fas fa-sync-alt"></i>Change Management</span>
                  <span><i className="fas fa-user-astronaut"></i>Charisma</span>
                </div>
              </div>
              <div className="skill-box">
                <h3><i className="fas fa-comments"></i>Soft Skills</h3>
                <div className="skill-tags">
                  <span><i className="fas fa-comment-dots"></i>Communication</span>
                  <span><PiStrategyBold /> Strategic Thinking</span>
                  <span><i className="fas fa-sync-alt"></i>Adaptability</span>
                  <span><i className="fas fa-lightbulb"></i>Problem-Solving</span>
                  <span><RiEmotionLine /> Emotional Intelligence</span>
                </div>
              </div>
              <div className="skill-box">
                <h3><i className="fas fa-language"></i>Languages</h3>
                <div className="skill-tags">
                  <span><Flag code="US" style={{ width: '20px', marginRight: '6px' }} /> English</span>
                  <span><Flag code="IN" style={{ width: '20px', marginRight: '6px' }} /> Hindi</span>
                  <span><Flag code="IN" style={{ width: '20px', marginRight: '6px' }} /> Punjabi</span>
                </div>
              </div>
              <div className="skill-box">
                <h3><FaCertificate /> Certifications</h3>
                <div className="skill-tags">
                  <span>
                    <FaGraduationCap />{' '}
                    <a
                      href="https://skillshop.exceedlms.com/student/award/inNxoytYPhFzCzb4rDhw4MWJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      Fundamentals of Digital Marketing – Google Digital Garage
                    </a>
                  </span>
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