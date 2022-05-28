//----------- imported obj
import fullDeckObj from "./cards.js"


//------------ global Vars
let shuffledDeck = [];
let comparisonArray = []


// ---------- DOM selectors
const usersHandHTML = document.querySelector(".user__hand");
const tableDeck = document.querySelector(".table__deck");
const tableStack = document.querySelector(".table__stack")
const tableBurn = document.querySelector('.table__burn')
const giveCard = document.querySelector("#give-card");
const snap = document.querySelector('#snap-button')
const updateStack = document.querySelector('#update-stack')
const goToBurn = document.querySelector('#burn-card')


// --------- start of game
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const startGame = () => {
    shuffledDeck = shuffle(fullDeckObj)
    return shuffledDeck
}
startGame()




const compareCardValues = (valueOne, valueTwo) => {
    let highest = 0
    valueOne > valueTwo ? highest = valueOne : highest = valueTwo
    return highest;
}

const compareCardSnap = (userCard, stackCard) => {
    let decisionMessage = "";
    userCard === stackCard ? decisionMessage = "Snap!!!" : decisionMessage = "Unlucky they dont match..."
    return decisionMessage;
}


// --------------- moving cards to be used
const giveStackCard = (event) => {
    event = event.target;
    let removedCard = removeFromDeck(shuffledDeck)
    collectCardValues(removedCard)
    let cardGiven = createCardInfo(removedCard)
    return makeCard(cardGiven, tableStack);
}
const giveUserCard = (event) => {
    event = event.target;
    let removedCard = removeFromDeck(shuffledDeck)
    collectCardValues(removedCard)
    let cardGiven = createCardInfo(removedCard)
    return makeCard(cardGiven, usersHandHTML);
}
const removeFromDeck = (deck) => {
    return deck.pop()
}
const collectCardValues = (card) => {
    let NumberValueForCard = card.value
    return NumberValueForCard
}
const createCardInfo = (givenObj) => {
    let cardInfo =
        ` <section class="card card--${givenObj.suite}" value="${givenObj.name}">
    <div class="card__inner card__inner--centered">
        <div class="card__column">
            <div class="card__symbol"></div>
            <div class="card__symbol"></div>
        </div>
    </div>
</section>`
    return cardInfo

}
const makeCard = (givenCardInfo, htmlElement) => {
    htmlElement.innerHTML = givenCardInfo
}


// ------------- Adding to burn deck
const cardToBurnFromStack = (event) => {
    event = event.target
    let newBurnCard = copyCardInfo(tableStack, tableBurn)
    clearCardInfo(tableStack)
    return newBurnCard
}
const copyCardInfo = (htmlElement, receivingElement) => {
    let copiedInfo = htmlElement.innerHTML
    receivingElement.innerHTML = copiedInfo
    return receivingElement
}
const clearCardInfo = (card) => {
    let cardInfoReset = ``
    card.innerHTML = cardInfoReset
}


// ------------ event listeners
giveCard.addEventListener("click", giveUserCard)
updateStack.addEventListener('click', giveStackCard)
goToBurn.addEventListener('click', cardToBurnFromStack)
