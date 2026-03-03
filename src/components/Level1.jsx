import React, { useState, useEffect } from "react";

function Level1() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [time, gameOver]);

  const handleClick = () => {
    if (!gameOver) {
      setScore(score + 1);
    }
  };

  const restartGame = () => {
    setScore(0);
    setTime(10);
    setGameOver(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎮 Level 1</h1>
      <h2>Time Left: {time}</h2>
      <h2>Score: {score}</h2>

      {!gameOver ? (
        <button onClick={handleClick} style={{ padding: "10px 20px" }}>
          Click Fast!
        </button>
      ) : (
        <>
          <h2>Game Over!</h2>
          <button onClick={restartGame}>Restart</button>
        </>
      )}
    </div>
  );
}

export default Level1;