import React, { useState, useEffect } from "react";
import useSound from "use-sound";

const clickSound =
  "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
const correctSound =
  "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3";
const wrongSound =
  "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3";

const questions = [
  {
    question: `console.log(typeof NaN);`,
    options: ["number", "NaN", "undefined", "object"],
    answer: "number",
    hint: "JS weirdness"
  },
  {
    question: `console.log(0.1 + 0.2 === 0.3);`,
    options: ["true", "false", "error", "undefined"],
    answer: "false",
    hint: "Floating precision issue"
  },
  {
    question: `let x = [1,2,3];
console.log(x + 1);`,
    options: ["1,2,31", "Error", "NaN", "[1,2,3,1]"],
    answer: "1,2,31",
    hint: "Array becomes string"
  },
  {
    question: `console.log([] == false);`,
    options: ["true", "false", "undefined", "error"],
    answer: "true",
    hint: "Type coercion"
  },
  {
    question: `console.log("5" - 2);`,
    options: ["3", "52", "NaN", "Error"],
    answer: "3",
    hint: "Implicit conversion"
  },
  {
    question: `console.log(null == undefined);`,
    options: ["true", "false", "error", "undefined"],
    answer: "true",
    hint: "Loose equality"
  },
  {
    question: `let a = {};
let b = a;
b.x = 10;
console.log(a.x);`,
    options: ["undefined", "10", "error", "null"],
    answer: "10",
    hint: "Objects are reference type"
  },
  {
    question: `C Output:
int a = 10;
printf("%d", a++ + ++a);`,
    options: ["21", "22", "Undefined Behavior", "20"],
    answer: "Undefined Behavior",
    hint: "Sequence points ⚠"
  },
  {
    question: `Time complexity of merge sort?`,
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: "O(n log n)",
    hint: "Divide & conquer"
  },
  {
    question: `BST traversal giving sorted output?`,
    options: ["Preorder", "Postorder", "Inorder", "Level Order"],
    answer: "Inorder",
    hint: "Left Root Right"
  }
];

function Level1() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(120);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [playClick] = useSound(clickSound);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

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

  const restartGame = () => {
    setCurrentQ(0);
    setScore(0);
    setTime(120);
    setHintsLeft(3);
    setShowHint(false);
    setGameOver(false);
  };

  const useHint = () => {
    if (hintsLeft > 0) {
      setHintsLeft((prev) => prev - 1);
      setShowHint(true);
      playClick();
    }
  };

  return (
    <div className="game-container">
      {gameOver ? (
        <div className="game-card">
          <h1>🎮 Level Complete</h1>
          <h2>Final Score: {score}</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <div className="game-card">
          <div className="top-bar">
            <span>⏳ {time}s</span>
            <span>💡 {hintsLeft}</span>
            <span>🏆 {score}</span>
          </div>

          <h2>Question {currentQ + 1}/10</h2>

          <pre className="question">
            {questions[currentQ].question}
          </pre>

          <div className="options">
            {questions[currentQ].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {hintsLeft > 0 && (
            <button className="hint-btn" onClick={useHint}>
              Use Hint
            </button>
          )}

          {showHint && (
            <p className="hint-text">
              💡 {questions[currentQ].hint}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Level1;