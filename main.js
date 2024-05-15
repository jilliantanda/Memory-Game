
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
};



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

let cardId;
let cardsFlipped = [];
let cardMatches = [];

const gameBoard = document.querySelector("#container");
const gamePlay = document.querySelector("#gameplay");
const header = document.querySelector("#game");
const wrapper = document.querySelector(".wrapper");
const details = document.querySelector(".choose")
const cards = document.querySelectorAll(".cards")

 

cards.forEach((e) => { 
     e.addEventListener("click", () => {
       cardId = e.id
       const packChoosen = cardPacks[cardId]
       displayCards(packChoosen);
       console.log(cardId)
    })
    })


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

  
// function to display images
function displayCards(packChoosen) {
  startGame();
  const container = document.getElementById("container");
  const duplicates = packChoosen.concat(packChoosen)
  const shuffled = shuffle(duplicates);
  shuffled.forEach((images, index) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("card");
    gameCard.dataset.index = index;
    gameCard.innerHTML += `<div class="frontCard" />
            <img class ="front" src=${images} style="visibility: hidden;" />
        </div>`;
    container.appendChild(gameCard);
    gameCard.addEventListener("click", flipped);

  })
}


// function choosePack(){
  
// }


function flipped(event) {
  if (cardsFlipped.length < 2) {
    selectCard(event.target);
    cardsFlipped.push(event.target);
    if (cardsFlipped.length === 2) {
      setTimeout(checkMatch, 0);
    }
  }
}


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
    firstCard.removeEventListener("click", flipped);
    secondCard.removeEventListener("click", flipped);
    // if (cardMatches.length === cardPacks.pack4.length * 2) setTimeout(gameWon, 750);
    if (cardMatches.length === cardPacks[cardId].length * 2)
      setTimeout(gameWon, 750);
  } else if (firstCard !== secondCard) {
    setTimeout(wrongMove, 200);
    flipCards(img1, img2);
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
  console.log("you win");
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundImage = "url('styling/fireworks2.gif')";
  const winner = document.querySelector(".winner");
  winner.style.visibility = "visible";
  const choose = document.querySelector(".choose");
  choose.style.visibility = "hidden";
  document
    .querySelectorAll(".front")
    .forEach((element) => (element.style.visibility = "hidden"));
  gameBoard.style.visibility = "hidden";
  gamePlay.style.visibility = "hidden";
  header.style.visibility = "hidden";
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
