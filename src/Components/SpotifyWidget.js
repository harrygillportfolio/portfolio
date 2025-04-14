import React, { useState, useEffect } from 'react';
import '../Styles/SpotifyWidget.css';

const SpotifyWidget = () => {
  const [isHidden, setIsHidden] = useState(false);

  // Check if widget was previously hidden
  useEffect(() => {
    const hiddenState = localStorage.getItem('spotify_widget_hidden');
    if (hiddenState === 'true') {
      setIsHidden(true);
    }
  }, []);

  // Hide widget
  const hideWidget = () => {
    setIsHidden(true);
    localStorage.setItem('spotify_widget_hidden', 'true');
  };

  // Show widget
  const showWidget = () => {
    setIsHidden(false);
    localStorage.setItem('spotify_widget_hidden', 'false');
  };

  return (
    <>
      {isHidden ? (
        <div className="spotify-minimized" onClick={showWidget}>
          <i className="fab fa-spotify"></i>
        </div>
      ) : (
        <div className="spotify-widget">
          <button className="spotify-hide-btn" onClick={hideWidget}>
            <i className="fas fa-times"></i>
          </button>
          <div className="spotify-embed">
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1FoLIGnrFmVsWh?utm_source=generator"
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