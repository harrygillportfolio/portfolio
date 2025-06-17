import React, { createContext, useState, useContext, useEffect } from 'react';
function encodeColor(color) {
  return color.replace('#', '%23');
}


const ThemeContext = createContext();

// Define multiple themes - all with dark backgrounds for readability
const themes = [
  {
    name: 'Night',
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
    name: 'Sunset',
    primary: '#ff6b00',
    secondary: '#7b2cbf',
    accent: '#ff7f50',
    background: '#1a1423',
    text: '#f8f9fa',
    card: 'rgba(26, 20, 35, 0.8)',
    border: 'rgba(255, 107, 0, 0.2)',
    footerBg: '#000000'
  },
  {
    name: 'Sunrise',
    primary: '#9b59b6',
    secondary: '#3498db',
    accent: '#ff6f00',
    background: '#1a1a1a',
    text: '#f8f9fa',
    card: 'rgba(30, 30, 30, 0.8)',
    border: 'rgba(255, 111, 0, 0.2)',
    footerBg: '#000000'
  },
  {
    name: 'Retro',
    primary: '#ff00ff',
    secondary: '#00ffff',
    accent: '#faff00',
    background: '#0d0d0d',
    text: '#f8f9fa',
    card: 'rgba(20, 20, 20, 0.85)',
    border: 'rgba(255, 0, 255, 0.2)',
    footerBg: '#000000'
  },
  {
    name: 'Lightning',
    primary: '#f1c40f',
    secondary: '#3498db',
    accent: '#ffe600',
    background: '#121212',
    text: '#ffffff',
    card: 'rgba(30, 30, 30, 0.8)',
    border: 'rgba(241, 196, 15, 0.2)',
    footerBg: '#000000'
  },
  {
  name: 'Interstellar',
  primary: '#21a1ff',       // Electric blue
  secondary: '#4fd8ff',     // Lighter blue accent
  accent: '#007aff',        // Deep blue
  background: '#0a192f',    // Spacey dark blue
  text: '#eaf4ff',          // Icy white-blue
  card: 'rgba(33, 161, 255, 0.12)',  // Soft blue overlay
  border: 'rgba(33, 161, 255, 0.3)', // Blue glow
  footerBg: '#061120'
}
];

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        if (savedTheme === 'dark' || savedTheme === 'light') {
          return themes.find(theme => theme.name === 'Night') || themes[0];
        }
      }
    }
    return themes[0];
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme.name.toLowerCase());
    document.documentElement.style.setProperty('--primary-color', currentTheme.primary);
    document.documentElement.style.setProperty('--secondary-color', currentTheme.secondary);
    document.documentElement.style.setProperty('--accent-color', currentTheme.accent);
    document.documentElement.style.setProperty('--bg-color', currentTheme.background);
    document.documentElement.style.setProperty('--text-color', currentTheme.text);
    document.documentElement.style.setProperty('--card-bg', currentTheme.card);
    document.documentElement.style.setProperty('--border-color', currentTheme.border);
    document.documentElement.style.setProperty('--footer-bg', currentTheme.footerBg);
    localStorage.setItem('theme', JSON.stringify(currentTheme));
    // --- Dynamic cursor update:
  const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${encodeColor(currentTheme.primary)}"><circle cx="12" cy="12" r="6"/></svg>`;
  const cursorUrl = `url('data:image/svg+xml;utf8,${cursorSvg}') 10 10, auto`;
  document.body.style.cursor = cursorUrl;

  // Cleanup: Reset cursor on unmount
  return () => {
    document.body.style.cursor = '';
  };
  }, [currentTheme]);

  

  // NEW: cycle through themes in fixed order
  const cycleThemeForward = () => {
    const currentIndex = themes.findIndex(theme => theme.name === currentTheme.name);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  const applyDarkTheme = () => {
    const nightTheme = themes.find(theme => theme.name === 'Night');
    if (nightTheme) {
      setCurrentTheme(nightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, cycleThemeForward, applyDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
