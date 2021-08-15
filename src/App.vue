<template>
  <div id="app">
    <index v-if="showLevelDetail" />
    <stat v-else-if="stats" />
    <setting v-else-if="settings" />
    <achievement v-else-if="achievements" />
    
    <browser v-else-if="isLoggedIn" />
    <login v-else />
    
  </div>
</template>

<script>
import index from "./components/index.vue";
import login from "./components/login.vue";
import browser from "./components/browser.vue";
import setting from "./components/settings.vue";
import stat from "./components/stats.vue";
import achievement from "./components/achievements.vue";
import store from "./store.js";

export default({
  name: "App",
  store,
  data() {
    return {
      isLoggedIn: false,
      showLevelDetail: false,
      settings: false,
      stats: false,
      achievements: false,
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
    if (sessionStorage.getItem("settings") == "true") {
      this.settings = true;
    }
    if (sessionStorage.getItem("achievements") == "true") {
      this.achievements = true;
    }
    if (sessionStorage.getItem("stats") == "true") {
      this.stats = true;
    }
  },
  components: {
    index,
    login,
    browser,
    setting,
    achievement,
    stat,
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
