import React, { useEffect, useRef } from 'react';
import '../Styles/About.css';
import Particles from '../Components/Particles';

const About = () => {
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const leadershipRef = useRef(null);
  const certificationsRef = useRef(null);
  const musicRef = useRef(null);
  const hobbiesRef = useRef(null);
  const volunteeringRef = useRef(null);
  const languagesRef = useRef(null);
  const futureGoalsRef = useRef(null);

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
      leadershipRef,
      certificationsRef,
      musicRef,
      hobbiesRef,
      volunteeringRef,
      languagesRef,
      futureGoalsRef,
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
          <h1 className="page-title">About Me</h1>
          <p className="page-subtitle">Passionate Computer Science Student</p>
        </div>
      </div>
      <section className="experience-section" ref={experienceRef}>
        <div className="section-header">
          <h2 className="gradient-text">Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>
        <div className="experience-grid">
          <div className="experience-item">
            <div className="experience-icon">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <div className="experience-content">
              <h3>Private Tutor</h3>
              <h4>Varsity Tutors</h4>
              <p className="experience-date">October 2024 - Present</p>
              <p className="experience-location">Remote</p>
              <ul>
                <li>Provided personalized tutoring in Computer Science and Math, leading to an average 10-20% improvement</li>
                <li>Monitored student progress with Excel, adjusting tutoring methods and focus areas to ensure growth in all areas</li>
              </ul>
            </div>
          </div>
          <div className="experience-item">
            <div className="experience-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="experience-content">
              <h3>Business Data Analyst & Digital Marketing Intern</h3>
              <h4>Hukam Studios</h4>
              <p className="experience-date">September 2024 - December 2024</p>
              <p className="experience-location">Tempe, Arizona</p>
              <ul>
                <li>Managed marketing initiatives by coordinating tasks across platforms, ensuring timely completion of tasks</li>
                <li>Assisted in website optimization by analyzing SEO metrics and implementing data-driven improvements</li>
              </ul>
            </div>
          </div>
          <div className="experience-item">
            <div className="experience-icon">
              <i className="fas fa-headphones"></i>
            </div>
            <div className="experience-content">
              <h3>Consumer Insights Data Analytics Extern</h3>
              <h4>Beats by Dre</h4>
              <div className="experience-meta">
                <p className="experience-date">July 2024 - September 2024</p>
                <p className="experience-location">Remote</p>
              </div>
              <ul className="experience-details">
                <li>Led data collection and analysis of 10,000+ product reviews using Python, Matplotlib, NumPy, and AI, identifying key patterns and anomalies to improve data quality and inform product decisions</li>
                <li>Developed a comprehensive capstone project with stakeholders, featuring advanced visualizations (histograms, box plots, word clouds) using Matplotlib, Seaborn, and Scikit-Learn, resulting in 3 actionable product improvements based on customer feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="education-section" ref={educationRef}>
        <div className="section-header">
          <h2 className="gradient-text">Education</h2>
          <p className="section-subtitle">My academic background</p>
        </div>
        <div className="education-grid">
          <div className="education-item">
            <div className="education-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="education-content">
              <div className="education-header">
                <h3>University of North Carolina at Chapel Hill</h3>
              </div>
              <div className="education-details">
                <div className="education-degree">
                  <h4>Bachelor of Science in Computer Science</h4>
                  <p className="education-minor">Minor in Data Science</p>
                </div>
                <div className="education-meta">
                  <div className="education-location">
                    <p>Chapel Hill, North Carolina</p>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="education-graduation">
                    <p>Expected Graduation: December 2025</p>
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                </div>
              </div>
              <div className="coursework-section">
                <h4><i className="fas fa-book"></i> Relevant Coursework</h4>
                <div className="coursework-grid">
                  <div className="course-item">
                    <i className="fas fa-code"></i>
                    <span>Software Engineering</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-shield-alt"></i>
                    <span>Information Assurance</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-network-wired"></i>
                    <span>Internet Services and Protocols</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-project-diagram"></i>
                    <span>Data Structures and Algorithms</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-cubes"></i>
                    <span>Object-Oriented Programming</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-brain"></i>
                    <span>Advanced Algorithms</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-microchip"></i>
                    <span>Digital Circuit Design</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-chart-bar"></i>
                    <span>Statistics</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-calculator"></i>
                    <span>Multivariable Calculus</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-language"></i>
                    <span>Models of Languages and Computation</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-desktop"></i>
                    <span>Computer Architecture</span>
                  </div>
                  <div className="course-item">
                    <i className="fas fa-chart-line"></i>
                    <span>Macroeconomics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="leadership-section" ref={leadershipRef}>
  <div className="section-header">
    <h2 className="gradient-text">Leadership Experience</h2>
    <p className="section-subtitle">My role in student organizations</p>
  </div>

  <div className="leadership-grid">

    {/* PSA Leadership Item */}
    <div
      className="leadership-item"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        className="leadership-icon"
        style={{ marginBottom: "10px", fontSize: "24px" }}
      >
        <i className="fas fa-users"></i>
      </div>
      <div className="leadership-content">
        <h3 style={{ margin: "5px 0" }}>Founder/President</h3>
        <h4 style={{ margin: "5px 0", fontWeight: "normal" }}>
          Punjabi Student Association (PSA)
        </h4>
        <p
          className="leadership-date"
          style={{ marginBottom: "10px", fontStyle: "italic" }}
        >
          August 2022 – May 2024
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>
            Established and managed a cultural club of 75+ members to enhance community engagement and awareness
          </li>
          <li>
            Organized 20+ events in accordance with campus regulation while overseeing financial operations
          </li>
          <li>
            Collaborated with other student organizations to host cultural showcases and educational panels
          </li>
        </ul>
      </div>
    </div>

    {/* Pediatric System Leadership Item */}
    <div
      className="leadership-item"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        className="leadership-icon"
        style={{ marginBottom: "10px", fontSize: "24px" }}
      >
        <i className="fas fa-project-diagram"></i>
      </div>
      <div className="leadership-content">
        <h3 style={{ margin: "5px 0" }}>Team Lead</h3>
        <h4 style={{ margin: "5px 0", fontWeight: "normal" }}>
          Automated Pediatric Doctor’s Office System
        </h4>
        <p
          className="leadership-date"
          style={{ marginBottom: "10px", fontStyle: "italic" }}
        >
          January 2024 – May 2024
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>
            Led a cross-functional team of 5 in designing a Java-based desktop application using Agile methodologies
          </li>
          <li>
            Coordinated sprint planning and issue tracking via Jira to ensure timely delivery
          </li>
          <li>
            Oversaw project scope and team communication across UI/UX, backend, and database development
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</section>


      <section className="certifications-section" ref={certificationsRef}>
        <div className="section-header">
          <h2 className="gradient-text">Honors, Certifications & Involvements</h2>
          <p className="section-subtitle">My achievements and professional development</p>
        </div>
        <div className="certifications-grid">
          <div className="certification-item">
            <div className="certification-icon">
              <i className="fas fa-award"></i>
            </div>
            <div className="certification-content">
              <h3>Academic Honors</h3>
              <ul>
                <li>Dean's List</li>
                <li>New American University Provost Scholar</li>
                <li>AP Scholar</li>
                <li>Student of the Year</li>
              </ul>
            </div>
          </div>

          <div className="certification-item">
            <div className="certification-icon">
              <i className="fas fa-certificate"></i>
            </div>
            <div className="certification-content">
              <h3>Certifications</h3>
              <ul>
                <li>Preparatory Certificate in Finance and Financial Markets (CFI)</li>
                <li>Agile Project Management Badge (PMI)</li>
                <li>Predictive Project Management Badge (PMI)</li>
                <li>Business Analysis & Process Management</li>
                <li>Introduction to Data Analysis using Microsoft Excel</li>
                <li>Investment Risk Management</li>
                <li>Search Engine Optimization</li>
              </ul>
            </div>
          </div>

          <div className="certification-item">
            <div className="certification-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="certification-content">
              <h3>Involvements</h3>
              <ul>
                <li>Minority Business Student Alliance</li>
                <li>Quantitative Finance Association</li>
                <li>Carolina Analytics and Data Science</li>
                <li>Undergraduate International Business Club</li>
                <li>Ai Consulting Club</li>
                <li>Intramural Basketball</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="volunteering-section" ref={volunteeringRef}>
        <div className="section-header">
          <h2 className="gradient-text">Volunteering</h2>
          <p className="section-subtitle">My community involvement</p>
        </div>
        <div className="volunteering-grid">
          <div className="volunteering-item">
            <div className="volunteering-icon">
              <i className="fas fa-hands-helping"></i>
            </div>
            <div className="volunteering-content">
              <h3>Community Volunteer</h3>
              <h4>Guru Nanak Dwara</h4>
              <p className="volunteering-date">January 2018 - Present</p>
              <p className="volunteering-location">Phoenix, Arizona</p>
              <ul>
                <li>Volunteered on Sundays to support the community by preparing and serving food, maintaining the space, and assisting with events</li>
                <li>Helped create a welcoming environment by working alongside others to ensure everything ran smoothly</li>
              </ul>
            </div>
          </div>

          <div className="volunteering-item">
            <div className="volunteering-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <div className="volunteering-content">
              <h3>Volunteer</h3>
              <h4>Midwest Food Bank</h4>
              <p className="volunteering-date">January 2021 - September 2022</p>
              <p className="volunteering-location">Gilbert, Arizona</p>
              <ul>
                <li>Organized donated items and prepared them for distribution to charitable organizations</li>
                <li>Spearheaded packing efforts to support fellow volunteers in maintaining an optimal working environment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="languages-section" ref={languagesRef}>
        <div className="section-header">
          <h2 className="gradient-text">Languages</h2>
          <p className="section-subtitle">My linguistic abilities</p>
        </div>
        <div className="languages-grid">
          <div className="language-item">
            <div className="language-icon">
              <i className="fas fa-language"></i>
            </div>
            <div className="language-content">
              <h3>English</h3>
              <div className="proficiency-bar">
                <div className="proficiency-level" style={{ width: '100%' }}></div>
              </div>
              <p className="proficiency-text">Native</p>
            </div>
          </div>
          <div className="language-item">
            <div className="language-icon">
              <i className="fas fa-language"></i>
            </div>
            <div className="language-content">
              <h3>Punjabi</h3>
              <div className="proficiency-bar">
                <div className="proficiency-level" style={{ width: '100%' }}></div>
              </div>
              <p className="proficiency-text">Native</p>
            </div>
          </div>
          <div className="language-item">
            <div className="language-icon">
              <i className="fas fa-language"></i>
            </div>
            <div className="language-content">
              <h3>Spanish</h3>
              <div className="proficiency-bar">
                <div className="proficiency-level" style={{ width: '60%' }}></div>
              </div>
              <p className="proficiency-text">Intermediate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="future-goals-section" ref={futureGoalsRef}>
        <div className="section-header">
          <h2 className="gradient-text">Future Goals & What I Bring</h2>
          <p className="section-subtitle">My vision and contributions</p>
        </div>
        <div className="future-goals-grid">
          <div className="future-goals-item">
            <div className="future-goals-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <div className="future-goals-content">
              <h3>Career Aspirations</h3>
              <ul className="future-goals-list">
                <li><i className="fas fa-check-circle"></i> Build a career where I can use my skills to make a positive impact</li>
                <li><i className="fas fa-check-circle"></i> Contribute to innovative projects that make a positive impact</li>
                <li><i className="fas fa-check-circle"></i> Mentor junior developers and share knowledge with the community</li>
              </ul>
            </div>
          </div>
          <div className="future-goals-item">
            <div className="future-goals-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="future-goals-content">
              <h3>What I Bring to the Team</h3>
              <ul className="future-goals-list">
                <li><i className="fas fa-star"></i> Strong problem-solving skills and analytical mindset</li>
                <li><i className="fas fa-star"></i> Experience with modern web technologies and best practices</li>
                <li><i className="fas fa-star"></i> Ability to work effectively in collaborative environments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="hobbies-section" ref={hobbiesRef}>
        <div className="section-header">
          <h2>Hobbies & Interests</h2>
          <p>Beyond coding and technology</p>
        </div>
        <div className="hobbies-grid">
          <div className="hobby-item">
            <i className="fas fa-basketball-ball"></i>
            <h3>Basketball</h3>
            <p>Playing and following college basketball</p>
          </div>
          <div className="hobby-item">
            <i className="fas fa-music"></i>
            <h3>Music Production</h3>
            <p>Creating beats and sharing on <a href="https://www.youtube.com/@MehrBeatss" target="_blank" rel="noopener noreferrer">YouTube</a></p>
          </div>
          <div className="hobby-item">
            <i className="fas fa-book"></i>
            <h3>Reading</h3>
            <p>Exploring new technologies and ideas</p>
          </div>
          <div className="hobby-item">
            <i className="fas fa-dumbbell"></i>
            <h3>Fitness</h3>
            <p>Staying active and healthy</p>
          </div>
          <div className="hobby-item">
            <i className="fas fa-plane"></i>
            <h3>Traveling</h3>
            <p>Exploring new cultures, places, and perspectives</p>
          </div>
          <div className="hobby-item">
            <i className="fas fa-utensils"></i>
            <h3>Cooking</h3>
            <p>Experimenting with new recipes</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
