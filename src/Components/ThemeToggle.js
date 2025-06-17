import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../Styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { currentTheme, cycleThemeForward } = useTheme();

  return (
    <div className="theme-buttons">
      <button 
        className="random-theme-button"
        onClick={cycleThemeForward}
        aria-label="Cycle to next theme"
      >
        <i className="fas fa-palette"></i>
        <span>{currentTheme.name}</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
