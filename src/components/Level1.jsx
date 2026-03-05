import { useState, useEffect } from "react";

function Level1({ goHome }) {

const questions = [

{
question: "What will be the output of the following C code?",
code:
`#include<stdio.h>
int main(){
   int a=5,b=10;
   printf("%d",a+b);
   return 0;
}`,
options:["510","15","5","10"],
answer:"15",
hint:"Addition of two integers"
},

{
question:"Which data type is used to store a single character?",
options:["char","string","int","float"],
answer:"char",
hint:"It stores only one letter"
},

{
question:"What will be the output?",
code:
`#include<stdio.h>
int main(){
   int x=10;
   printf("%d %d",x++,++x);
}`,
options:["10 12","10 11","11 11","11 12"],
answer:"10 12",
hint:"Post increment happens after printing"
},

{
question:"Which symbol is used to end a statement in C?",
options:[":",";","!","."],
answer:";",
hint:"Every line ends with this"
},

{
question:"What will be the output?",
code:
`#include<stdio.h>
int main(){
   int a=5;
   if(a=10)
   printf("Hello");
   else
   printf("Bye");
}`,
options:["Hello","Bye","Error","Nothing"],
answer:"Hello",
hint:"Assignment inside if condition"
},

{
question:"What will be the output?",
code:
`#include<stdio.h>
int main(){
   int i;
   for(i=0;i<3;i++)
   printf("%d",i);
}`,
options:["012","123","321","Error"],
answer:"012",
hint:"Loop starts from 0"
},

{
question:"Which function is used for input in C?",
options:["scanf()","printf()","cin","gets()"],
answer:"scanf()",
hint:"Used to take values from user"
},

{
question:"What will be the output?",
code:
`#include<stdio.h>
int main(){
int a=3;
printf("%d",a<<1);
}`,
options:["6","3","1","8"],
answer:"6",
hint:"Left shift multiplies by 2"
},

{
question:"Which keyword is used to define a constant variable?",
options:["constant","const","final","define"],
answer:"const",
hint:"It prevents modification"
},

{
question:"What will be the output?",
code:
`#include<stdio.h>
int main(){
int a=5;
printf("%d",a++ + ++a);
}`,
options:["12","11","10","13"],
answer:"12",
hint:"Both increments affect value"
}

];

const [current,setCurrent]=useState(0);
const [score,setScore]=useState(0);
const [selected,setSelected]=useState(null);
const [showResult,setShowResult]=useState(false);
const [time,setTime]=useState(30);

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
}
};

const nextQuestion=()=>{
setSelected(null);
setTime(30);

if(current+1<questions.length){
setCurrent(current+1);
}else{
setShowResult(true);
}
};

if(showResult){
return(
<div style={styles.container}>
<h1>Level 1 Complete 🎉</h1>
<h2>Your Score: {score} / {questions.length}</h2>

<button style={styles.button} onClick={goHome}>
Back To Home
</button>

</div>
)
}

return(

<div style={styles.container}>

<h1>Level 1</h1>

<h3>Question {current+1} / {questions.length}</h3>

<h2>⏳ {time}s</h2>

<p style={styles.question}>
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
background:selected===option?"#00c6ff":"#222"
}}
onClick={()=>checkAnswer(option)}
>
{option}
</button>
))}

</div>

<p style={styles.hint}>
Hint: {questions[current].hint}
</p>

<button
style={styles.button}
onClick={nextQuestion}
>
Next Question
</button>

<button
style={styles.backBtn}
onClick={goHome}
>
Back
</button>

</div>

);
}

const styles={

container:{
height:"100vh",
width:"100vw",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#141e30,#243b55)",
color:"white",
textAlign:"center"
},

question:{
fontSize:"20px",
margin:"10px"
},

code:{
background:"#111",
padding:"15px",
borderRadius:"8px",
textAlign:"left"
},

options:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"15px",
marginTop:"20px"
},

optionBtn:{
padding:"12px",
fontSize:"16px",
borderRadius:"8px",
border:"none",
cursor:"pointer",
color:"white"
},

button:{
marginTop:"20px",
padding:"12px 25px",
fontSize:"16px",
borderRadius:"8px",
border:"none",
cursor:"pointer",
background:"#00c6ff",
color:"white"
},

backBtn:{
marginTop:"10px",
padding:"10px 20px",
borderRadius:"8px",
border:"none",
cursor:"pointer"
},

hint:{
marginTop:"10px",
opacity:"0.8"
}

};

export default Level1;