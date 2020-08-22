<template>
  <div id="app">
    <index v-if="showLevelDetail" />
    <browser v-else-if="isLoggedIn" />
    <login v-else />
  </div>
</template>

<script>
import index from "./components/index.vue";
import login from "./components/login.vue";
import browser from "./components/browser.vue";
import store from "./store.js";

export default({
  name: "App",
  store,
  data() {
    return {
      isLoggedIn: false,
      showLevelDetail: false,
    };
  },
  beforeMount() {
    //console.log(sessionStorage.getItem("isLoggedIn"));
    //console.log(sessionStorage.getItem("showLevelDetail"));
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      this.isLoggedIn = true;
    }
    if (sessionStorage.getItem("showLevelDetail") == "true") {
      this.showLevelDetail = true;
    }
  },
  components: {
    index,
    login,
    browser
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
