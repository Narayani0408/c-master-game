import React, { useState, useEffect } from "react";

import clickSound from "../assets/sounds/click.mp3";
import correctSound from "../assets/sounds/correct.mp3";
import wrongSound from "../assets/sounds/wrong.mp3";
import timerSound from "../assets/sounds/timer.mp3";
import winSound from "../assets/sounds/win.mp3";
import gameoverSound from "../assets/sounds/gameover.mp3";

function Level1() {

const clickAudio = new Audio(clickSound);
const correctAudio = new Audio(correctSound);
const wrongAudio = new Audio(wrongSound);
const timerAudio = new Audio(timerSound);
const winAudio = new Audio(winSound);
const gameoverAudio = new Audio(gameoverSound);

const questions = [

{
question: "What is the output?\n\nint a=5;\nprintf(\"%d\",a++);",
options:["5","6","Error","Garbage"],
answer:"5",
hint:"Post increment prints first then increases"
},

{
question: "What is the output?\n\nint x=10;\nprintf(\"%d\",++x);",
options:["10","11","12","Error"],
answer:"11",
hint:"Pre increment increases first"
},

{
question: "Which loop executes at least once?",
options:["for","while","do while","none"],
answer:"do while",
hint:"Condition checked after execution"
},

{
question:"Output?\n\nint a=3,b=4;\nprintf(\"%d\",a+b*a);",
options:["15","19","7","16"],
answer:"15",
hint:"Multiplication first"
},

{
question:"Output?\n\nint a=10;\nprintf(\"%d\",a/3);",
options:["3","3.33","Error","4"],
answer:"3",
hint:"Integer division"
},

{
question:"Which symbol is used for pointer?",
options:["&","*","#","@"],
answer:"*",
hint:"Used in pointer declaration"
},

{
question:"Output?\n\nprintf(\"%d\",sizeof(int));",
options:["2","4","8","Depends on compiler"],
answer:"Depends on compiler",
hint:"System dependent"
},

{
question:"Which function reads formatted input?",
options:["printf","scanf","gets","puts"],
answer:"scanf",
hint:"Input function"
},

{
question:"Output?\n\nint a=2;\nprintf(\"%d\",a<<1);",
options:["2","3","4","1"],
answer:"4",
hint:"Left shift multiplies by 2"
},

{
question:"Which header file is required for printf?",
options:["stdio.h","conio.h","math.h","stdlib.h"],
answer:"stdio.h",
hint:"Standard input output"
}

];

const [currentQuestion,setCurrentQuestion]=useState(0);
const [score,setScore]=useState(0);
const [timeLeft,setTimeLeft]=useState(30);
const [hintsLeft,setHintsLeft]=useState(3);
const [showHint,setShowHint]=useState(false);
const [gameOver,setGameOver]=useState(false);

useEffect(()=>{

if(gameOver) return;

const timer=setInterval(()=>{

setTimeLeft(prev=>{

if(prev===6){
timerAudio.play();
}

if(prev===1){
handleNext();
return 30;
}

return prev-1;

});

},1000);

return()=>clearInterval(timer);

});

const handleAnswer=(option)=>{

clickAudio.play();

if(option===questions[currentQuestion].answer){

correctAudio.play();
setScore(score+1);

}else{

wrongAudio.play();

}

handleNext();

};

const handleNext=()=>{

if(currentQuestion+1<questions.length){

setCurrentQuestion(currentQuestion+1);
setTimeLeft(30);
setShowHint(false);

}else{

setGameOver(true);

if(score>=7){
winAudio.play();
}else{
gameoverAudio.play();
}

}

};

const useHint=()=>{

if(hintsLeft>0){

setHintsLeft(hintsLeft-1);
setShowHint(true);

}

};

return(

<div style={styles.container}>

<div style={styles.background}></div>

<div style={styles.gameBox}>

{gameOver ? (

<div>

<h1>Level Completed</h1>
<h2>Score: {score}/10</h2>

{score>=7 ?
<h2 style={{color:"lightgreen"}}>LEVEL PASSED</h2> :
<h2 style={{color:"red"}}>GAME OVER</h2>
}

</div>

):( 

<div>

<h2>LEVEL 1</h2>

<h3>Question {currentQuestion+1}/10</h3>

<p style={styles.question}>
{questions[currentQuestion].question}
</p>

<div style={styles.options}>

{questions[currentQuestion].options.map((option,index)=>(

<button
key={index}
style={styles.button}
onClick={()=>handleAnswer(option)}
>

{option}

</button>

))}

</div>

<div style={styles.info}>

<p>Time Left: {timeLeft}s</p>

<p>Score: {score}</p>

<p>Hints Left: {hintsLeft}</p>

</div>

<button style={styles.hintBtn} onClick={useHint}>
Use Hint
</button>

{showHint &&
<p style={styles.hint}>
Hint: {questions[currentQuestion].hint}
</p>
}

</div>

)}

</div>

</div>

);

}

const styles={

container:{
height:"100vh",
width:"100%",
display:"flex",
justifyContent:"center",
alignItems:"center",
color:"white",
fontFamily:"monospace",
overflow:"hidden",
position:"relative"
},

background:{
position:"absolute",
height:"100%",
width:"100%",
background:"black",
backgroundImage:"linear-gradient(45deg,#0f2027,#203a43,#2c5364)",
animation:"moveBg 10s infinite linear",
zIndex:-1
},

gameBox:{
width:"70%",
maxWidth:"900px",
background:"rgba(0,0,0,0.7)",
padding:"40px",
borderRadius:"10px",
textAlign:"center",
boxShadow:"0 0 20px cyan"
},

question:{
fontSize:"22px",
whiteSpace:"pre-line",
marginBottom:"20px"
},

options:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"15px"
},

button:{
padding:"12px",
fontSize:"18px",
cursor:"pointer",
borderRadius:"5px",
border:"none",
background:"cyan",
color:"black",
fontWeight:"bold"
},

info:{
marginTop:"20px",
fontSize:"18px",
display:"flex",
justifyContent:"space-around"
},

hintBtn:{
marginTop:"20px",
padding:"10px 20px",
fontSize:"16px",
background:"orange",
border:"none",
cursor:"pointer"
},

hint:{
marginTop:"10px",
color:"yellow"
}

};

export default Level1;