<template>
  <div id="app">
    <div class="title-top">
      <p class="title">Statistics</p>
      <div class="brief" style="paddingLeft: 5px">
        <p>
          This page present an overview of statistics
        </p>
        <p>
          If you don't know what this is, well, you cannot edit it anyway
        </p>
      </div>
    </div>
    <div style="marginTop: 100px" class="top">
      <el-tooltip effect="dark" content="Return to main menu" placement="top">
        <el-button @click="goBackToMainMenu">Main Menu</el-button>
      </el-tooltip>
    </div>
    <ul class="settings">
      <div v-for="(stat, index) in stats" :key="index">
        <chart
          class="charts"
          :title="'Level ' + index"
          :playerCount="stat.playerCount"
          :playTime="stat.playTime"
        ></chart>
      </div>
    </ul>
  </div>
</template>
<script>
import store from "../store.js";
import Chart from "./charts/histogram.vue";

export default {
  name: "stats",
  store,
  data() {
    return {
      stats: [],
      levels: [],
      playerCounts: [],
      chartOptions: {
        series: [
          {
            data: [],
          },
        ],
      },
    };
  },
  components: {
    chart: Chart,
  },
  beforeMount() {
    this.loadLevels();
  },
  methods: {
    mapCounts() {
      const playerCounts = [];
      this.stats.forEach((stat) => {
        playerCounts.push(stat.playerCount);
      });
      return JSON.parse(JSON.stringify(playerCounts));
    },
    loadLevels() {
      this.$store.store.dispatch("getLevels").then(() => {
        setTimeout(() => {
          this.levels = this.$store.store.state.levels;
        }, 2000);
      }).then(()=>{
        this.loadStats();
      });
    },
    loadStats() {
      let that = this;
      this.$store.store
            .dispatch("getStat")
            .then(() => {
              setTimeout(() => {
                that.stats = this.$store.store.state.stat;
                this.mapCounts();
                console.log(this.$store.store.state.stat)
                console.log(that.stats)
              }, 2000);
            });
    },

    getCnName(id) {
      return JSON.parse(this.levels[id].localization).cn;
    },
    goBackToMainMenu() {
      sessionStorage.setItem("stats", false);
      location.reload();
    },
  },
};
</script>
<style>
.title-top {
  display: flex;
  flex-wrap: wrap;
}

.settings {
  padding: 20px;
  margin-top: 30px;
  overflow: auto;
}

.card {
  width: 30%;
  height: 100%;
  margin-bottom: 15px;
}

.el-select .el-input {
  width: 130px;
}

.el-card:hover {
  opacity: 0.5;
}

.bottom {
  z-index: 997;
}

.title {
  font-size: 35px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  line-height: 2.25;
  text-align: left;
  margin: 10px;
}
.charts {
  padding: 15px;
  overflow: auto;
}
.settings {
  padding: 20px;
  margin-top: 5%;
}
</style>
