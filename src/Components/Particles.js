import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../Styles/Particles.css';

const STAR_COUNT = 240;
const SHOOTING_STAR_PROB = 0.008;
const SHOOTING_STAR_LIFE = 1700;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const Particles = () => {
  const canvasRef = useRef(null);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // Theme-based star colors
    const starColors = [
      currentTheme.primary,
      currentTheme.secondary,
      currentTheme.accent
    ].filter(Boolean);

    // Stars
    let stars = Array.from({ length: STAR_COUNT }, () => {
      const isBright = Math.random() > 0.87;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isBright ? randomBetween(1.5, 2.8) : randomBetween(0.8, 1.4),
        baseAlpha: isBright ? randomBetween(0.92, 1) : randomBetween(0.5, 0.82),
        twinkleFactor: Math.random() * Math.PI * 2,
        speed: randomBetween(0.008, 0.016),
        color: pickRandom(starColors),
        isBright,
      };
    });

    // Shooting stars
    let shootingStars = [];

    // Comet object
    let comet = null;
    let nextCometTime = Date.now() + randomBetween(45000, 75000);

    function spawnComet() {
      // Randomly select a starting edge (left or top)
      const fromLeft = Math.random() < 0.5;
      // To make it visible, avoid the very corners
      const startX = fromLeft ? -120 : randomBetween(width * 0.15, width * 0.85);
      const startY = fromLeft ? randomBetween(height * 0.12, height * 0.37) : -120;
      // End positions
      const endX = fromLeft ? width + 140 : randomBetween(width * 0.13, width * 0.89);
      const endY = fromLeft ? randomBetween(height * 0.72, height * 0.93) : height + 110;
      const duration = randomBetween(13000, 18000); // 13–18s to cross screen
      comet = {
        startTime: performance.now(),
        duration,
        startX, startY, endX, endY,
        color: pickRandom(starColors),
        radius: randomBetween(5, 9),
        tailLength: randomBetween(280, 410), // Not used anymore
      };
    }

    function drawComet(now) {
      if (!comet) return;
      const t = Math.min(1, (now - comet.startTime) / comet.duration);
      if (t >= 1) {
        comet = null;
        nextCometTime = Date.now() + randomBetween(45000, 75000);
        return;
      }
      const x = comet.startX + (comet.endX - comet.startX) * t;
      const y = comet.startY + (comet.endY - comet.startY) * t;

      // Draw the comet "head" only, NO tail
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, comet.radius, 0, 2 * Math.PI);
      ctx.globalAlpha = 0.99;
      ctx.fillStyle = comet.color;
      ctx.shadowColor = comet.color;
      ctx.shadowBlur = 65;
      ctx.fill();
      ctx.restore();
    }

    function drawStars() {
      for (let star of stars) {
        const twinkle = Math.sin(performance.now() * star.speed + star.twinkleFactor) * (star.isBright ? 0.13 : 0.24);
        const alpha = Math.max(0.15, Math.min(1, star.baseAlpha + twinkle));
        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.isBright ? 52 : 18 + star.radius * 4;
        ctx.fill();
        if (star.isBright) {
          ctx.globalAlpha = 0.13 * alpha;
          ctx.beginPath();
          ctx.ellipse(star.x, star.y, star.radius * 4, star.radius * 0.5, 0, 0, Math.PI * 2);
          ctx.ellipse(star.x, star.y, star.radius * 0.5, star.radius * 4, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function drawShootingStars(now) {
      for (let shooting of shootingStars) {
        const elapsed = now - shooting.birth;
        if (elapsed > SHOOTING_STAR_LIFE) continue;
        const progress = elapsed / SHOOTING_STAR_LIFE;
        const x = shooting.x + shooting.vx * progress * width;
        const y = shooting.y + shooting.vy * progress * height;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 2.7, 0, 2 * Math.PI);
        ctx.globalAlpha = 1 - progress * 0.7;
        ctx.fillStyle = shooting.color;
        ctx.shadowColor = shooting.color;
        ctx.shadowBlur = 32;
        ctx.fill();
        ctx.restore();
        const trailLength = 420;
        const trailSteps = 24;
        for (let i = 1; i <= trailSteps; i++) {
          const t = progress - (i * (trailLength / width) / trailSteps);
          if (t < 0) continue;
          const tx = shooting.x + shooting.vx * t * width;
          const ty = shooting.y + shooting.vy * t * height;
          ctx.save();
          ctx.beginPath();
          ctx.arc(tx, ty, 1.2, 0, 2 * Math.PI);
          ctx.globalAlpha = 0.09 * (1 - i / (trailSteps + 2));
          ctx.fillStyle = shooting.color;
          ctx.shadowColor = shooting.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      }
    }

    let animationFrameId;

    function animate(now) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      // Spawn new comet if it's time
      if (!comet && Date.now() > nextCometTime) spawnComet();
      drawComet(now || performance.now());
      drawStars();
      drawShootingStars(now || performance.now());
      shootingStars = shootingStars.filter(
        s => (now || performance.now()) - s.birth < SHOOTING_STAR_LIFE
      );
      if (Math.random() < SHOOTING_STAR_PROB) {
        const startX = Math.random() * width;
        const startY = randomBetween(0, height * 0.3);
        const angle = randomBetween(Math.PI * 0.13, Math.PI * 0.87);
        const speed = randomBetween(0.55, 0.72);
        shootingStars.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          birth: now || performance.now(),
          color: pickRandom(starColors)
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();
    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, () => {
        const isBright = Math.random() > 0.87;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isBright ? randomBetween(1.5, 2.8) : randomBetween(0.8, 1.4),
          baseAlpha: isBright ? randomBetween(0.92, 1) : randomBetween(0.5, 0.82),
          twinkleFactor: Math.random() * Math.PI * 2,
          speed: randomBetween(0.008, 0.016),
          color: pickRandom(starColors),
          isBright,
        };
      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme]);
  return <canvas ref={canvasRef} className="particles-canvas" />;
};
export default Particles;
