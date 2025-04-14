import React, { useState, useEffect } from 'react';
import '../Styles/MemoryGame.css';

const MemoryGame = ({ onReset, onClose }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Card symbols/emojis
  const cardSymbols = ['🚀', '🌟', '🎮', '🎨', '🎵', '📱', '💻', '🎯', '🚀', '🌟', '🎮', '🎨', '🎵', '📱', '💻', '🎯'];
  
  // Initialize the game
  useEffect(() => {
    initializeGame();
  }, []);
  
  const initializeGame = () => {
    // Shuffle the cards
    const shuffledCards = cardSymbols.sort(() => Math.random() - 0.5).map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      solved: false
    }));
    
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
    setDisabled(false);
  };
  
  // Handle card click
  const handleCardClick = (index) => {
    // Ignore if card is already flipped or solved, or if disabled
    if (flipped.includes(index) || solved.includes(index) || disabled) return;
    
    // Add card to flipped array
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    
    // Increment moves counter
    setMoves(prev => prev + 1);
    
    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      setDisabled(true);
      
      const [first, second] = newFlipped;
      
      // If symbols match, add cards to solved array
      if (cards[first].symbol === cards[second].symbol) {
        setSolved(prev => [...prev, first, second]);
        setMatches(prev => prev + 1);
        setFlipped([]);
        setDisabled(false);
        
        // Check if all pairs are matched (game complete)
        if (matches + 1 === cardSymbols.length / 2) {
          setGameComplete(true);
        }
      } else {
        // If no match, flip cards back after a delay
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };
  
  // Reset the game
  const resetGame = () => {
    initializeGame();
    onReset();
  };
  
  return (
    <div className="memory-game">
      <div className="memory-game-header">
        <h2>Memory Game</h2>
        <button className="close-game-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="memory-game-info">
        <div className="memory-game-moves">Moves: {moves}</div>
        <div className="memory-game-matches">Matches: {matches}/{cardSymbols.length / 2}</div>
      </div>
      
      {gameComplete ? (
        <div className="memory-game-complete">
          <h3>Congratulations!</h3>
          <p>You completed the game in {moves} moves!</p>
          <button className="reset-game-btn" onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="memory-game-board">
          {cards.map((card, index) => (
            <div 
              key={index}
              className={`memory-card ${flipped.includes(index) ? 'flipped' : ''} ${solved.includes(index) ? 'solved' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="memory-card-inner">
                <div className="memory-card-front"></div>
                <div className="memory-card-back">{card.symbol}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="memory-game-footer">
        <button className="reset-game-btn" onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default MemoryGame; 