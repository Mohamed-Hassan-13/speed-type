
let levelname =document.querySelector(".levelname")
let second =document.querySelector(".second")
let start =document.querySelector(".start")
let randomword =document.querySelector(".randomword")
let input =document.querySelector("input")
let words =document.querySelector(".words")
let Second2 =document.querySelector(".Second2")
let from =document.querySelector(".from")
let numberscore =document.querySelector(".numberscore")
let spans =document.querySelectorAll(".chose span")
let hard = document.getElementById("hard")
let normal = document.getElementById("normal")
let easy = document.getElementById("easy")

let easy_word=[
    "Zero",
    "Girl",
    "Bald",
    "Boat",
    "Ride",
    "Rise",
    "Pour",
    "Hurt",
    "Solo",
    "Gift",
    "Term",
    "Doll",
    "Save",
    "Plan",
    "Tell",
    "Beam",
    "Slap",
    "Heel",
    "Herd",
    "Tire"

]

let normal_word=[
    "Vinify",
    "Wusses",
    "Brachs",
    "Bemean",
    "Lunker",
    "Calces",
    "Claves",
    "Faking",
    "Limber",
    "Sluing",
    "Cozily",
    "Stains",
    "Sixtes",
    "Sopped",
    "Fusing",
    "Fusing",
    "Vibrio",
    "System",
    "Pokeys",
    "Weirdo"
];

let hard_word=[
    "Substantial",
    "Childlike",
    "Mundane",
    "Wealthy",
    "Gullible",
    "Ruthless",
    "Helpless",
    "Snobbish",
    "Clammy",
    "Discussion",
    "Attraction",
    "Umbrella",
    "Cobweb",
    "Basketball",
    "Thoughtless",
    "Boundless",
    "Perpetual",
    "Scattered",
    "Agreement",
    "Inconclusive"
];



let allword =normal_word

let obj ={
    easy:5,
    normal:4,
    hard:3
};

let Difficulty= "normal"

spans.forEach(span => {
    span.addEventListener("click",(e)=>{
        Difficulty=e.target.dataset.name
        spans.forEach(element => {
            element.classList.remove("active")
            chose(e.target.dataset.name)
        });
        span.classList.add("active")
        second.innerHTML=obj[Difficulty];
        levelname.innerHTML=Difficulty;
    })
});

function chose(data){
if(data==="easy"){
    allword=easy_word
}
else if(data==="normal"){
    allword =normal_word
}
else if(data==="hard"){
    allword=hard_word
}
}



let secondgame= obj[Difficulty]
from.innerHTML=allword.length;

input.onpaste = function(){
    return false
}


start.onclick=function(){
    Second2.innerHTML=obj[Difficulty]+2;
    start.remove()
    input.focus()

    Generate()
}
function Generate(){

    let word =allword[Math.floor(Math.random() * allword.length)]

    let index =allword.indexOf(word)
    allword.splice(index , 1)
    randomword.innerHTML=word;
    words.innerHTML=""

    for(let i =0 ; i<allword.length ; i++){
        let div =document.createElement("div")
        words.append(div)
        div.innerHTML=allword[i]
    }
    time()
}

function time(){
    let number =setInterval(() => {
        Second2.innerHTML--
        if (Second2.innerHTML === "0") {
            clearInterval(number)
            curect()

        }
    }, 1000);
   
}


function curect(){
    if(input.value.toLowerCase() === randomword.innerHTML.toLowerCase()){
        input.value=""
        numberscore.innerHTML++
        wins()

    }else{
        topscore()
        fin("Game Over")
    }
}


function wins () {
    if(allword.length > 0){
        Generate()
    Second2.innerHTML=obj[Difficulty]
    }else{
        topscore()
        fin("you win")

    }
  }

function topscore(){
    if(Difficulty==="easy"){
        console.log(numberscore.innerHTML);
        console.log(localStorage.getItem("easy"));
        if(Number(numberscore.innerHTML) > localStorage.getItem("easy")){
            easy.innerHTML=numberscore.innerHTML + "/20"
            localStorage.setItem("easy",numberscore.innerHTML)
        } 
    }

    if(Difficulty==="normal"){
        if(Number(numberscore.innerHTML) > localStorage.getItem("normal")){
            normal.innerHTML=numberscore.innerHTML + "/20"
            localStorage.setItem("normal",numberscore.innerHTML)
        }
    }

    if(Difficulty==="hard"){
        if(Number(numberscore.innerHTML) > localStorage.getItem("hard")){
            hard.innerHTML=numberscore.innerHTML + "/20"
            localStorage.setItem("hard",numberscore.innerHTML)
        }
    }

}

if(localStorage.getItem("easy")===null){
    easy.innerHTML="0/20"
}else{
    easy.innerHTML=localStorage.getItem("easy")+ "/20"
}

if(localStorage.getItem("normal")===null){
    normal.innerHTML="0/20"
}else{
    normal.innerHTML=localStorage.getItem("normal") +"/20"
}

if(localStorage.getItem("hard")===null){
    hard.innerHTML="0/20"
}else{
    hard.innerHTML=localStorage.getItem("hard") +"/20"
}


function fin (text){
    let overlay =document.createElement("div")
    document.body.append(overlay)
    overlay.classList.add("overlay")
    let cong =document.createElement("div")
    document.body.append(cong)
    cong.classList.add("cong")
    let p =document.createElement("p")
    cong.append(p)
    p.innerHTML=text
    let span =document.createElement("span")
    cong.append(span)
    span.innerHTML=`score ${numberscore.innerHTML} from 20`
    let but =document.createElement("button")
    cong.append(but)  
    but.innerHTML="Replay" 
    but.onclick=function(){
        location.reload()
    }
}