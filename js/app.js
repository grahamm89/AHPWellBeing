
const SCALE=[
 {label:"Not at all true",value:0},
 {label:"Rarely",value:1},
 {label:"Sometimes",value:2},
 {label:"Often",value:3},
 {label:"Always",value:4}
];
let DATA,QUESTIONS=[],ANSWERS=[],CURRENT=0;
async function load(){DATA=await (await fetch("data.json",{cache:"no-store"})).json();
 for(const k in DATA.sections){DATA.sections[k].questions.forEach(q=>QUESTIONS.push({...q,section:k}));}
}
function showQ(){const q=QUESTIONS[CURRENT];document.getElementById("section-title").textContent=DATA.sections[q.section].title;
document.getElementById("question-text").textContent=q.q;
const opt=document.getElementById("options");opt.innerHTML="";
SCALE.forEach(s=>{const b=document.createElement("button");b.textContent=s.label;b.className="btn";b.onclick=()=>{ANSWERS[CURRENT]=s.value;next();};opt.appendChild(b);});}
function next(){CURRENT++;if(CURRENT<QUESTIONS.length)showQ();else results();}
function prev(){if(CURRENT>0){CURRENT--;showQ();}}
function results(){document.getElementById("quiz").hidden=true;document.getElementById("results").hidden=false;
const total=ANSWERS.reduce((a,b)=>a+b,0);const max=QUESTIONS.length*4;const pct=Math.round(total/max*100);
let band=DATA.bands.very_low; // determine highest matching band
if(pct>=DATA.bands.high.range_pct[0]) band=DATA.bands.high;
else if(pct>=DATA.bands.moderate.range_pct[0]) band=DATA.bands.moderate;
else if(pct>=DATA.bands.low.range_pct[0]) band=DATA.bands.low;
document.getElementById("score").textContent=`Score: ${total}/${max} (${pct}%)`;
document.getElementById("banding").textContent=`${band.label}: ${band.advice}`;
const ul=document.getElementById("tips-list");ul.innerHTML="";
QUESTIONS.forEach((q,i)=>{ if(ANSWERS[i] < 2 && q.tip){ const li=document.createElement("li"); li.textContent=q.tip; ul.appendChild(li);} });
}
document.getElementById("start-btn").onclick=()=>{document.getElementById("start").hidden=true;document.getElementById("quiz").hidden=false;CURRENT=0;ANSWERS=[];showQ();};
document.getElementById("prev").onclick=prev;document.getElementById("next").onclick=next;
document.getElementById("restart").onclick=()=>location.reload();
window.addEventListener("online", ()=>document.getElementById("offline-msg").hidden=true);
window.addEventListener("offline", ()=>document.getElementById("offline-msg").hidden=false);
load();
