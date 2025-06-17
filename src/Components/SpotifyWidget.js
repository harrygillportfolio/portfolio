// SpotifyWidget.js
import React, { useState, useEffect } from 'react';
import '../Styles/SpotifyWidget.css';
import { useTheme } from '../context/ThemeContext'; // <<-- ADD THIS

const SpotifyWidget = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { currentTheme } = useTheme(); // <<-- ADD THIS

  // ...same useEffect and handlers as before...

  useEffect(() => {
    const hiddenState = localStorage.getItem('spotify_widget_hidden');
    if (hiddenState === 'true') {
      setIsHidden(true);
    }
  }, []);

  const hideWidget = () => {
    setIsHidden(true);
    localStorage.setItem('spotify_widget_hidden', 'true');
  };

  const showWidget = () => {
    setIsHidden(false);
    localStorage.setItem('spotify_widget_hidden', 'false');
  };

  return (
    <>
      {isHidden ? (
        <div
          className="spotify-minimized"
          onClick={showWidget}
          style={{
  background: currentTheme.primary,
  transition: 'background 0.3s cubic-bezier(.4,0,.2,1)',
}}
        >
          <i className="fab fa-spotify"></i>
        </div>
      ) : (
        <div className="spotify-widget">
          <button className="spotify-hide-btn" onClick={hideWidget}>
            <i className="fas fa-times"></i>
          </button>
          <div className="spotify-embed">
            <iframe
              src="https://open.spotify.com/embed/playlist/3sEVIE1KhCwdJGVTHdNopU?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotifyWidget;
