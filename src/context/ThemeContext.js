import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// Define multiple themes - all with dark backgrounds for readability
const themes = [
  {
    name: 'Dark',
    primary: '#00b4d8',
    secondary: '#7209b7',
    accent: '#f72585',
    background: '#121212',
    text: '#f8f9fa',
    card: 'rgba(30, 30, 30, 0.8)',
    border: 'rgba(255, 255, 255, 0.15)',
    footerBg: '#000000'
  },
  {
    name: 'Ocean',
    primary: '#00b4d8',
    secondary: '#0077b6',
    accent: '#90e0ef',
    background: '#001233',
    text: '#e9ecef',
    card: 'rgba(0, 27, 77, 0.8)',
    border: 'rgba(0, 180, 216, 0.2)',
    footerBg: '#000000'
  },
  {
    name: 'Forest',
    primary: '#40916c',
    secondary: '#52b788',
    accent: '#95d5b2',
    background: '#081c15',
    text: '#d8f3dc',
    card: 'rgba(8, 28, 21, 0.8)',
    border: 'rgba(64, 145, 108, 0.2)',
    footerBg: '#000000'
  },
  {
    name: 'Sunset',
    primary: '#ff7b00',
    secondary: '#ff006e',
    accent: '#ffbe0b',
    background: '#1a1423',
    text: '#f8f9fa',
    card: 'rgba(26, 20, 35, 0.8)',
    border: 'rgba(255, 123, 0, 0.2)',
    footerBg: '#000000'
  },
  {
    name: 'Purple',
    primary: '#9d4edd',
    secondary: '#c77dff',
    accent: '#e0aaff',
    background: '#10002b',
    text: '#f8f9fa',
    card: 'rgba(16, 0, 43, 0.8)',
    border: 'rgba(157, 78, 221, 0.2)',
    footerBg: '#000000'
  },
  {
    name: 'Crimson',
    primary: '#e5383b',
    secondary: '#ba181b',
    accent: '#ff4d6d',
    background: '#161a1d',
    text: '#f8f9fa',
    card: 'rgba(22, 26, 29, 0.8)',
    border: 'rgba(229, 56, 59, 0.2)',
    footerBg: '#000000'
  }
];

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Handle transition from old string-based theme to new JSON-based theme
    if (savedTheme) {
      try {
        // Try to parse as JSON
        return JSON.parse(savedTheme);
      } catch (e) {
        // If it's the old string format, find the matching theme
        if (savedTheme === 'dark') {
          return themes.find(theme => theme.name === 'Dark') || themes[0];
        } else if (savedTheme === 'light') {
          // Convert light theme to dark theme
          return themes.find(theme => theme.name === 'Dark') || themes[0];
        }
      }
    }
    
    // Default to first theme if no saved theme or error
    return themes[0];
  });

  useEffect(() => {
    // Apply current theme to document
    document.documentElement.setAttribute('data-theme', currentTheme.name.toLowerCase());
    
    // Set CSS variables for the theme
    document.documentElement.style.setProperty('--primary-color', currentTheme.primary);
    document.documentElement.style.setProperty('--secondary-color', currentTheme.secondary);
    document.documentElement.style.setProperty('--accent-color', currentTheme.accent);
    document.documentElement.style.setProperty('--bg-color', currentTheme.background);
    document.documentElement.style.setProperty('--text-color', currentTheme.text);
    document.documentElement.style.setProperty('--card-bg', currentTheme.card);
    document.documentElement.style.setProperty('--border-color', currentTheme.border);
    document.documentElement.style.setProperty('--footer-bg', currentTheme.footerBg);
    
    // Save theme to localStorage
    localStorage.setItem('theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

  const applyRandomTheme = () => {
    // Get a random theme that's different from the current one
    let newTheme;
    do {
      newTheme = themes[Math.floor(Math.random() * themes.length)];
    } while (newTheme.name === currentTheme.name);
    
    setCurrentTheme(newTheme);
  };

  const applyDarkTheme = () => {
    // Find and apply the dark theme
    const darkTheme = themes.find(theme => theme.name === 'Dark');
    if (darkTheme) {
      setCurrentTheme(darkTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, applyRandomTheme, applyDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 