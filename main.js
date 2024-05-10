const pack1 = [
  "traditional_pepes/pepe_troll.png",
  "traditional_pepes/pepe_sweat.png",
  "traditional_pepes/pepe_smart.png",
  "traditional_pepes/pepe_popcorn.png",
  "traditional_pepes/pepe_oof.png",
  "traditional_pepes/pepe_happy.png",
  "traditional_pepes/pepe_crying.png",
  "traditional_pepes/pepe_angry.png",
];

const pack2 = [
  "pepe_love/pepe-love.png",
  "pepe_love/pepe_rose.png",
  "pepe_love/pepe_ribbon.png",
  "pepe_love/pepe_hearteyes.png",
  "pepe_love/pepe_giftheart.png",
  "pepe_love/pepe_cupid.png",
  "pepe_love/pepe_chocolateheart.png",
  "pepe_love/heartstruck.png",
];

//   let lose = guesses > maxGuesses
//   let winner = checkBoardForWinner();
//   if (winner) return winner;

// function to shuffle cards
function shuffle(arr) {
  let currentIndex = arr.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
}

let cardsFlipped = [];
let cardMatches = [];

function startGame() {
  const button1 = document.querySelector(".begin");
  const wrapper = document.querySelector(".wrapper")
  const gameBoard = document.querySelector("#container")
  button1.onclick = () => {
    console.log("wrapper")
    wrapper.style.visibility="hidden"
    gameBoard.style.visibility="visible"
}
}

//   document.querySelector("#game").style.visibility= "visible"
window.onload = displayCards();
// function to display images
function displayCards() {
  startGame()
  const container = document.getElementById("container");
  const duplicates = pack2.concat(pack2);
  const shuffled = shuffle(duplicates);
  shuffled.forEach((images, index) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("card");
    gameCard.dataset.index = index;
    gameCard.innerHTML += `<div class="frontCard">
            <img class ="front" src=${images} style="visibility: hidden;" />
        </div>`;
    container.appendChild(gameCard);
    gameCard.addEventListener("click", () => {
      if (cardsFlipped.length < 2) {
        selectCard(gameCard);
        cardsFlipped.push(gameCard);
        if (cardsFlipped.length === 2) {
          setTimeout(checkMatch, 0);
        }
      }
    });
  });
}


// button1.onclick = restart()
// function to start game

function restart(arr) {
  shuffle(arr);
  displayCards();
}

// function to select cards

function selectCard(card) {
  const newImage = card.querySelector(".front");
  newImage.style.visibility = "visible";
}

// function to check for matches

function checkMatch() {
  const [img1, img2] = cardsFlipped;
  const firstCard = img1.querySelector(".front");
  const secondCard = img2.querySelector(".front");
  if (firstCard.src === secondCard.src) {
    cardMatches.push(img1, img2);
    console.log("matches");
  }
  else if (firstCard !== secondCard) {
    setTimeout(wrongMove, 200);
    flipCards(img1, img2);
  }
  else if (cardMatches.length === pack2.length) {
    gameWon();
  }
  return (cardsFlipped = []);
}
// function to flip cards over
function flipCards(img1, img2) {
  setTimeout(() => {
    img1.querySelector(".front").style.visibility = "hidden";
    img2.querySelector(".front").style.visibility = "hidden";
  }, 500);
}

//first click must match second click
// function to check if cards match

function gameWon() {
  const winner = document.createElement("div");
  winner.classList.add("winner");
  winner.innerHTML = "You Win!";
}

const gameMoves = {
  attempts: 0,
  attemptsRemaining: 20,
  wrongAttempts: 0,
};
// function to generate wrong move
function wrongMove() {
  const attemptsNum = document.querySelector("#attempts");
  const attemptsRemainingNum = document.querySelector("#attemptsLeft");
  const wrongAttemptsNum = document.querySelector("#wrongAttempts");
  gameMoves.attempts++;
  gameMoves.attemptsRemaining--;
  gameMoves.wrongAttempts++;
  attemptsNum.innerHTML = gameMoves.attempts;
  attemptsRemainingNum.innerHTML = gameMoves.attemptsRemaining;
  wrongAttemptsNum.innerHTML = gameMoves.wrongAttempts;
}

// end move upon time limit
// function to reset game/restart
