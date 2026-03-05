import { useState, useEffect } from "react";

import correctSound from "../assets/sounds/correct.mp3";
import wrongSound from "../assets/sounds/wrong.mp3";
import clickSound from "../assets/sounds/click.mp3";

function Level1({ goHome }) {

const correctAudio = new Audio(correctSound);
const wrongAudio = new Audio(wrongSound);
const clickAudio = new Audio(clickSound);

const questions = [

{
question:"Output of this code?",
code:`#include<stdio.h>
int main(){
int a=5,b=10;
printf("%d",a+b);
}`,
options:["510","15","5","10"],
answer:"15",
hint:"Simple addition"
},

{
question:"Which datatype stores one character?",
options:["int","char","float","string"],
answer:"char",
hint:"Used for letters"
},

{
question:"Output?",
code:`#include<stdio.h>
int main(){
int x=10;
printf("%d %d",x++,++x);
}`,
options:["10 12","10 11","11 11","11 12"],
answer:"10 12",
hint:"Post increment first"
},

{
question:"Output?",
code:`#include<stdio.h>
int main(){
int i;
for(i=0;i<3;i++)
printf("%d",i);
}`,
options:["012","123","321","Error"],
answer:"012",
hint:"Loop starts at zero"
},

{
question:"Output?",
code:`#include<stdio.h>
int main(){
int a=3;
printf("%d",a<<1);
}`,
options:["6","3","1","8"],
answer:"6",
hint:"Left shift multiply by 2"
},

{
question:"Which is input function?",
options:["scanf()","printf()","cin","get()"],
answer:"scanf()",
hint:"Used for user input"
}

];

const [current,setCurrent]=useState(0);
const [score,setScore]=useState(0);
const [selected,setSelected]=useState(null);
const [showResult,setShowResult]=useState(false);
const [time,setTime]=useState(30);
const [hintsLeft,setHintsLeft]=useState(3);
const [showHint,setShowHint]=useState(false);

useEffect(()=>{
if(time>0){
const timer=setTimeout(()=>setTime(time-1),1000);
return ()=>clearTimeout(timer);
}else{
nextQuestion();
}
},[time]);

const checkAnswer=(option)=>{

setSelected(option);

if(option===questions[current].answer){
setScore(score+1);
correctAudio.play();
}else{
wrongAudio.play();
}

};

const nextQuestion=()=>{

clickAudio.play();

setShowHint(false);
setSelected(null);
setTime(30);

if(current+1<questions.length){
setCurrent(current+1);
}else{
setShowResult(true);
}

};

const useHint=()=>{
if(hintsLeft>0){
setHintsLeft(hintsLeft-1);
setShowHint(true);
}
};

if(showResult){

return(

<div style={styles.container}>

<h1 style={styles.title}>🎉 Level 1 Completed</h1>

<h2 style={styles.score}>
Score: {score} / {questions.length}
</h2>

<button style={styles.mainBtn} onClick={goHome}>
Back to Home
</button>

</div>

)

}

return(

<div style={styles.container}>

<div style={styles.card}>

<h1 style={styles.title}>Level 1</h1>

<h2 style={styles.timer}>⏳ {time}s</h2>

<h2 style={styles.question}>
Question {current+1} / {questions.length}
</h2>

<p style={styles.questionText}>
{questions[current].question}
</p>

{questions[current].code && (
<pre style={styles.code}>
{questions[current].code}
</pre>
)}

<div style={styles.options}>

{questions[current].options.map((option,index)=>(

<button
key={index}
style={{
...styles.optionBtn,
background:selected===option ? "#00c6ff" : "#1f2937"
}}
onClick={()=>checkAnswer(option)}
>

{option}

</button>

))}

</div>

<div style={styles.hintSection}>

<button style={styles.hintBtn} onClick={useHint}>
💡 Use Hint ({hintsLeft} left)
</button>

{showHint && (
<p style={styles.hint}>
Hint: {questions[current].hint}
</p>
)}

</div>

<button style={styles.mainBtn} onClick={nextQuestion}>
Next Question
</button>

<button style={styles.backBtn} onClick={goHome}>
Back
</button>

</div>

</div>

);

}

const styles={

container:{
height:"100vh",
width:"100vw",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(-45deg,#0f2027,#203a43,#2c5364,#1c1c1c)",
backgroundSize:"400% 400%",
animation:"gradient 15s ease infinite",
color:"white",
fontFamily:"sans-serif"
},

card:{
width:"900px",
padding:"40px",
borderRadius:"15px",
background:"rgba(0,0,0,0.7)",
boxShadow:"0px 0px 20px rgba(0,0,0,0.5)",
textAlign:"center"
},

title:{
fontSize:"40px",
marginBottom:"10px"
},

timer:{
fontSize:"28px",
color:"#00c6ff"
},

question:{
fontSize:"26px"
},

questionText:{
fontSize:"24px",
marginBottom:"20px"
},

code:{
background:"#111",
padding:"20px",
borderRadius:"10px",
fontSize:"20px",
textAlign:"left"
},

options:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px",
marginTop:"20px"
},

optionBtn:{
padding:"18px",
fontSize:"22px",
borderRadius:"10px",
border:"none",
cursor:"pointer",
color:"white"
},

hintSection:{
marginTop:"20px"
},

hintBtn:{
padding:"12px 20px",
fontSize:"18px",
borderRadius:"8px",
border:"none",
cursor:"pointer"
},

hint:{
marginTop:"10px",
fontSize:"20px",
color:"#00eaff"
},

mainBtn:{
marginTop:"25px",
padding:"15px 30px",
fontSize:"20px",
borderRadius:"10px",
border:"none",
cursor:"pointer",
background:"#00c6ff",
color:"white"
},

backBtn:{
marginTop:"10px",
padding:"10px 20px",
fontSize:"18px",
borderRadius:"8px",
border:"none",
cursor:"pointer"
},

score:{
fontSize:"30px"
}

};

export default Level1;