const cardArray = [
    { name: 'fries', img: 'assets/images/fries.png' },
    { name: 'fries', img: 'assets/images/fries.png' },
    { name: 'cheeseburger', img: 'assets/images/cheeseburger.png' },
    { name: 'cheeseburger', img: 'assets/images/cheeseburger.png' },
    { name: 'hotdog', img: 'assets/images/hotdog.png' },
    { name: 'hotdog', img: 'assets/images/hotdog.png' },
    { name: 'ice-cream', img: 'assets/images/ice-cream.png' },
    { name: 'ice-cream', img: 'assets/images/ice-cream.png' },
    { name: 'milkshake', img: 'assets/images/milkshake.png' },
    { name: 'milkshake', img: 'assets/images/milkshake.png' },
    { name: 'pizza', img: 'assets/images/pizza.png' },
    { name: 'pizza', img: 'assets/images/pizza.png' },
];

// Shuffle cards
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenIDs = [];
let cardsWon = [];

// Create the game board
function createCards() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'assets/images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.append(card);
    }
}
createCards();

// Flip card
function flipCard() {
    const cardID = this.getAttribute('data-id');
    if (cardsChosenIDs.includes(cardID)) return; // Prevent clicking the same card twice
    cardsChosen.push(cardArray[cardID].name);
    cardsChosenIDs.push(cardID);
    this.setAttribute('src', cardArray[cardID].img);

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Check for matches
function checkMatch() {
    const cards = document.querySelectorAll('img');
    const [optionOneID, optionTwoID] = cardsChosenIDs;

    if (cardsChosen[0] === cardsChosen[1] && optionOneID !== optionTwoID) {
        // Match found
        cards[optionOneID].setAttribute('src', 'assets/images/white.png');
        cards[optionTwoID].setAttribute('src', 'assets/images/white.png');
        cardsWon.push(cardsChosen);
        cards[optionOneID].removeEventListener('click', flipCard);
        cards[optionTwoID].removeEventListener('click', flipCard);
    } else {
        // No match
        cards[optionOneID].setAttribute('src', 'assets/images/blank.png');
        cards[optionTwoID].setAttribute('src', 'assets/images/blank.png');
    }

    // Reset choices
    cardsChosen = [];
    cardsChosenIDs = [];

    // Update score
    resultDisplay.textContent = `Score: ${cardsWon.length}`;

    // Check for game completion
    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found all matches!';
    }
}
