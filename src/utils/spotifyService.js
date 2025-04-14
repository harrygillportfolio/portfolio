// Configuration
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_RESUME_CHAT_ID;
const SPOTIFY_REDIRECT_URI = process.env.NODE_ENV === 'development' 
  ? 'https://meharvir.github.io/Mehar'  
  : window.location.origin;
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_API_ENDPOINT = 'https://api.spotify.com/v1';
const SPOTIFY_SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read'
];

// Helper to get the authentication URL
export const getAuthUrl = () => {
  const url = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    SPOTIFY_REDIRECT_URI
  )}&scope=${encodeURIComponent(
    SPOTIFY_SCOPES.join(' ')
  )}&response_type=token&show_dialog=true`;
  
  console.log('Auth URL:', url); // Debug log
  return url;
};

// Handle authentication callback
export const handleAuthCallback = () => {
  const hash = window.location.hash;
  console.log('Hash:', hash); // Debug log
  
  if (!hash) {
    console.log('No hash found in URL');
    return null;
  }

  const tokenParams = hash
    .substring(1)
    .split('&')
    .reduce((acc, item) => {
      const [key, value] = item.split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

  console.log('Token params:', tokenParams); // Debug log

  // Store token in localStorage
  if (tokenParams.access_token) {
    const expiresIn = tokenParams.expires_in ? parseInt(tokenParams.expires_in) : 3600;
    const expiryTime = Date.now() + (expiresIn * 1000);
    
    localStorage.setItem('spotify_token', tokenParams.access_token);
    localStorage.setItem('spotify_token_expiry', expiryTime.toString());
    
    // Clean URL
    window.location.hash = '';
    
    console.log('Token stored successfully'); // Debug log
    return tokenParams.access_token;
  }
  
  console.log('No access token found in params'); // Debug log
  return null;
};

// Get token from local storage
export const getToken = () => {
  const token = localStorage.getItem('spotify_token');
  const expiry = localStorage.getItem('spotify_token_expiry');
  
  if (!token || !expiry) return null;
  
  // Check if token is expired
  if (Date.now() > parseInt(expiry)) {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expiry');
    return null;
  }
  
  return token;
};

// Helper for API calls
const callSpotifyApi = async (endpoint, token) => {
  try {
    console.log(`Making API call to ${endpoint}`);
    
    const response = await fetch(`${SPOTIFY_API_ENDPOINT}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (response.status === 401) {
      console.log('Token expired or invalid');
      // Token expired or invalid
      localStorage.removeItem('spotify_token');
      localStorage.removeItem('spotify_token_expiry');
      return null;
    }
    
    if (response.status === 429) {
      console.log('Rate limit exceeded');
      return null;
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Spotify API error (${response.status}):`, errorText);
      throw new Error(`Spotify API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Spotify API call failed:', error);
    return null;
  }
};

// Get currently playing track
export const getCurrentlyPlaying = async () => {
  const token = getToken();
  if (!token) return null;
  
  const data = await callSpotifyApi('/me/player/currently-playing', token);
  if (!data || !data.item) return null;
  
  return {
    name: data.item.name,
    artist: data.item.artists.map(artist => artist.name).join(', '),
    album: data.item.album.name,
    albumArt: data.item.album.images[0]?.url,
    url: data.item.external_urls.spotify,
    id: data.item.id
  };
};

// Get track recommendations based on current track
export const getRecommendations = async (trackId) => {
  const token = getToken();
  if (!token || !trackId) {
    console.log('No token or trackId available for recommendations');
    return [];
  }
  
  try {
    console.log(`Getting recommendations for track ID: ${trackId}`);
    
    // Use multiple seeds for better results
    // Add genre and artist seeds based on top genres and the current artist
    const endpoint = `/recommendations?limit=3&seed_tracks=${trackId}`;
    console.log(`Calling endpoint: ${endpoint}`);
    
    const data = await callSpotifyApi(endpoint, token);
    
    if (!data) {
      console.log('No data returned from recommendations API');
      return [];
    }
    
    if (!data.tracks || data.tracks.length === 0) {
      console.log('No tracks in recommendations response', data);
      return [];
    }
    
    console.log(`Got ${data.tracks.length} recommendations`);
    
    return data.tracks.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      albumArt: track.album.images[0]?.url || '',
      url: track.external_urls.spotify
    }));
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};

// Get recently played tracks (fallback if nothing is currently playing)
export const getRecentlyPlayed = async () => {
  const token = getToken();
  if (!token) return [];
  
  const data = await callSpotifyApi('/me/player/recently-played?limit=10', token);
  if (!data || !data.items) return [];
  
  return data.items.map(item => ({
    id: item.track.id,
    name: item.track.name,
    artist: item.track.artists.map(artist => artist.name).join(', '),
    album: item.track.album.name,
    albumArt: item.track.album.images[0]?.url,
    url: item.track.external_urls.spotify,
    playedAt: item.played_at
  }));
}; 