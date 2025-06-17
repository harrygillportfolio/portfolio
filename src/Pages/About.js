import React, { useEffect, useRef } from 'react';
import '../Styles/About.css';
import Particles from '../Components/Particles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faCamera,
  faMusic,
  faDumbbell,
  faUsers,
  faBookOpenReader,
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const volunteeringRef = useRef(null);
  const hobbiesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const refs = [
      educationRef,
      experienceRef,
      volunteeringRef,
      hobbiesRef,
    ];

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="about-page">
      <Particles />
      <div className="title-tab">
        <div className="title-content">
          <h1 className="page-title">Who I Am</h1>
          <p className="page-subtitle">PHX roots. Lit by passion. Always evolving.</p>
        </div>
      </div>

      {/* 1. Beyond the Office */}
      <section className="hobbies-section" ref={hobbiesRef}>
        <div className="section-header">
          <h2>Beyond the Office</h2>
          <p>Things that keep life fun</p>
        </div>
        <div className="hobbies-grid">
          <div className="hobby-item">
            <FontAwesomeIcon icon={faVideo} />
            <h3>Videography</h3>
            <p>I love shooting and editing videos that tell a story or capture a vibe, I'm always chasing that cinematic look.</p>
          </div>
          <div className="hobby-item">
            <FontAwesomeIcon icon={faCamera} />
            <h3>Photography</h3>
            <p>Snapping clean shots is my thing - I'm always looking for "that angle".</p>
          </div>
          <div className="hobby-item">
            <FontAwesomeIcon icon={faMusic} />
            <h3>Music Creation</h3>
            <p>Making music with my friends helps me get into my element.</p>
          </div>
          <div className="hobby-item">
            <FontAwesomeIcon icon={faDumbbell} />
            <h3>Gym</h3>
            <p>Helps me keep the stress off and the strength up.</p>
          </div>
          <div className="hobby-item">
            <FontAwesomeIcon icon={faUsers} />
            <h3>Family</h3>
            <p>Family's everything - they keep me real and help me recharge.</p>
          </div>
          <div className="hobby-item">
            <FontAwesomeIcon icon={faBookOpenReader} />
            <h3>Learning</h3>
            <p>I'm always learning something new - whether it's tech, business, or random deep dives on YouTube.</p>
          </div>
        </div>
      </section>

      {/* 2. A Look at My Experience */}
      <section className="experience-section" ref={experienceRef}>
        <div className="section-header">
          <h2 className="gradient-text">A Look at My Experience</h2>
          <p className="section-subtitle">Where I've Made an Impact</p>
        </div>
        <div className="experience-grid">
          {/* FloCove */}
          <div className="experience-item">
            <div className="experience-icon">
              <i className="fas fa-ship"></i>
            </div>
            <div className="experience-content">
              <h3>Co-Founder & CEO</h3>
              <h4><a href="http://flocove.com" target="_blank" rel="noopener noreferrer">FloCove</a></h4>
              <p className="experience-date">March 2025 – Present</p>
              <p className="experience-location">Phoenix, Arizona</p>
              <ul>
                <li>Steer the company’s strategic vision and oversee daily operations, focusing on marketing strategies that drive growth and client engagement</li>
                <li>Collaborate with leadership to identify new opportunities and expand service offerings</li>
              </ul>
            </div>
          </div>

          {/* ThatWasEpic */}
          <div className="experience-item">
            <div className="experience-icon">
              <i className="fas fa-video"></i>
            </div>
            <div className="experience-content">
              <h3>Creative Marketing Director</h3>
              <h4><a href="https://thatwasepic.com/" target="_blank" rel="noopener noreferrer">ThatWasEpic</a></h4>
              <p className="experience-date">December 2023 – January 2025</p>
              <p className="experience-location">Tempe, Arizona</p>
              <ul>
                <li>Produced 50+ content pieces viewed over 50M times on YouTube and hundreds of millions across TikTok, Instagram, and Facebook</li>
                <li>Boosted profits by 40% through strategic brand collaborations and partnerships</li>
              </ul>
            </div>
          </div>

          {/* Toor Designs */}
          <div className="experience-item">
            <div className="experience-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="experience-content">
              <h3>Marketing Intern</h3>
              <h4><a href="http://toordesigns.com/" target="_blank" rel="noopener noreferrer">Toor Designs & Marketing</a></h4>
              <p className="experience-date">January 2023 – January 2025</p>
              <p className="experience-location">Long Beach, California</p>
              <ul>
                <li>Managed marketing for HempLand USA with a $100k budget across multiple digital platforms</li>
                <li>Drove a 30% profit increase and 15% customer growth through strategic media and partnership development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Academics */}
      <section className="education-section" ref={educationRef}>
        <div className="section-header">
          <h2 className="gradient-text">Academics</h2>
          <p className="section-subtitle">Grounded in entrepreneurship</p>
        </div>
        <div className="education-grid">
          <div className="education-item">
            <div className="education-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="education-content">
              <div className="education-header">
                <h3>Arizona State University – W. P. Carey School of Business</h3>
              </div>
              <div className="education-details">
                <div className="education-degree">
                  <h4>Bachelor of Science in Business Entrepreneurship</h4>
                  <p className="education-minor">Dean’s List: Fall 2021 – Spring 2025</p>
                </div>
                <div className="education-meta">
                  <div className="education-location">
                    <p>Tempe, Arizona</p>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="education-graduation">
                    <p>Graduation Date: May 2025</p>
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                </div>
              </div>
              <div className="coursework-section">
                <h4><i className="fas fa-book"></i> Relevant Coursework</h4>
                <div className="coursework-grid">
                  <div className="course-item"><i className="fas fa-bullhorn"></i><span>Marketing</span></div>
                  <div className="course-item"><i className="fas fa-users-cog"></i><span>Management</span></div>
                  <div className="course-item"><i className="fas fa-boxes"></i><span>Supply Chain</span></div>
                  <div className="course-item"><i className="fas fa-user-tie"></i><span>Leadership</span></div>
                  <div className="course-item"><i className="fas fa-balance-scale"></i><span>Business Law</span></div>
                  <div className="course-item"><i className="fas fa-chart-bar"></i><span>Economics</span></div>
                  <div className="course-item"><i className="fas fa-hand-holding-usd"></i><span>Finance</span></div>
                  <div className="course-item"><i className="fas fa-lightbulb"></i><span>Entrepreneurship</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Relevant Projects */}
      <section className="volunteering-section" ref={volunteeringRef}>
        <div className="section-header">
          <h2 className="gradient-text">Relevant Projects</h2>
          <p className="section-subtitle">Where strategy met execution</p>
        </div>
        <div className="volunteering-grid">
          <div className="volunteering-item">
            <div className="volunteering-icon"><i className="fas fa-search-dollar"></i></div>
            <div className="volunteering-content">
              <h3>SEO & SEM Campaign</h3>
              <h4>Local AMPM</h4>
              <p className="volunteering-date">March 2024 – May 2024</p>
              <p className="volunteering-location">Tempe, Arizona</p>
              <ul>
                <li>Boosted organic website traffic by 40% through on-page and off-page SEO strategies</li>
                <li>Improved search rankings for 10+ high-value keywords to top 3 positions</li>
                <li>Managed Google Ads campaigns, increasing CTR by 20% and online sales by 15%</li>
              </ul>
            </div>
          </div>
          <div className="volunteering-item">
            <div className="volunteering-icon"><i className="fas fa-mobile-alt"></i></div>
            <div className="volunteering-content">
              <h3>Product Launch Marketing Plan</h3>
              <h4>New Mobile App</h4>
              <p className="volunteering-date">August 2024 – October 2024</p>
              <p className="volunteering-location">Remote</p>
              <ul>
                <li>Led go-to-market strategy, aligning product and marketing teams to exceed user targets</li>
                <li>Developed product messaging and social media campaigns with high engagement</li>
                <li>Generated 5,000+ user sign-ups within the first month post-launch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
