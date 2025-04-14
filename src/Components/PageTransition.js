import React, { useState, useEffect } from 'react';
import '../Styles/PageTransition.css';

const PageTransition = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the transition overlay after the page loads
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-transition ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="loader">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
      </div>
    </div>
  );
};

export default PageTransition; 