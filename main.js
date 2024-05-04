// alert ('pepe the frog')


  /*----- constants -----*/
  maxGuesses = 20;



  const pack1 = ["traditional_pepes/pepe_troll.png", "traditional_pepes/pepe_sweat.png", "traditional_pepes/pepe_smart.png", "traditional_pepes/pepe_popcorn.png", "traditional_pepes/pepe_oof.png", "traditional_pepes/pepe_happy.png", "traditional_pepes/pepe_crying.png", "traditional_pepes/pepe_angry.png"]

  const pack2 = ["pepe_love/pepe-love.png", "pepe_love/pepe_rose.png", "pepe_love/pepe_ribbon.png", "pepe_love/pepe_hearteyes.png", "pepe_love/pepe_giftheart.png", "pepe_love/pepe_cupid.png", "pepe_love/pepe_chocolateheart.png", "pepe_love/heartstruck.png"]



  
//   let lose = guesses > maxGuesses
//   let winner = checkBoardForWinner();
//   if (winner) return winner;

//   /*----- state variables -----*/
// renderAttempts () = 0;
// correctMove = 0;

//   /*----- cached elements  -----*/


//   /*----- event listeners -----*/
// function handleMove(evt){
//     if (winner) return;
//     render();
// }

//   /*----- functions -----*/



//   const container = document.getElementById("cards")

// //   function rendercardPacks() {
// //     let images = ""
// //     for (let i = 0; i < pack1.length; i++){
// //         images += `<img src="${pack1[i]}">`
// //     }
// //     container.innerHTML = images
// //   }

//   function renderGame() {
//     rendercardPacks();
//     renderAttempts();
//     renderAttemptsRemaining();
//     renderWrongMove();
//   }



  // replace the image source



 // Variables to keep track of flipped cards
  let firstCard, secondCard

  // function to shuffle cards

  function shuffle(){
    let images = pack1.length
    let randomImage
    let temporaryImage
    while (randomImage !== 0){
        randomImage = Math.floor(Math.random() * images)  
        images -= 1
        temporaryImage = pack1[images]
        pack1[images] = pack1[randomImage]
        pack1[randomImage] = temporaryImage 
    } 
  }

 const deck1 = document.querySelector("#cardpack1")

 const duplicates = pack1.concat(pack1)

  // function to display images
  function displayCards(){
    shuffle(duplicates)
    duplicates.forEach((image, index) => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.dataset.index = index;
        card.innerHTML = 
        `<div class="frontCard">
            <img class ="cards" src=${image} visbility: visible />
        </div>`
        card.addEventListener("click", onCardClick)
        container.appendChild(card)
    })
  }


  function resetBoard(){
    firstCard = null
    secondCard = null
  }

  function restart(){
    shuffle()
    displayCards()
 }

  
// Function to handle card click
function onCardClick(event) {
    const clickedCard = event.target.parentNode
}
// display cards on windowload
window.onload = displayCards()



  // function to select cards

  // function to start game


  //first click must match second click
  // function to check if cards match
    function cardMatch(){
        if (firstCard === secondCard){
            
        }
    }
  // function to keep cards flipped if they match
  // function to unflip cards if they aren't matching
  // function to generate wrong move
  // function to generate right move
  // function for moves remaining
  // function to end move upon time limit
  // function to reset game/restart
