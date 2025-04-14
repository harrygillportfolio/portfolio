import React, { useEffect, useRef } from 'react';
import '../Styles/Particles.css';

const Particles = ({ density = 100 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Dark theme colors that will remain constant
    const darkThemeColors = [
      '#00b4d8', // primary
      '#7209b7', // secondary
      '#f72585', // accent
      '#4cc9e9', // lightened primary
      '#9b31d4', // lightened secondary
      '#f94d9b'  // lightened accent
    ];
    
    // Convert hex to rgba
    const hexToRgba = (hex, alpha = 0.5) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Always use dark theme colors
        const colorIndex = Math.floor(Math.random() * darkThemeColors.length);
        this.color = hexToRgba(darkThemeColors[colorIndex], 0.4);
        
        // Add pulse animation
        this.angle = Math.random() * 2 * Math.PI;
        this.angleSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Animate size for subtle pulsing effect
        this.angle += this.angleSpeed;
        this.size = this.baseSize + Math.sin(this.angle) * 0.5;

        // Loop particles at edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(density, 200); // Cap at 200 for performance
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const maxDistance = 150;
          if (distance < maxDistance) {
            // Always use dark theme primary color for connections
            const gradientColor = hexToRgba(darkThemeColors[0], 0.2 * (1 - distance / maxDistance));
            
            ctx.beginPath();
            ctx.strokeStyle = gradientColor;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

export default Particles; 