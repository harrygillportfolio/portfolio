import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const reveals = document.querySelectorAll('.animate-on-scroll');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // How many pixels before the element is in view
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        } else {
          // Optional: if you want elements to re-animate when scrolling back up
          // element.classList.remove('active');
        }
      });
    };
    
    // Run once on initial load
    animateOnScroll();
    
    // Add event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
};

export default useScrollAnimation; 