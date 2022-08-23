<template>
  <div id="app">
    <div class="title-top">
      <p class="title">Achievement Settings</p>
      <div class="brief">
        <p>This page allows you to modify or add achievements</p>
        <p>
          If you don't know what this is, please don't edit it, and don't
          <b style="color: red">delete them</b>
        </p>
      </div>
    </div>

    <div class="bottom">
      <el-tooltip effect="dark" content="Add new item" placement="top">
        <el-button @click="addAchievement">Add Achievement</el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Return to main menu" placement="top">
        <el-button @click="goBackToMainMenu">Main Menu</el-button>
      </el-tooltip>
    </div>
    <ul class="achievements">
      <div v-for="(achievement, index) in achievements" :key="index">
        <el-card
          class="card"
          shadow="always"
          @click.native="editAchievement(index)"
        >
          {{ achievement.name }}
        </el-card>
      </div>
    </ul>

    <el-drawer title="Edit Achievement" :visible.sync="isEditAchievement">
      <el-form style="padding: 15px">
        <el-form-item :label="activeAchievement.name">
          <el-input
            type="text"
            placeholder="clip name..."
            v-model="activeAchievement.name"
          />
          <label>
            {{ compose(activeAchievement.condition) }}
          </label>
          <div class="variables">
            <div
              class="variable-box"
              v-for="(block, index) in activeAchievement.condition"
              :key="index"
            >
              <el-input
                class="variable-input"
                v-if="!isNaN(Number(block.value))"
                v-model="block.value"
                idx="index"
              />
              <el-select
                v-else
                v-model="block.value"
                placeholder="Select a variable"
              >
                <el-option
                  v-for="item in options"
                  :key="item.name"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="activeAchievement.condition.splice(index, 1)"
              ></el-button>
            </div>
          </div>
          <el-button
            @click="
              activeAchievement.condition.push({
                value: '0',
              })
            "
            >Add Argument</el-button
          >
          <el-input
            style="margin-top: 10px"
            placeholder="iOS achievement id"
            type="text"
            v-model="activeAchievement.serials.ios"
          >
           <template slot="prepend">iOS</template>
          </el-input>
          <el-input
            style="margin-top: 10px"
            placeholder="Android achievement id"
            type="text"
            v-model="activeAchievement.serials.android"
          >
          <template slot="prepend">Android</template>
          </el-input>
          <el-input
            style="margin-top: 10px"
            placeholder="Steam achievement id"
            type="text"
            v-model="activeAchievement.serials.steam"
          >
          <template slot="prepend">Steam</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-tooltip effect="dark" content="Delete achievement" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteAchievement"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="Save achievement" placement="top">
            <el-button
              type="info"
              icon="el-icon-check"
              circle
              @click="composeAchievement"
            ></el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import store from "../store.js";
import { Loading } from "element-ui";
export default {
  name: "index",
  store,
  data() {
    return {
      achievements: [],
      options: [
        {
          name: "Total Times Played",
          value: "totalTimesPlayed",
        },
        {
          name: "Score",
          value: "score",
        },
        {
          name: "Level ID",
          value: "levelId",
        },
        {
          name: "High Score Time",
          value: "supers",
        },
        {
          name: "Medium Score Time",
          value: "middles",
        },
        {
          name: "Low Score Time",
          value: "fails",
        },
        {
          name: ">",
          value: ">",
        },
        {
          name: "<",
          value: "<",
        },
        {
          name: "=",
          value: "=",
        },
        {
          name: "and",
          value: "&",
        },
        {
          name: "Number",
          value: 0,
        },
      ],
      activeAchievement: {
        name: "default",
        condition: [],
        serials: {
          ios: "",
          android: "",
          steam: "",
        },
      },
      activeIndex: 0,
      isEditAchievement: false,
      warningDialogFormVisible: false,
    };
  },
  components: {},
  beforeMount() {
    this.loadAchievement();
  },
  methods: {
    editAchievement(index) {
      this.isEditAchievement = true;
      this.activeAchievement = this.achievements[index];
      this.activeIndex = index;
    },
    loadAchievement() {
      this.$store.store.dispatch("getAchievements").then(() => {
        setTimeout(() => {
          this.achievements = this.$store.store.state.achievements;
        }, 200);
      });
    },
    compose(arr){
      var str = "";
      for(let i = 0; i < arr.length; i++){
        str += arr[i].value + " ";
      }
      return str.trim();
    },
    addAchievement() {
      this.achievements.push({
        name: "default",
        condition: [],
        serials: {
          ios: "",
          android: "",
          steam: "",
        },
      });
    },
    deleteAchievement() {
      this.$store.store
        .dispatch("deleteAchievement", this.activeAchievement.id)
        .then(() => {
          setTimeout(() => {
            console.log("deletion success");
            location.reload();
          }, 200);
        });
    },
    composeAchievement() {
      let loadingInstance = Loading.service({
        lock: true,
        text: "Uploading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.activeAchievement.condition = this.compose(this.activeAchievement.condition)

      this.$store.store
        .dispatch("uploadAchievement", this.activeAchievement)
        .then(() => {
          loadingInstance.close();
          this.isEditAchievement = false;
          const h = this.$createElement;
          this.$notify({
            title: "上传结果",
            message: h(
              "i",
              { style: "color: teal" },
              "Upload success! Please refresh the page to see the saved changes"
            ),
          });
          //location.reload();
        });
    },
    goBackToMainMenu() {
      sessionStorage.setItem("achievements", false);
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

.achievements {
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
  position: absolute;
  bottom: 0;
  margin-left: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: nowrap;
}

.title {
  font-size: 35px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  line-height: 2.25;
  text-align: left;
}

.variable-box {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.variables {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>