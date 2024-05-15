const cardPacks = {
  pack1: [
    "traditional_pepes/pepe_troll.png",
    "traditional_pepes/pepe_sweat.png",
    "traditional_pepes/pepe_smart.png",
    "traditional_pepes/pepe_popcorn.png",
    "traditional_pepes/pepe_oof.png",
    "traditional_pepes/pepe_happy.png",
    "traditional_pepes/pepe_crying.png",
    "traditional_pepes/pepe_angry.png",
  ],
  pack2: [
    "pepe_love/pepe-love.png",
    "pepe_love/pepe_rose.png",
    "pepe_love/pepe_ribbon.png",
    "pepe_love/pepe_hearteyes.png",
    "pepe_love/pepe_giftheart.png",
    "pepe_love/pepe_cupid.png",
    "pepe_love/pepe_chocolateheart.png",
    "pepe_love/heartstruck.png",
  ],
  pack3: [
    "pepe_misc/angery.png",
    "pepe_misc/feelswowerman.png",
    "pepe_misc/peepo-blush.png",
    "pepe_misc/peepo-cringe.png",
    "pepe_misc/peepo-guns.png",
    "pepe_misc/peepo-kek.png",
    "pepe_misc/peepo-thinkpeepothink.png",
    "pepe_misc/peepo-uwu.png",
  ],
  pack4: [
    "cute_pepe/pepecomfy.png",
    "cute_pepe/pepecry.png",
    "cute_pepe/pepedab.png",
    "cute_pepe/pepedrink.png",
    "cute_pepe/pepeknife.png",
    "cute_pepe/peperage.png",
    "cute_pepe/pepespeechless.png",
    "cute_pepe/pepesunglasses.png",
  ],
  pack5: [
    "pixel_pepe/2348-pepetriggered.gif",
    "pixel_pepe/clown.png",
    "pixel_pepe/fedora.gif",
    "pixel_pepe/jedi.gif",
    "pixel_pepe/pirate.gif",
    "pixel_pepe/popcornpeped.gif",
    "pixel_pepe/riot.gif",
    "pixel_pepe/skate.gif",
  ],
};

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

let cardId;
let cardsFlipped = [];
let cardMatches = [];

const gameBoard = document.querySelector("#container");
const gamePlay = document.querySelector("#gameplay");
const header = document.querySelector("#game");
const wrapper = document.querySelector(".wrapper");
const details = document.querySelector(".choose");
const cards = document.querySelectorAll(".cards");

cards.forEach((e) => {
  clicked = false;
  e.addEventListener("click", function cardSelect() {
    cardId = e.id;
    const packChoosen = cardPacks[cardId];
    displayCards(packChoosen);
    console.log(cardId);
    if (!clicked) {
      e.removeEventListener("click", cardSelect);
    }
  });
});

function startGame() {
  const button1 = document.querySelector(".begin");
  button1.onclick = () => {
    wrapper.style.visibility = "hidden";
    gameBoard.style.visibility = "visible";
    gamePlay.style.visibility = "visible";
    header.style.visibility = "visible";
    details.style.visibility = "hidden";
  };
}

function displayCards(packChoosen) {
  startGame();
  const container = document.getElementById("container");
  const duplicates = packChoosen.concat(packChoosen);
  const shuffled = shuffle(duplicates);
  shuffled.forEach((images, index) => {
    const gameCard = document.createElement("div");
    gameCard.dataset.index = index;
    gameCard.innerHTML += `<div class="frontCard" />
            <img class ="front" src=${images} style="visibility: hidden;" />
        </div>`;
    container.appendChild(gameCard);
    gameCard.addEventListener("click", flipped);  
  });
}

function flipped(event) {
  if (cardsFlipped.length < 2) {
    selectCard(event.target);
    cardsFlipped.push(event.target);
    if (cardsFlipped.length === 2) {
      setTimeout(checkMatch, 0);
    }
  }
}

function selectCard(card) {
  const newImage = card.querySelector(".front");
  newImage.style.visibility = "visible";
}

function flipCards(img1, img2) {
  setTimeout(() => {
    img1.querySelector(".front").style.visibility = "hidden";
    img2.querySelector(".front").style.visibility = "hidden";
  }, 500);
}

const gameMoves = {
  attempts: 0,
  attemptsRemaining: 20,
  wrongAttempts: 0,
};

function checkMatch() {
  const [img1, img2] = cardsFlipped;
  const firstCard = img1.querySelector(".front");
  const secondCard = img2.querySelector(".front");
  if (firstCard.src === secondCard.src) {
    cardMatches.push(img1, img2);
    firstCard.removeEventListener("click", flipped);
    secondCard.removeEventListener("click", flipped);
    rightMove();
    if (cardMatches.length === cardPacks[cardId].length * 2)
      setTimeout(gameWon, 750);
  } else if (firstCard !== secondCard) {
    setTimeout(wrongMove(), 200);
    flipCards(img1, img2);
  }
  return (cardsFlipped = []);
}

const attemptsNum = document.querySelector("#attempts");
const attemptsRemainingNum = document.querySelector("#attemptsLeft");
const wrongAttemptsNum = document.querySelector("#wrongAttempts");

function wrongMove() {
  gameMoves.attempts++;
  gameMoves.attemptsRemaining--;
  gameMoves.wrongAttempts++;
  attemptsNum.innerHTML = gameMoves.attempts;
  attemptsRemainingNum.innerHTML = gameMoves.attemptsRemaining;
  wrongAttemptsNum.innerHTML = gameMoves.wrongAttempts;
  if (gameMoves.attemptsRemaining <= 0) {
    gameOver();
  }
}

function rightMove() {
  gameMoves.attempts++;
  gameMoves.attemptsRemaining--;
  attemptsNum.innerHTML = gameMoves.attempts;
  attemptsRemainingNum.innerHTML = gameMoves.attemptsRemaining;
}

function gameWon() {
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundImage = "url('styling/fireworks2.gif')";
  const winner = document.querySelector(".winner");
  winner.style.visibility = "visible";
  document
    .querySelectorAll(".front")
    .forEach((element) => (element.style.visibility = "hidden"));
  gameBoard.style.visibility = "hidden";
  gamePlay.style.visibility = "hidden";
  header.style.visibility = "hidden";
}

function gameOver() {
  document
    .querySelectorAll(".front")
    .forEach((element) => (element.style.visibility = "hidden"));
  gameBoard.style.visibility = "hidden";
  header.style.visibility = "hidden";
  const gameOver = document.querySelector(".loser");
  gameOver.style.visibility = "visible";
}

function reset(){
  const button2 = document.querySelector("#reset");
  button2.onclick = () => {
    location.reload()
  }
}

reset()

