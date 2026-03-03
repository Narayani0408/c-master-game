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
    question: `What is time complexity of nested loop?
    
    for(i=0;i<n;i++)
      for(j=0;j<n;j++)
    
    `,
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    answer: "O(n^2)",
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
    question: `Which is NOT stable sorting algorithm?`,
    options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
    answer: "Quick Sort",
    hint: "Pivot based ⚡"
  },
  {
    question: `What is output?
    
    console.log("5" - 2);`,
    options: ["3", "52", "NaN", "Error"],
    answer: "3",
    hint: "JS converts string to number here"
  },
  {
    question: `What is output?
    
    let a = {};
    let b = a;
    b.x = 10;
    console.log(a.x);`,
    options: ["undefined", "10", "error", "null"],
    answer: "10",
    hint: "Objects are reference type"
  },
  {
    question: `Which traversal gives sorted output in BST?`,
    options: ["Preorder", "Postorder", "Inorder", "Level Order"],
    answer: "Inorder",
    hint: "Left → Root → Right"
  }
];
if (option === questions[currentQ].answer) {
  setScore(score + 2);
} else {
  setScore(score - 1);
}