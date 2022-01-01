// card options
document.addEventListener('DOMContentLoaded', () => {
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
 ];

 // Allows to refresh game with new card positions to randomize our card array
cardArray.sort(() => 0.5 - Math.random())


//  creating grid variable selecting grid class
 const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
var cardsChosen = []
var cardsChosenId = []
var cardsWon = []

//  create gameboard
function createBoard() {
    // iterate over the cardArray, for each create an image element
    for(let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        // for each card, set an attribute linking to the relative path image
        card.setAttribute('src', 'images/blank.png')
        // give each card a data id and loop through 
        card.setAttribute('data-id', i)
        // add event listener to see if cards have been clicked, initiating a flip
        card.addEventListener('click', flipCard)
        // We put the card into the class of 'grid' using append child! Cool!
        grid.appendChild(card)
    }
}

// Check for matches
function checkForMatch() {
    const cards = document.querySelectorAll('img')
    // taking first value in array and assigning it to optionOneId
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('You have clicked the same image!')
    } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!')
        // Set 'blank' image to the matched card
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        // Push correct matches into cardsWon to be stored in empty array
        cardsWon.push(cardsChosen)
    } else {
        // if incorrect, flip card back over to be played again
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('Sorry! Try again')
    }
    // If either of these options happen, we want to clear cardsChosen and CardID array
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textConent = cardsWon.length;
    // If cardswon equals length of our cards/2 we have collected all cards possible from the array
    if (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations, You won.'
    }

}

// Flip your card
function flipCard() {
    // getting data-id attribute from the function above
    var cardId = this.getAttribute('data-id')
    // push cards from cardarray based on their card ID.
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    // this command lets us set an image based on the cardId the element holds
    this.setAttribute('src', cardArray[cardId].img)
    // if the cardsChosen array is equal to 2 we want to check for match
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

createBoard();
})