let gameseq = [];
let userseq = [];
let started = false;
let lev = 0;
// ADDED: Start button
let startBtn = document.querySelector("#start-btn");
let btns = ["yellow","red","green","purple"];

let h2 = document.querySelector("h2");

// ADDED: High score variable
let highScore = 0;

// ADDED: High score element
let highScoreText = document.querySelector("#high-score");

// ADDED: Start game when START button is clicked
startBtn.addEventListener("click",function() {

    if(started == false) {

        started = true;

        // Hide start button during the game
        startBtn.style.display = "none";

        levup();
    }

});

// Game sequence flash
function gameflash(btn) {

    btn.classList.add("flash");

    setTimeout(function() {
        btn.classList.remove("flash");
    },200);

}


// User button flash
function userflash(btn) {

    btn.classList.add("userflash");

    setTimeout(function() {
        btn.classList.remove("userflash");
    },150);

}


// Move to next level
function levup() {

    userseq = [];

    lev++;

    // MODIFIED: Show current level
    h2.innerText = `Level ${lev}`;

    // FIXED: *4 instead of *3
    // Because there are 4 buttons.
    let rand = Math.floor(Math.random() * 4);

    let randcolor = btns[rand];

    let randbtn = document.querySelector(`.${randcolor}`);

    gameflash(randbtn);

    gameseq.push(randcolor);

}


// Check user's answer
function check(idx) {

    // Check whether user's current button is correct
    if(userseq[idx] == gameseq[idx]) {

        // User completed the whole sequence
        if(userseq.length == gameseq.length) {

            // FIXED:
            // setTimeout(levup(),100) was wrong.
            // It executes levup immediately.
            setTimeout(levup,100);
        }

    }

    else {

        // MODIFIED: Better game over message
      h2.innerHTML = `Game Over! Your score was <b>${lev - 1}</b>.`;

        // ADDED: Update high score
        if(lev - 1 > highScore) {

            highScore = lev - 1;

            highScoreText.innerText = `High Score: ${highScore}`;
        }

        // Game over background
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function() {

            document.querySelector("body").style.background =
                "linear-gradient(135deg,#24104f,#4b168c)";

        },200);

        reset();
    }

}


// When user presses a button
function btnpress() {

    // Don't allow button presses before game starts
    if(started == false) {
        return;
    }

    let btn = this;

    userflash(btn);

    // FIXED: Added let
    let usercolor = btn.getAttribute("id");

    userseq.push(usercolor);

    check(userseq.length - 1);

}


// Select all four buttons
let allbtn = document.querySelectorAll(".btn");


// Add click event to every button
for(let btn of allbtn) {

    btn.addEventListener("click",btnpress);

}


// Reset the game
function reset() {

    started = false;

    lev = 0;

    userseq = [];

    gameseq = [];

    // ADDED: Show start button again after game over
    startBtn.style.display = "inline-block";

}