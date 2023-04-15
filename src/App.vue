<template>
  <div class="wrapper__page">
    <main-page />
    <div class="adv"></div>
  </div>
  
</template>

<script>
import MainPage from '@/components/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  }
}
</script>

<style>
#app {
  padding: 0;
  margin: 0;
  /* background: rgb(217, 231, 246); */
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.wrapper__page{
    height: 100%;
    display: grid;
    grid-template: 100vh / 1fr 0px;
    justify-content: space-between;
  }
  .adv{
    background: rgb(29, 29, 29);
}
</style>
