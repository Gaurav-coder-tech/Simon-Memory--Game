let gameseq = [];
let userseq = [];
let started = false;
let lev = 0;
let startBtn = document.querySelector("#start-btn");
let btns = ["yellow","red","green","purple"];
let h2 = document.querySelector("h2");
let highScore = 0;

let highScoreText = document.querySelector("#high-score");
startBtn.addEventListener("click",function() {

    if(started == false) {
        started = true;
        startBtn.style.display = "none";
        levup();
    }
});
function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },200);

}
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },150);
}
function levup() {
    userseq = [];
    lev++;
    h2.innerText = `Level ${lev}`;
    let rand = Math.floor(Math.random() * 4);
    let randcolor = btns[rand];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameflash(randbtn);
    gameseq.push(randcolor);
}
function check(idx) {
    if(userseq[idx] == gameseq[idx]) {
        if(userseq.length == gameseq.length) {
            setTimeout(levup,100);
        }
    }
    else {
      h2.innerHTML = `Game Over! Your score was <b>${lev - 1}</b>.`;
        if(lev - 1 > highScore) {
            highScore = lev - 1;
            highScoreText.innerText = `High Score: ${highScore}`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.background =
                "linear-gradient(135deg,#24104f,#4b168c)";
        },200);
        reset();
    }
}
function btnpress() {
    if(started == false) {
        return;
    }
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    check(userseq.length - 1);
}
let allbtn = document.querySelectorAll(".btn");
for(let btn of allbtn) {
    btn.addEventListener("click",btnpress);
}
function reset() {
    started = false;
    lev = 0;
    userseq = [];
    gameseq = [];
    startBtn.style.display = "inline-block";
}