import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../Styles/ThemeToggle.css';

const RandomThemeButton = () => {
  const { currentTheme, applyRandomTheme, applyDarkTheme } = useTheme();

  return (
    <div className="theme-buttons">
      <button 
        className="dark-theme-button"
        onClick={applyDarkTheme}
        aria-label="Dark theme"
      >
        <i className="fas fa-moon"></i>
      </button>
      <button 
        className="random-theme-button"
        onClick={applyRandomTheme}
        aria-label="Randomize theme"
      >
        <i className="fas fa-palette"></i>
        <span>{currentTheme.name}</span>
      </button>
    </div>
  );
};

export default RandomThemeButton; 