const board = document.querySelector(".board"); 
let locked = false;
let arajin = null;
let erkrord = null;
let winn = 0;
let lives = 10;
const livesBox = document.querySelector(".lives");
const restartContainer = document.querySelector(".restart");
const startContainer = document.querySelector(".start"); 
const winnerOverlay = document.querySelector(".winner-overlay");

const imgss = [
    { src: "./img/1.jpeg" },
    { src: "./img/2.jpg" },
    { src: "./img/3.jpg" },
    { src: "./img/4.webp" },
    { src: "./img/5.jpg" },
    { src: "./img/6.jpg" },
    { src: "./img/7.jpeg" },
    { src: "./img/8.jpg" }
];

let carss = [];

function drawLives() {
    livesBox.innerHTML = "❤️".repeat(lives);
}

function startGame() {
    drawLives();
    carss = [...imgss, ...imgss];
    carss.sort(() => Math.random() - 0.5);

    board.innerHTML = "";

    for (let i = 0; i < 16; i++) {
        const div = document.createElement("div");
        div.className = "imgD";

        const img = document.createElement("img");
        img.src = carss[i].src;
        div.append(img);

        setTimeout(() => { img.style.display = "none"; }, 2000);

        div.addEventListener("click", () => {
            if (arajin === div || locked) return;
            img.style.display = "block";

            if (!arajin) {
                arajin = div;
            } else {
                erkrord = div;
                locked = true;

                if (arajin.querySelector("img").src === erkrord.querySelector("img").src) {
                    winn++;
                    arajin = null;
                    erkrord = null;
                    locked = false;

                    if (winn === 8) {
                        showWinner();
                    }
                } else {
                    lives--;
                    drawLives();

                    setTimeout(() => {
                        arajin.querySelector("img").style.display = "none";
                        erkrord.querySelector("img").style.display = "none";
                        arajin = null;
                        erkrord = null;
                        locked = false;

                        if (lives === 0) {
                            setTimeout(() => {
                                alert("💔 Game Over!");
                                showRestartButton();
                            }, 300);
                        }
                    }, 500);
                }
            }
        });

        board.append(div);
    }

    setTimeout(() => { board.classList.add("show"); }, 100);
}

function showWinner() {
    const cards = document.querySelectorAll(".imgD");
    cards.forEach((c, i) => {
        setTimeout(() => c.classList.add("firework"), i * 100);
        setTimeout(() => c.classList.remove("firework"), 1000 + i * 100);
    });

    winnerOverlay.classList.add("show");
    setTimeout(() => {
        winnerOverlay.classList.remove("show");
        restartGame();
    }, 2500);
}

function showRestartButton() {
    restartContainer.innerHTML = "";

    const btn = document.createElement("button");
    btn.textContent = "Restart Game 🔄";
    btn.addEventListener("click", () => {
        restartContainer.innerHTML = "";
        restartGame();
    });

    restartContainer.append(btn);
}

function restartGame() {
    board.innerHTML = "";
    winn = 0;
    lives = 10;
    drawLives();
    arajin = null;
    erkrord = null;
    locked = false;
    board.classList.remove("show");
    startGame();
}

function createStartButton() {
    startContainer.innerHTML = "";
    const btn = document.createElement("button");
    btn.textContent = "Start Game ▶️";

    btn.addEventListener("click", () => {
        btn.classList.add("fade-out");
        btn.addEventListener("animationend", () => {
            startContainer.style.display = "none"; 
            startGame();
        });
    });

    startContainer.append(btn);
}

createStartButton();
