<template>
  <div class="container">
    <div class="navigation">
      <button class="gameIt" @click="$router.push('/')">بازی کارت های عکس</button>
      <button class="howTo" @click="$router.push('/help')">؟</button>
    </div>
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
@media screen {
  .container {
    height: 90vh;
    max-width: 450px;
    margin: 0 auto;
  }
}

/* @media screen (min-width > 600px && width < 1000px) {} */

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 20px 0;
}

.navigation button {
  padding: 0px 15px;
  cursor: pointer;
}

.wrapper {
  padding: 10px;
}

.gameIt {
  border-radius: 5px;
  border: none;
  background-color: #f24c4c;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 0px 10px #aaa;
  font-size: 20px;
}

.howTo {
  border-radius: 100%;
  border: 1px solid #f24c4c;
  background-color: #fff;
  /* background-color: #f24c4c; */
  color: #f24c4c;
  cursor: pointer;
  aspect-ratio: 1/1;
  box-shadow: 0px 0px 10px #aaa;
  font-size: 20px;
}
</style>

