import React, { useState, useEffect } from "react";

const questions = [
  {
    question: `What is the output?
console.log(typeof NaN);`,
    options: ["number", "NaN", "undefined", "object"],
    answer: "number",
    hint: "NaN stands for Not a Number but JS is tricky 😏"
  },
  {
    question: `What is the output?
console.log(0.1 + 0.2 === 0.3);`,
    options: ["true", "false", "undefined", "error"],
    answer: "false",
    hint: "Floating point precision problem"
  },
  {
    question: `What is the output?
let x = [1,2,3];
console.log(x + 1);`,
    options: ["1,2,31", "Error", "NaN", "[1,2,3,1]"],
    answer: "1,2,31",
    hint: "Array converts to string first"
  },
  {
    question: `In C, what is output?
int a = 5;
printf("%d %d", a++, ++a);`,
    options: ["5 6", "6 7", "5 7", "Undefined Behavior"],
    answer: "Undefined Behavior",
    hint: "Sequence point issue ⚠"
  },
  {
    question: `Nested loop time complexity?
for(i=0;i<n;i++)
  for(j=0;j<n;j++)`,
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: "O(n²)",
    hint: "n × n"
  },
  {
    question: `What is the output?
console.log([] == false);`,
    options: ["true", "false", "error", "undefined"],
    answer: "true",
    hint: "Type coercion madness"
  },
  {
    question: "Which is NOT a stable sorting algorithm?",
    options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
    answer: "Quick Sort",
    hint: "Pivot based ⚡"
  },
  {
    question: `What is the output?
console.log("5" - 2);`,
    options: ["3", "52", "NaN", "Error"],
    answer: "3",
    hint: "JS converts string to number here"
  },
  {
    question: `What is the output?
let a = {};
let b = a;
b.x = 10;
console.log(a.x);`,
    options: ["undefined", "10", "error", "null"],
    answer: "10",
    hint: "Objects are reference type"
  },
  {
    question: "Which traversal gives sorted output in BST?",
    options: ["Preorder", "Postorder", "Inorder", "Level Order"],
    answer: "Inorder",
    hint: "Left → Root → Right"
  }
];

function Level1() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [time, gameOver]);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore((prev) => prev + 2);
    } else {
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

  if (gameOver) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>🎮 Level 1 Complete</h1>
        <h2>Final Score: {score}</h2>
        <button onClick={restartGame}>Restart</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1>🔥 Level 1 - Hardcore Mode</h1>
      <h3>⏳ Time Left: {time}s</h3>
      <h3>💡 Hints Left: {hintsLeft}</h3>
      <h3>📊 Score: {score}</h3>
      <hr />

      <h2>Question {currentQ + 1} / 10</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {questions[currentQ].question}
      </pre>

      {questions[currentQ].options.map((option, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <button onClick={() => handleAnswer(option)}>
            {option}
          </button>
        </div>
      ))}

      <br />

      {hintsLeft > 0 && (
        <button onClick={useHint}>Use Hint</button>
      )}

      {showHint && (
        <p style={{ marginTop: "10px" }}>
          💡 Hint: {questions[currentQ].hint}
        </p>
      )}
    </div>
  );
}

export default Level1;