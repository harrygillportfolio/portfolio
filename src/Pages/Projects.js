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

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
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

  const handleMouseUp = () => setIsDragging(false);

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
    title: "My Marketing Company",
    isFloCove: true,
    description: (
      <>
        I founded{' '}
        <a
          href="https://flocove.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 700, color: "#fff", textDecoration: "none" }}
        >
          FloCove
        </a>{' '}
        as a full-service marketing brand that blends bold creativity with data-driven strategy. From cinematic video production to social media campaigns, I lead the creation of high-impact digital content and immersive brand experiences—rooted in storytelling, design, and community. Inspired by the ocean, I aim to build fresh, forward-thinking strategies that make waves and leave a lasting impression across media, entertainment, and business.
      </>
    ),
    video: process.env.PUBLIC_URL + "/flocove-reel.mp4"
  },
  {
  title: "My Videography",
  description: (
    <>
      I blend cinematic visuals, bold storytelling, and strategic content to create more than just videos—I build experiences.<br />
      Through my videography brand and YouTube channel{' '}
      <a
        href="https://www.youtube.com/@95high"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: 700,
          color: "#fff",
          textDecoration: "none"
        }}
      >
        95High
      </a> 
      {', I showcase music videos, creative visuals, and branded content that push artistic boundaries. Every project is rooted in clear, intentional vision—designed to elevate voices, captivate audiences, and leave a lasting impact.'}
    </>
  ),
  video: process.env.PUBLIC_URL + "/bts-reel.mp4",
  isVideography: true,
},
 {
  title: "My Photography",
  description: (
    <>
      My photography brings together color, light, and composition to capture authentic stories and emotion.<br />
      I focus on cinematic visuals—portraits, landscapes, and everyday moments—delivered in crisp, high-resolution quality. Every photo is crafted to highlight the beauty and atmosphere of the moment.
    </>
  ),
  video: process.env.PUBLIC_URL + "/photography-reel.mp4",
  isPhotography: true, // (optional, use if you want to style differently)
},
  {
  title: "My Video Editing",
  description: (
    <>
      I’ve edited and published viral content for{" "}
      <a
        href="https://www.youtube.com/@ThatWasEpic11"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: 700,
          color: "#fff",
          textDecoration: "none"
        }}
      >
        ThatWasEpic
      </a>
      {", with video views averaging 1–7 million+ per upload. My work contributed to the channel’s continued growth, boosting audience engagement and driving increased merchandise-related revenue through strategic content planning and execution."}
    </>
  ),
  video: process.env.PUBLIC_URL + "/videoediting-reel.mp4",
  isVideoEditing: true,
},


];


  return (
    <div className="projects-page">
      <Particles />
      <div className="projects-hero">
        <div className="hero-content">
          <h1>Content Creation & Marketing</h1>
          <p className="hero-subtitle">A blend of my creative storytelling and strategic marketing</p>
        </div>
      </div>

      <div className="projects-section">
        <div className="projects-grid">
          {projects.map((project, index) => (
  <div
    key={index}
    className={`project-item ${index === projects.length - 1 ? 'full-width' : ''}`}
  >
    {project.video ? (
      <div className="project-video-container">
        <video
          className={`project-video${project.isVideography ? " videography-video" : ""}`}
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={
            project.isVideography
              ? { width: "100%", height: "auto", aspectRatio: "1280/720", maxWidth: "1280px", maxHeight: "720px", borderRadius: "12px", background: "#0b1222", display: "block", objectFit: "fill" }
              : { width: '100%', aspectRatio: '16/9', borderRadius: '12px', background: "#0b1222", display: 'block' }
          }
        />
        <div className="project-content">
          <h2 className="project-title">{project.title}</h2>
          {/* Render FloCove's description as a div so the link is clickable */}
          {project.isFloCove ? (
            <div className="project-description">{project.description}</div>
          ) : (
            <p className="project-description">{project.description}</p>
          )}
        </div>
      </div>
    ) : (
      <>
        <div
          className="project-image-container"
          onClick={() => openImageModal(project.image)}
        >
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
            {project.technologies &&
              project.technologies.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
          </div>
        </div>
      </>
    )}
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
