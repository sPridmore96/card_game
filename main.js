//----------- imported obj
import fullDeckObj from "./cards.js"


//------------ global Vars
let shuffledDeck = [];
let userCardValue = 0;
let stackCardValue = 0;

// ---------- DOM selectors
const usersHandHTML = document.querySelector(".user__hand");
const tableDeck = document.querySelector(".table__deck");
const tableStack = document.querySelector(".table__stack")
const tableBurn = document.querySelector('.table__burn')
const giveCard = document.querySelector("#give-card");
const snap = document.querySelector('#snap-button')
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
    console.log(decisionMessage); ;
}

const useSnapButton = (event) => {
    let userCard = userCardValue
    let stackCard = stackCardValue
    compareCardSnap(userCard, stackCard)


}
// --------------- moving cards to be used
const giveStackCard = () => {
    // event = event.target.value;
    let removedCard = removeFromDeck(shuffledDeck)
    stackCardValue = collectCardValues(removedCard)
    let cardGiven = createCardInfo(removedCard)
    return makeCard(cardGiven, tableStack), stackCardValue;
}
const giveUserCard = (event) => {
    let userCard = ''
    event = event.target;
    let removedCard = removeFromDeck(shuffledDeck)
    console.log(removedCard);
    userCardValue = collectCardValues(removedCard)
    let cardGiven = createCardInfo(removedCard)
    console.log(cardGiven);
    userCard = makeCard(cardGiven, usersHandHTML);
    giveStackCard()

    return userCard, userCardValue
}
console.log(userCardValue);

const removeFromDeck = (deck) => {
    console.log(shuffledDeck);
    return deck.pop()

}
const collectCardValues = (card) => {
    let NumberValueForCard = card.value
    return NumberValueForCard
}
const createCardInfo = (givenObj) => {
    let cardInfo =
        ` <section class="card card--${givenObj.suite}" name="${givenObj.name}" value = ${givenObj.value}>
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
    const cardInfoReset = ``
    card.innerHTML = cardInfoReset
}


// ------------ event listeners
giveCard.addEventListener("click", giveUserCard)
updateStack.addEventListener('click', giveStackCard)
goToBurn.addEventListener('click', cardToBurnFromStack)
snap.addEventListener('click', useSnapButton)