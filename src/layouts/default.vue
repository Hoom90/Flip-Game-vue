<template>
  <div class="container">
    <div class="navigation">
      <button @click="$router.push('/')">بزن بریم</button>
      <button @click="$router.push('/help')">؟</button>
    </div>
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 90vh;
  max-width: 450px;
  margin: 0 auto;
  padding: 50px 0 0 0;
}

.navigation {
  display: flex;
  gap: 10px;
}

.navigation button {
  padding: 5px 20px;
  cursor: pointer;
}

.wrapper {
  padding: 20px 0 0 0;
}
</style>

