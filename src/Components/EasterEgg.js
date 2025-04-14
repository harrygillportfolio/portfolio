import React, { useState, useEffect } from 'react';
import '../Styles/EasterEgg.css';
import MemoryGame from './MemoryGame';
import SnakeGame from './SnakeGame';

const EasterEgg = () => {
  // Original Tic Tac Toe state
  const [showGame, setShowGame] = useState(false);
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ x: 0, o: 0 });
  const [inputSequence, setInputSequence] = useState([]);
  
  // Game navigation state
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  
  // Array of available games
  const games = [
    { id: 'tictactoe', name: 'Tic Tac Toe' },
    { id: 'memory', name: 'Memory Game' },
    { id: 'snake', name: 'Snake Game' },
  ];

  // Konami code
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  // Calculate winner for Tic Tac Toe
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Listen for keyboard events - still enable Konami code as an alternative
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Update input sequence for konami code detection
      const newSequence = [...inputSequence, event.key];
      
      // Only keep the latest 10 inputs (length of the konami code)
      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }
      
      setInputSequence(newSequence);
      
      // Check if the konami code was entered
      const isKonamiCode = newSequence.length === konamiCode.length && 
        konamiCode.every((key, index) => key === newSequence[index]);
      
      if (isKonamiCode && !showGame) {
        setShowGame(true);
      }
      
      // If game is open, pressing Escape should close it
      if (event.key === 'Escape' && showGame) {
        setShowGame(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputSequence, showGame]);

  // Add a method to directly toggle the game visibility
  // This will be called from the Navbar button
  window.toggleEasterEgg = () => {
    setShowGame(prevState => !prevState);
  };

  // Handle click for Tic Tac Toe
  const handleClick = (i) => {
    if (winner || grid[i]) return;
    
    const newGrid = [...grid];
    newGrid[i] = xIsNext ? 'X' : 'O';
    setGrid(newGrid);
    setXIsNext(!xIsNext);
    
    const newWinner = calculateWinner(newGrid);
    if (newWinner) {
      setWinner(newWinner);
      setScore({
        ...score,
        [newWinner.toLowerCase()]: score[newWinner.toLowerCase()] + 1
      });
    } else if (!newGrid.includes(null)) {
      // If grid is full and no winner, it's a draw
      setWinner('Draw');
    }
  };

  // Reset Tic Tac Toe game
  const resetGame = () => {
    setGrid(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  // Close the game overlay
  const closeGame = () => {
    setShowGame(false);
    resetGame();
  };
  
  // Navigate to the next game
  const nextGame = () => {
    // Explicitly handle navigation
    const nextIndex = (currentGameIndex + 1) % games.length;
    console.log(`Navigating from game ${currentGameIndex} to ${nextIndex}`);
    setCurrentGameIndex(nextIndex);
    resetGame();
  };
  
  // Navigate to the previous game
  const prevGame = () => {
    // Explicitly handle navigation
    const prevIndex = (currentGameIndex - 1 + games.length) % games.length;
    console.log(`Navigating from game ${currentGameIndex} to ${prevIndex}`);
    setCurrentGameIndex(prevIndex);
    resetGame();
  };

  // Render a square for Tic Tac Toe
  const renderSquare = (i) => {
    return (
      <div 
        className={`game-square ${grid[i] ? `square-${grid[i].toLowerCase()}` : ''}`}
        onClick={() => handleClick(i)}
      >
        {grid[i]}
      </div>
    );
  };

  // Get game status for Tic Tac Toe
  const getStatus = () => {
    if (winner === 'Draw') {
      return "It's a draw!";
    } else if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  if (!showGame) return null;

  return (
    <div className="easter-egg-overlay">
      {/* Side navigation arrows */}
      <button 
        className="nav-arrow-left" 
        onClick={prevGame}
        aria-label="Previous game"
      >
        <span>←</span>
      </button>
      
      <button 
        className="nav-arrow-right" 
        onClick={nextGame}
        aria-label="Next game"
      >
        <span>→</span>
      </button>
      
      {currentGameIndex === 0 && (
        <div className="easter-egg-game">
          <div className="game-header">
            <h2>Tic Tac Toe</h2>
            <button className="close-game-btn" onClick={closeGame}>×</button>
          </div>
          
          <div className="game-score">
            <div className="score-item">
              <span className="score-label">X</span>
              <span className="score-value">{score.x}</span>
            </div>
            <div className="score-item">
              <span className="score-label">O</span>
              <span className="score-value">{score.o}</span>
            </div>
          </div>
          
          <div className="game-status">{getStatus()}</div>
          
          <div className="game-board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          
          <button className="reset-game-btn" onClick={resetGame}>
            Reset Game
          </button>
          
          <div className="game-instructions">
            <p>Take turns placing X and O to get three in a row.</p>
          </div>
        </div>
      )}
      
      {currentGameIndex === 1 && (
        <MemoryGame 
          onReset={resetGame}
          onClose={closeGame}
        />
      )}
      
      {currentGameIndex === 2 && (
        <SnakeGame 
          onReset={resetGame}
          onClose={closeGame}
        />
      )}
    </div>
  );
};

export default EasterEgg; 