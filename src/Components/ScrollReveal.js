import React, { useEffect, useRef, useState } from 'react';
import '../Styles/ScrollReveal.css';

const ScrollReveal = ({ 
  children, 
  threshold = 0.1,
  delay = 0,
  duration = 800,
  distance = '50px',
  direction = 'up',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Set direction
  let transformFrom;
  switch (direction) {
    case 'left':
      transformFrom = `translateX(-${distance})`;
      break;
    case 'right':
      transformFrom = `translateX(${distance})`;
      break;
    case 'down':
      transformFrom = `translateY(-${distance})`;
      break;
    case 'up':
    default:
      transformFrom = `translateY(${distance})`;
  }

  const style = {
    opacity: 0,
    transform: transformFrom,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`
  };

  return (
    <div
      ref={domRef}
      className={`scroll-reveal ${className} ${isVisible ? 'is-revealed' : ''}`}
      style={isVisible ? {} : style}
    >
      {children}
    </div>
  );
};

export default ScrollReveal; 