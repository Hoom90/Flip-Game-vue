<script setup>
import image1 from "@/assets/images/product-1.jpg"
import image2 from "@/assets/images/product-2.jpg"
import image3 from "@/assets/images/product-3.jpg"
import image4 from "@/assets/images/product-4.jpg"
import image5 from "@/assets/images/product-5.jpg"
import image6 from "@/assets/images/product-6.jpg"
import image7 from "@/assets/images/product-7.jpg"
import image8 from "@/assets/images/product-8.jpg"
const cardContainer = ref()
const defTimer = 300
const defMoverCounter = 40
const state = reactive({
    cards: [
        image1,
        image1,
        image2,
        image2,
        image3,
        image3,
        image4,
        image4,
        image5,
        image5,
        image6,
        image6,
        image7,
        image7,
        image8,
        image8,
    ],
    cardTest: [],
    shuffledCards: null,
    isfirstClick: true,
    timerID: null,
    isRestart: false,
    match: 0,
    timer: defTimer,
    movesCounter: defMoverCounter,
})
onMounted(() => {
    shuffle()
    timer()
})

const shuffle = () => {
    let cards = state.cards
    let currentIndex = cards.length
    let temporaryValue
    let randomIndex

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    state.shuffledCards = cards;
}

const handleFlip = (card, index) => {
    // if (state.shuffledCards.find(x => x != card) ? true : false) return;
    const cardsHtml = cardContainer.value
    if (cardsHtml.children[index].classList.contains("card-rotate")) return;
    if (state.isfirstClick) {
        state.timerID = setInterval(timer, 1000);
        state.isfirstClick = false;
    }
    rotateCard(cardsHtml.children[index]);
    setTimeout(addCard, 550, state.shuffledCards[index], cardsHtml.children[index], index)
}

const rotateCard = (card) => {
    card.classList.add('card-rotate');
}

const addCard = (card, cardHTML, pos) => {
    if (state.isRestart) {
        state.cardTest.length = 0;
        state.isRestart = false;
    }
    state.cardTest.push(card);
    state.cardTest.push(cardHTML)
    state.cardTest.push(pos);
    if (state.cardTest.length === 6) {
        updateMoveCounter();
        testCards(state.cardTest[0], state.cardTest[1], state.cardTest[2], state.cardTest[3], state.cardTest[4], state.cardTest[5]);
        state.cardTest.length = 0;
    }
}

const testCards = (card1, html1, x1, card2, html2, x2) => {
    if (card1 === card2 && x1 != x2) cardsMatch();
    else cardsDontMatch();
}

const cardsMatch = () => {
    state.match++;
    if (state.match === 8) {
        console.log('victory');
        clearInterval(state.timerID);
    }
}

const cardsDontMatch = () => {
    setTimeout(function () {
        card1.classList.toggle('card-rotate');
        card2.classList.toggle('card-rotate');
    }, 300);
}

// const win = () => {
//     clearInterval(state.timerID);
//     const stats = document.querySelector(".stats");
//     if (s % 60 < 10) {
//         stats.textContent = "You won with: " + stars + " stars in " + movesCounter + " moves with time: " + m + ":0" + s % 60;
//     } else {
//         stats.textContent = "You won with: " + stars + " stars in " + movesCounter + " moves with time: " + m + ":" + s % 60;
//     }
// }

const updateMoveCounter = () => {
    state.movesCounter--;
}

let s = defTimer;
let m = 0;
const timer = () => {
    m = Math.floor(s / 60);
    if (s % 60 < 10) {
        state.timer = m + ":0" + s % 60;
    } else {
        state.timer = m + ":" + s % 60;
    }
    --s;
    if (s < 0) {
        console.log('time out');
        clearInterval(state.timerID);
    }
}

// const restartGame = () => {
//     clearInterval(timerID);
//     movesCounter = 0;
//     match = 0;
//     s = 0;
//     m = 0;
//     isfirstClick = true;
//     isRestart = true;
//     const deck = document.querySelector('.deck');
//     var elements = deck.getElementsByClassName("card");

//     while (elements[0]) {
//         elements[0].parentNode.removeChild(elements[0]);
//     }
//     shuffledCards = shuffle(cards);
//     let timer = document.querySelector(".timer");
//     state.timer = defTimer
//     state.movesCounter = defMoverCounter
// }

</script>
<template>
    <div class="header">
        <p>زمان: <span>{{ state.timer }}</span></p>
        <p>تعداد حرکت : <span>{{ state.movesCounter }}</span></p>
    </div>
    <div v-if="state.shuffledCards" class="card-container" ref="cardContainer">
        <div class="card" v-for="(card, index) in state.shuffledCards" :key="index + 1" @click="handleFlip(card, index)">
            <div class="front">
                <div>
                    <p>{{ index + 1 }}</p>
                </div>
            </div>
            <div class="back">
                <img :src="card">
            </div>
        </div>
    </div>
    <div class="footer">
        <button>شروع دوباره</button>
    </div>
</template>
<style scoped>
button {
    border-radius: 5px;
    border: none;
    background-color: #F2C94C;
    padding: 5px;
    cursor: pointer;
    width: 200px;
    box-shadow: 0px 0px 10px #aaa;
    font-weight: bold;
    font-size: 25px;
}

button:focus {
    box-shadow: none;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 25px;
    padding: 10px;
}

.footer {
    display: flex;
    justify-content: end;
    align-items: center;
    font-weight: 800;
    font-size: 20px;
    margin-top: 10px;
}

.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    color: white;
}

.card {
    position: relative;
    width: 100px;
    height: 100px;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    cursor: pointer;
}

.card-rotate {
    transform: rotateY(180deg);
}

.card img {
    width: 100px;
    border-radius: 5px;
    border: 2px solid #d44057;
}

.front {
    border-radius: 5px;
    background-color: #d44057;
    box-shadow: inset 0px 1px 5px 0px #3c3b3b;
}

.back {
    transform: rotateY(180deg);
}

.front,
.back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.front div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>