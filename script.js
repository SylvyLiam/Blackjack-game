const dealerCards = document.getElementById('dealer-cards');
const playerCards = document.getElementById('player-cards');
const dealerScore = document.getElementById('dealer-score');
const playerScore = document.getElementById('player-score');
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

let dealerHand = [];
let playerHand = [];
let isGameOver = false;

function getCardValue(card) {
    if (card === 'J' || card === 'Q' || card === 'K') return 10;
    if (card === 'A') return 11;
    return parseInt(card);
}

function calculateScore(hand) {
    let score = hand.reduce((total, card) => total + getCardValue(card), 0);
    if (score > 21 && hand.includes('A')) {
        score -= 10; // Adjust for Ace being 1 instead of 11
    }
    return score;
}

function updateUI() {
    dealerCards.innerHTML = dealerHand.map(card => `<div class="card">${card}</div>`).join('');
    playerCards.innerHTML = playerHand.map(card => `<div class="card">${card}</div>`).join('');
    dealerScore.textContent = calculateScore(dealerHand);
    playerScore.textContent = calculateScore(playerHand);
}

function dealInitialCards() {
    dealerHand = [getRandomCard(), getRandomCard()];
    playerHand = [getRandomCard(), getRandomCard()];
    updateUI();
}

function getRandomCard() {
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return cards[Math.floor(Math.random() * cards.length)];
}

function checkGameOver() {
    const playerTotal = calculateScore(playerHand);
    const dealerTotal = calculateScore(dealerHand);

    if (playerTotal > 21) {
        message.textContent = "You bust! Dealer wins.";
        isGameOver = true;
    } else if (dealerTotal > 21) {
        message.textContent = "Dealer busts! You win!";
        isGameOver = true;
    } else if (playerTotal === 21 || dealerTotal === 21) {
        message.textContent = playerTotal === 21 ? "Blackjack! You win!" : "Dealer has Blackjack!";
        isGameOver = true;
    }
}

hitBtn.addEventListener('click', function () {
    if (!isGameOver) {
        playerHand.push(getRandomCard());
        updateUI();
        checkGameOver();
    }
});

standBtn.addEventListener('click', function () {
    if (!isGameOver) {
        while (calculateScore(dealerHand) < 17) {
            dealerHand.push(getRandomCard());
        }
        updateUI();
        checkGameOver();
    }
});

resetBtn.addEventListener('click', function () {
    dealerHand = [];
    playerHand = [];
    isGameOver = false;
    message.textContent = "";
    dealInitialCards();
});

// Initialize game
dealInitialCards();
