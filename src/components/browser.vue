<template>
  <div id="app">
    <div class="container">
      <h1>Welcome to the Self-Reliance Portal!</h1>
      <div class="levelsHolder">
        <div
          class="levelHolder"
          v-for="(level,index) in levels"
          :key="index"
          @click="navigateToLevel(level.id)"
          :data-id="level.id"
        >
          <div class="text">{{JSON.parse(level.name).cn}}</div>
        </div>
        <el-button type="info" icon="el-icon-plus" circle @click="dialogFormVisible = true"></el-button>
      </div>
    </div>
    <el-dialog title="Create Level" :visible.sync="dialogFormVisible">
      <el-input placeholder="Level Name" v-model="newLevelName" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createLevel">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import store from "../store.js";
export default {
  name: "browser",
  store,
  data() {
    return {
      levels: [],
      dialogFormVisible: false,
      newLevelName: "",
    };
  },
  components: {},
  beforeMount() {
    this.$store.store.dispatch("getLevels").then(() => {
      setTimeout(() => {
        this.levels = this.$store.store.state.levels;
        //console.log(this.levels);
      }, 200);
    });
  },
  methods: {
    navigateToLevel(id) {
      sessionStorage.setItem("levelId", id);
      sessionStorage.setItem("showLevelDetail", true);
      location.reload();
    },
    createLevel() {
      if (this.newLevelName != "") {
        this.$store.store
          .dispatch("createLevel", this.newLevelName)
          .then(() => {
            setTimeout(() => {
              this.dialogFormVisible = false;
              this.newLevelName = "";
              location.reload();
            }, 200);
          });
      } else {
        this.$notify.error({
          title: "Error",
          message: "Empty Level Name",
        });
      }
    },
  },
};
</script>
<style>
.input {
  margin-top: 10px;
  margin-bottom: 10px;
}

.text {
  width: 100%;
}

.levelsHolder {
  display: flex;
  height: 100%;
  width: 100%;
  justify-items: center;
  align-items: center;
}

.levelHolder {
  margin-right: 20px;
  width: 20%;
  height: 20vw;
  display: flex;
  position: relative;
  justify-items: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  background-color: #7ca4ca;
  border-radius: 10px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);
}

.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  padding: 200px;
}

.title {
  font-size: 35px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  line-height: 2.25;
}
</style>