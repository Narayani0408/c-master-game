import React, { useState, useEffect } from "react";
import useSound from "use-sound";

const clickSoundUrl =
  "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
const correctSoundUrl =
  "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3";
const wrongSoundUrl =
  "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3";

const questions = [
  {
    question: `console.log(typeof NaN);`,
    options: ["number", "NaN", "undefined", "object"],
    answer: "number",
    hint: "JS trick 😏"
  },
  {
    question: `console.log(0.1 + 0.2 === 0.3);`,
    options: ["true", "false", "undefined", "error"],
    answer: "false",
    hint: "Floating precision"
  },
  {
    question: `console.log([] == false);`,
    options: ["true", "false", "error", "undefined"],
    answer: "true",
    hint: "Type coercion"
  },
  {
    question: `"5" - 2 = ?`,
    options: ["3", "52", "NaN", "Error"],
    answer: "3",
    hint: "JS converts string"
  },
  {
    question: "Time complexity of nested loops?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: "O(n²)",
    hint: "n × n"
  }
];

function Level1() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [playClick] = useSound(clickSoundUrl);
  const [playCorrect] = useSound(correctSoundUrl);
  const [playWrong] = useSound(wrongSoundUrl);

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [time, gameOver]);

  const handleAnswer = (option) => {
    playClick();

    if (option === questions[currentQ].answer) {
      playCorrect();
      setScore((prev) => prev + 2);
    } else {
      playWrong();
      setScore((prev) => prev - 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ((prev) => prev + 1);
      setShowHint(false);
    } else {
      setGameOver(true);
    }
  };

  const useHint = () => {
    if (hintsLeft > 0) {
      setHintsLeft((prev) => prev - 1);
      setShowHint(true);
      playClick();
    }
  };

  const restartGame = () => {
    setCurrentQ(0);
    setScore(0);
    setTime(60);
    setHintsLeft(3);
    setShowHint(false);
    setGameOver(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.backgroundAnimation}></div>

      <div style={styles.card}>
        {gameOver ? (
          <>
            <h1>🎮 Level Complete</h1>
            <h2>Final Score: {score}</h2>
            <button style={styles.button} onClick={restartGame}>
              Restart
            </button>
          </>
        ) : (
          <>
            <h1>🔥 Level 1 - Hardcore</h1>
            <div style={styles.info}>
              <span>⏳ {time}s</span>
              <span>💡 {hintsLeft}</span>
              <span>🏆 {score}</span>
            </div>

            <h2>{questions[currentQ].question}</h2>

            {questions[currentQ].options.map((option, index) => (
              <button
                key={index}
                style={styles.button}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}

            {hintsLeft > 0 && (
              <button style={styles.hintButton} onClick={useHint}>
                Use Hint
              </button>
            )}

            {showHint && (
              <p style={styles.hintText}>
                💡 {questions[currentQ].hint}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
    position: "relative",
    overflow: "hidden"
  },
  backgroundAnimation: {
    position: "absolute",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle, rgba(0,255,255,0.2) 10%, transparent 10%)",
    backgroundSize: "50px 50px",
    animation: "move 20s linear infinite"
  },
  card: {
    position: "relative",
    background: "rgba(0,0,0,0.8)",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 0 30px cyan",
    backdropFilter: "blur(10px)"
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    background: "cyan",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  hintButton: {
    marginTop: "10px",
    padding: "8px 15px",
    background: "orange",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  hintText: {
    marginTop: "10px",
    color: "yellow"
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  }
};

export default Level1;