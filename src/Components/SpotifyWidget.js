import React, { useState, useEffect } from 'react';
import '../Styles/SpotifyWidget.css';
import { 
  getToken, 
  handleAuthCallback, 
  getAuthUrl, 
  getCurrentlyPlaying, 
  getRecommendations,
  getRecentlyPlayed 
} from '../utils/spotifyService';

const SpotifyWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [showMinimized, setShowMinimized] = useState(false);

  // Check for authentication on load and hidden state
  useEffect(() => {
    const token = getToken();
    const newToken = handleAuthCallback();
    
    // Check if widget was previously hidden
    const hiddenState = localStorage.getItem('spotify_widget_hidden');
    if (hiddenState === 'true') {
      setIsHidden(true);
    }
    
    if (token || newToken) {
      setIsAuthenticated(true);
      loadSpotifyData();
    } else {
      setLoading(false);
    }
    
    // Set up refresh interval (every 30 seconds)
    const interval = setInterval(() => {
      if (isAuthenticated && !isHidden) {
        loadSpotifyData();
      }
    }, 30000);
    
    setRefreshInterval(interval);
    
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [isAuthenticated, isHidden]);

  // Add these sample recommendations as a fallback
  const sampleRecommendations = [
    {
      id: 'sample1',
      name: "As It Was",
      artist: "Harry Styles",
      albumArt: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011e9f0743",
      url: "https://open.spotify.com/track/4Dvkj6JhhA12EX05fT7y2e"
    },
    {
      id: 'sample2',
      name: "Blinding Lights",
      artist: "The Weeknd",
      albumArt: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
      url: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"
    },
    {
      id: 'sample3',
      name: "Heat Waves",
      artist: "Glass Animals",
      albumArt: "https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464",
      url: "https://open.spotify.com/track/02MWAaffLxlfxAUY7c5dvx"
    }
  ];

  // Function to load Spotify data
  const loadSpotifyData = async () => {
    try {
      setLoading(true);
      console.log("Loading Spotify data...");
      
      // Get currently playing track
      const track = await getCurrentlyPlaying();
      console.log("Current track:", track);
      
      if (track) {
        setCurrentTrack(track);
        
        // Get recommendations based on current track
        let recs = await getRecommendations(track.id);
        console.log("Recommendations from API:", recs);
        
        // If no recommendations from API, use sample data
        if (!recs || recs.length === 0) {
          console.log("Using sample recommendations as fallback");
          recs = sampleRecommendations;
        }
        
        setRecommendations(recs);
      } else {
        // If no track is playing, try to get the most recently played
        const recentTracks = await getRecentlyPlayed();
        console.log("Recent tracks:", recentTracks?.length);
        
        if (recentTracks && recentTracks.length > 0) {
          const recent = recentTracks[0];
          setCurrentTrack({
            ...recent,
            isRecent: true
          });
          
          // Get recommendations based on recent track
          let recs = await getRecommendations(recent.id);
          console.log("Recommendations from recent track:", recs);
          
          // If no recommendations from API, use sample data
          if (!recs || recs.length === 0) {
            console.log("Using sample recommendations as fallback");
            recs = sampleRecommendations;
          }
          
          setRecommendations(recs);
        } else {
          setCurrentTrack(null);
          setRecommendations([]);
        }
      }
      
      setError(null);
    } catch (err) {
      console.error('Error loading Spotify data:', err);
      setError('Could not load Spotify data');
      // Provide sample data for demonstration
      if (!currentTrack) {
        setCurrentTrack({
          name: "Placeholder Track",
          artist: "Example Artist",
          album: "Sample Album",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02ef12a4e3237c27b1c1b9b430",
          url: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
          isPlaceholder: true
        });
        setRecommendations(sampleRecommendations);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle login
  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Hide widget
  const hideWidget = () => {
    setIsHidden(true);
    localStorage.setItem('spotify_widget_hidden', 'true');
    setShowMinimized(true);
    
    // No longer auto-hide the minimized button
  };
  
  // Show widget
  const showWidget = () => {
    setIsHidden(false);
    localStorage.setItem('spotify_widget_hidden', 'false');
    setShowMinimized(false);
  };
  
  // If widget is hidden, show minimized version or nothing
  if (isHidden) {
    return showMinimized ? (
      <div className="spotify-minimized" onClick={showWidget}>
        <i className="fab fa-spotify"></i>
      </div>
    ) : (
      <div className="spotify-show-button" onClick={showWidget}>
        <i className="fab fa-spotify"></i>
      </div>
    );
  }

  // Show login button if not authenticated
  if (!isAuthenticated && !loading) {
    return (
      <div className="spotify-widget spotify-login">
        <div className="spotify-header">
          <i className="fab fa-spotify"></i>
          <span>Connect Your Spotify</span>
        </div>
        <button className="spotify-login-btn" onClick={handleLogin}>
          Connect with Spotify
        </button>
        <button className="spotify-hide-btn" onClick={hideWidget}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  }
  
  // Show loading state
  if (loading && !currentTrack) {
    return (
      <div className="spotify-widget">
        <div className="spotify-loading">
          <i className="fab fa-spotify spotify-icon-loading"></i>
          <span>Loading Spotify data...</span>
        </div>
        <button className="spotify-hide-btn" onClick={hideWidget}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="spotify-widget spotify-error">
        <i className="fab fa-spotify"></i>
        <span>{error}</span>
        <button className="spotify-hide-btn" onClick={hideWidget}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  }
  
  // Show not playing state
  if (!currentTrack) {
    return (
      <div className="spotify-widget spotify-not-playing">
        <i className="fab fa-spotify"></i>
        <span>Not currently listening to Spotify</span>
        <button className="spotify-hide-btn" onClick={hideWidget}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  }

  return (
    <div className={`spotify-widget ${isExpanded ? 'expanded' : ''}`}>
      <button className="spotify-hide-btn" onClick={hideWidget}>
        <i className="fas fa-times"></i>
      </button>
      <div className="spotify-current" onClick={toggleExpand}>
        <div className="spotify-album-art">
          <img src={currentTrack.albumArt} alt={`${currentTrack.album} album art`} />
          <div className="spotify-overlay">
            <i className="fab fa-spotify"></i>
          </div>
        </div>
        <div className="spotify-info">
          <div className="spotify-now-playing">
            {currentTrack.isRecent ? 'Recently Played' : 'Now Playing'}
          </div>
          <div className="spotify-track-name">{currentTrack.name}</div>
          <div className="spotify-artist">{currentTrack.artist}</div>
        </div>
        <div className="spotify-toggle">
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </div>
      </div>
      
      {isExpanded && (
        <div className="spotify-recommendations">
          <h4>Recommendations</h4>
          <div className="recommendation-list">
            {recommendations.length > 0 ? (
              recommendations.map(track => (
                <a 
                  href={track.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  key={track.id}
                  className="recommendation-item"
                >
                  <div className="recommendation-album-art">
                    <img src={track.albumArt} alt={`${track.name} album art`} />
                  </div>
                  <div className="recommendation-info">
                    <div className="recommendation-name">{track.name}</div>
                    <div className="recommendation-artist">{track.artist}</div>
                  </div>
                </a>
              ))
            ) : (
              <div className="no-recommendations">
                No recommendations available
              </div>
            )}
          </div>
          <div className="spotify-footer">
            <a 
              href={currentTrack.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="spotify-link"
            >
              Open in Spotify <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyWidget; 