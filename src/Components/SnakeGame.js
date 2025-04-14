import React, { useState, useEffect, useRef } from 'react';
import '../Styles/SnakeGame.css';

const SnakeGame = ({ onReset, onClose }) => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Game constants
  const GRID_SIZE = 20;
  const GAME_SPEED = 100; // milliseconds
  
  // Helper function to get random starting position near middle
  const getRandomStartPosition = () => {
    // Get the middle of the grid (15x15 grid)
    const midX = Math.floor((300 / GRID_SIZE) / 2); // 15/2 = 7.5
    const midY = Math.floor((300 / GRID_SIZE) / 2);
    
    // Generate random offset (-2 to +2 from middle)
    const offsetX = Math.floor(Math.random() * 5) - 2;
    const offsetY = Math.floor(Math.random() * 5) - 2;
    
    return {
      x: midX + offsetX,
      y: midY + offsetY
    };
  };
  
  // Game state references (using refs to avoid issues with closure in setInterval)
  const snakeRef = useRef([getRandomStartPosition()]);
  const foodRef = useRef({ x: 15, y: 15 });
  const directionRef = useRef('RIGHT');
  const nextDirectionRef = useRef('RIGHT');
  const gameLoopRef = useRef(null);
  
  // Initialize the game
  useEffect(() => {
    // Initialize canvas and game
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Adjust canvas dimensions
    canvas.width = 300;
    canvas.height = 300;
    
    // Set high score from localStorage if available
    const savedHighScore = localStorage.getItem('snakeGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    // Generate initial food position
    placeFood();
    
    // Start game loop
    startGameLoop();
    
    // Event listener for keyboard controls
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      // Clean up
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameLoopRef.current);
    };
  }, []);
  
  // Handle key presses for snake movement
  const handleKeyPress = (e) => {
    e.preventDefault();
    
    // Prevent movement in the opposite direction
    switch (e.key) {
      case 'ArrowUp':
        if (directionRef.current !== 'DOWN') {
          nextDirectionRef.current = 'UP';
        }
        break;
      case 'ArrowDown':
        if (directionRef.current !== 'UP') {
          nextDirectionRef.current = 'DOWN';
        }
        break;
      case 'ArrowLeft':
        if (directionRef.current !== 'RIGHT') {
          nextDirectionRef.current = 'LEFT';
        }
        break;
      case 'ArrowRight':
        if (directionRef.current !== 'LEFT') {
          nextDirectionRef.current = 'RIGHT';
        }
        break;
      default:
        break;
    }
  };
  
  // Place food at random position
  const placeFood = () => {
    // Generate random coordinates
    const x = Math.floor(Math.random() * (canvasRef.current.width / GRID_SIZE));
    const y = Math.floor(Math.random() * (canvasRef.current.height / GRID_SIZE));
    
    // Check if food is on snake, if so, regenerate
    const isOnSnake = snakeRef.current.some(segment => segment.x === x && segment.y === y);
    
    if (isOnSnake) {
      placeFood();
    } else {
      foodRef.current = { x, y };
    }
  };
  
  // Game loop - update game state and render
  const startGameLoop = () => {
    gameLoopRef.current = setInterval(() => {
      updateGame();
      renderGame();
    }, GAME_SPEED);
  };
  
  // Update game state
  const updateGame = () => {
    // Update direction
    directionRef.current = nextDirectionRef.current;
    
    // Get current head position
    const head = { ...snakeRef.current[0] };
    
    // Update head position based on direction
    switch (directionRef.current) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }
    
    // Check for wall collision
    if (head.x < 0 || head.x >= canvasRef.current.width / GRID_SIZE || 
        head.y < 0 || head.y >= canvasRef.current.height / GRID_SIZE) {
      endGame();
      return;
    }
    
    // Check for self collision
    if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
      endGame();
      return;
    }
    
    // Create new snake array with updated head position
    const newSnake = [head, ...snakeRef.current];
    
    // Check for food collision
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      // Snake grows, don't remove tail
      setScore(prevScore => prevScore + 10);
      placeFood();
    } else {
      // Remove tail segment
      newSnake.pop();
    }
    
    // Update snake
    snakeRef.current = newSnake;
  };
  
  // Render game on canvas
  const renderGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snakeRef.current.forEach((segment, index) => {
      // Head
      if (index === 0) {
        ctx.fillStyle = '#4CAF50';
      } 
      // Body
      else {
        ctx.fillStyle = '#8BC34A';
      }
      
      ctx.fillRect(
        segment.x * GRID_SIZE, 
        segment.y * GRID_SIZE, 
        GRID_SIZE, 
        GRID_SIZE
      );
      
      // Add eye to head
      if (index === 0) {
        ctx.fillStyle = 'white';
        
        // Position eyes based on direction
        let eyeX1, eyeY1, eyeX2, eyeY2;
        
        switch (directionRef.current) {
          case 'UP':
            eyeX1 = segment.x * GRID_SIZE + GRID_SIZE * 0.25;
            eyeY1 = segment.y * GRID_SIZE + GRID_SIZE * 0.25;
            eyeX2 = segment.x * GRID_SIZE + GRID_SIZE * 0.75;
            eyeY2 = segment.y * GRID_SIZE + GRID_SIZE * 0.25;
            break;
          case 'DOWN':
            eyeX1 = segment.x * GRID_SIZE + GRID_SIZE * 0.25;
            eyeY1 = segment.y * GRID_SIZE + GRID_SIZE * 0.75;
            eyeX2 = segment.x * GRID_SIZE + GRID_SIZE * 0.75;
            eyeY2 = segment.y * GRID_SIZE + GRID_SIZE * 0.75;
            break;
          case 'LEFT':
            eyeX1 = segment.x * GRID_SIZE + GRID_SIZE * 0.25;
            eyeY1 = segment.y * GRID_SIZE + GRID_SIZE * 0.25;
            eyeX2 = segment.x * GRID_SIZE + GRID_SIZE * 0.25;
            eyeY2 = segment.y * GRID_SIZE + GRID_SIZE * 0.75;
            break;
          case 'RIGHT':
            eyeX1 = segment.x * GRID_SIZE + GRID_SIZE * 0.75;
            eyeY1 = segment.y * GRID_SIZE + GRID_SIZE * 0.25;
            eyeX2 = segment.x * GRID_SIZE + GRID_SIZE * 0.75;
            eyeY2 = segment.y * GRID_SIZE + GRID_SIZE * 0.75;
            break;
          default:
            break;
        }
        
        ctx.beginPath();
        ctx.arc(eyeX1, eyeY1, GRID_SIZE * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(eyeX2, eyeY2, GRID_SIZE * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Draw food
    ctx.fillStyle = '#FF5722';
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * GRID_SIZE + GRID_SIZE / 2,
      foodRef.current.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw grid lines (optional)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };
  
  // End the game
  const endGame = () => {
    clearInterval(gameLoopRef.current);
    setGameOver(true);
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeGameHighScore', score.toString());
    }
  };
  
  // Reset the game
  const resetGame = () => {
    // Reset to random position near middle
    snakeRef.current = [getRandomStartPosition()];
    directionRef.current = 'RIGHT';
    nextDirectionRef.current = 'RIGHT';
    setScore(0);
    setGameOver(false);
    placeFood();
    
    // Restart game loop
    clearInterval(gameLoopRef.current);
    startGameLoop();
    
    // Call parent reset function
    onReset();
  };
  
  return (
    <div className="snake-game">
      <div className="snake-game-header">
        <h2>Snake Game</h2>
        <button className="close-game-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="snake-game-info">
        <div className="snake-game-score">Score: {score}</div>
        <div className="snake-game-high-score">High Score: {highScore}</div>
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="snake-game-canvas"
      />
      
      {gameOver && (
        <div className="snake-game-over">
          <h3>Game Over!</h3>
          <p>Your score: {score}</p>
          <button className="reset-game-btn" onClick={resetGame}>Play Again</button>
        </div>
      )}
      
      <div className="snake-game-instructions">
        <p>Use arrow keys to move</p>
      </div>
    </div>
  );
};

export default SnakeGame; 