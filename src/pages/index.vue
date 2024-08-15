<script setup>
import image1 from "@/assets/images/product-1.jpg"
import image2 from "@/assets/images/product-2.jpg"
import image3 from "@/assets/images/product-3.jpg"
import image4 from "@/assets/images/product-4.jpg"
import image5 from "@/assets/images/product-5.jpg"
import image6 from "@/assets/images/product-6.jpg"
import image7 from "@/assets/images/product-7.jpg"
import image8 from "@/assets/images/product-8.jpg"
const cards = [
    image4,
    image1,
    image2,
    image2,
    image3,
    image6,
    image4,
    image5,
    image3,
    image6,
    image5,
    image7,
    image7,
    image1,
    image8,
    image8,
]
const counter = ref(40)
const timer = ref(120)
const cardContainer = ref()
let cardOpen = []

const handleFlip = (id) => {
    const cards = cardContainer.value
    if (cards.children[id].className.includes('card-rotate')) {
        cards.children[id].classList.remove('card-rotate')
    }
    else {
        cardClickCounter(id)
        cards.children[id].classList.add('card-rotate')
    }
}

const cardClickCounter = (id) => {
    console.log(cardOpen);
    if (cardOpen.length != 1) {
        counter.value--
        cardOpen.push(id)
    } else {
        // const cards = cardContainer.value
        // cardOpen.forEach(item => {
        //     cards.children[item].classList.remove('card-rotate')
        // });
        // cardOpen = []
    }
}

</script>
<template>
    <div class="header">
        <p>زمان: <span>{{ timer }}</span></p>
        <p>تعداد حرکت : <span>{{ counter }}</span></p>
    </div>
    <div class="card-container" ref="cardContainer">
        <div class="card" v-for="(card, index) in cards" :key="index + 1" @click="handleFlip(index)"
            :id="`card${index + 1}`">
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
</template>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    font-size: 20px;
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