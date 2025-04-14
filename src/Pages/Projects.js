import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Projects.css';
import Particles from '../Components/Particles';

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setZoomLevel(1);
    setCurrentPosition({ x: 0, y: 0 });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setCurrentPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setCurrentPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - currentPosition.x,
        y: e.clientY - currentPosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      setCurrentPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const projects = [
    {
      title: "Top Investor Portfolio",
      description: "Developed a web application for tracking and analyzing top investors' portfolios. Integrated stock forecasting using Python libraries such as NumPy, yFinance, Prophet, and Plotly to deliver 4-year projections with interactive, data-driven visualizations.",
      image: process.env.PUBLIC_URL + "/Stock Forecast Image.png",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Python", "Streamlit", "yFinance", "Prophet", "Plotly"],
      github: "https://github.com/Meharvir/top-investor-portfolio",
      live: "https://top-investor-demo.com"
    },
    {
      title: "Beats by Dre Capstone",
      description: "Conducted data collection and cleaning on 10,000+ product reviews, identifying patterns and anomalies using Python, NumPy, and AI models. Performed EDA and sentiment analysis to derive customer insights that led to 3 key product improvements. Presented findings to stakeholders with visualizations using Matplotlib, Seaborn, and Scikit-learn.",
      image: process.env.PUBLIC_URL + "/Capstone Project Image.png",
      technologies: ["Python", "NLP", "EDA", "Sentiment Analysis", "NumPY", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter Notebooks","Google Colab"],
      live: "https://colab.research.google.com/drive/1c_btqi5pklQFZvTXRVLCQVITqwifZvuj?usp=sharing"
    },
    {
      title: "Song Downloader",
      description: "A user-friendly application where users can simply search for the type of song they want and specify how many songs they'd like to download. The app supports high-quality audio downloads, all within a clean and intuitive interface, making it easy to get the music you love.",
      image: process.env.PUBLIC_URL + "/Song Downloader Project.png",
      technologies: ["Python", "FFmpeg", "API Integration", "GUI", "Audio Processing"],
      github: "https://github.com/Meharvir/song-downloader",
      live: "https://song-downloader-demo.com"
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and CSS animations. Features include smooth transitions, interactive elements, and a clean design.",
      image: process.env.PUBLIC_URL + "/Portfolio Website Image.png",
      technologies: ["React", "CSS", "JavaScript", "Responsive Design","ReactRouter","EmailJS","Git"],
      github: "https://github.com/Meharvir/portfolio",
      live: "https://meharvir.github.io/portfolio"
    }
  ];

  return (
    <div className="projects-page">
      <Particles />
      <div className="projects-hero">
        <div className="hero-content">
          <h1>My Projects</h1>
          <p className="hero-subtitle">A collection of my work and creative endeavors</p>
        </div>
      </div>

      <div className="projects-section">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <div className="project-image-container" onClick={() => openImageModal(project.image)}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  onError={(e) => {
                    console.error(`Error loading image: ${project.image}`);
                    e.target.style.display = 'none';
                  }}
                />
                <div className="image-zoom-hint">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
              <div className="project-content">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="image-modal" 
          onClick={closeImageModal}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <img 
              src={selectedImage} 
              alt="Project full view" 
              ref={imageRef}
              style={{
                transform: `scale(${zoomLevel}) translate(${currentPosition.x / zoomLevel}px, ${currentPosition.y / zoomLevel}px)`,
                cursor: zoomLevel > 1 ? 'move' : 'default'
              }}
              onMouseDown={handleMouseDown}
            />
            <button className="close-modal" onClick={closeImageModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-zoom-controls">
              <button className="zoom-button" onClick={zoomOut}>
                <i className="fas fa-search-minus"></i>
              </button>
              <button className="zoom-button" onClick={resetZoom}>
                <i className="fas fa-undo"></i>
              </button>
              <button className="zoom-button" onClick={zoomIn}>
                <i className="fas fa-search-plus"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
