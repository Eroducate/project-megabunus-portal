<template>
  <div id="app">
    <div class="title-top">
      <p class="title">In-Game Misc Settings</p>
      <div class="brief">
        <p>
          This page allows you to modify or add items for localization use in
          game
        </p>
        <p>
          If you don't know what this is, please don't edit it, and don't
          <b style="color: red">delete them</b>
        </p>
      </div>
    </div>

    <div class="bottom">
      <el-tooltip effect="dark" content="Add new item" placement="top">
        <el-button @click="addSetting">Add Setting</el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Return to main menu" placement="top">
        <el-button @click="goBackToMainMenu">Main Menu</el-button>
      </el-tooltip>
    </div>
    <ul class="settings">
      <div v-for="(setting, index) in settings" :key="index">
        <el-card
          class="card"
          shadow="always"
          @click.native="editSetting(index)"
        >
          {{ setting.name }}
        </el-card>
      </div>
    </ul>

    <el-drawer
      title="Edit Setting"
      :visible.sync="isEditSetting"
    >
      <el-form style="padding: 15px">
        <el-form-item :label="activeSetting.name">
          <el-input
            type="text"
            placeholder="clip name..."
            v-model="activeSetting.name"
          />
          <el-input
            style="margin-top: 10px"
            placeholder="中文选项名..."
            type="text"
            v-model="activeSetting.localization.cn"
          >
          </el-input>
          <el-input
            style="margin-top: 10px"
            placeholder="English choice text..."
            type="text"
            v-model="activeSetting.localization.en"
          />
        </el-form-item>
        <el-form-item>
          <el-tooltip effect="dark" content="Delete setting" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteSetting"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="Save setting" placement="top">
            <el-button
              type="info"
              icon="el-icon-check"
              circle
              @click="composeSetting"
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
      settings: [],
      activeSetting: {
        name: "default",
        localization: {
          cn: "chinese",
          en: "english",
        },
      },
      activeIndex: 0,
      isEditSetting: false,
      warningDialogFormVisible: false,
    };
  },
  components: {},
  beforeMount() {
    this.loadSettings();
  },
  methods: {
    editSetting(index) {
      this.isEditSetting = true;
      this.activeSetting = this.settings[index];
      this.activeIndex = index;
    },
    loadSettings() {
      this.$store.store.dispatch("getSettings").then(() => {
        setTimeout(() => {
          this.settings = this.$store.store.state.settings;
        }, 200);
      });
    },
    addSetting() {
      this.settings.push({
        id: "",
        name: "SETTING_NAME",
        localization: {
          cn: "Chinese",
          en: "English",
        },
      });
    },
    deleteSetting() {
      this.$store.store
        .dispatch("deleteSetting", this.activeSetting.id)
        .then(() => {
          setTimeout(() => {
            console.log("deletion success");
            location.reload();
          }, 200);
        });
    },
    composeSetting() {
      let loadingInstance = Loading.service({
        lock: true,
        text: "Uploading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.$store.store
        .dispatch("uploadSetting", this.activeSetting)
        .then(() => {
          loadingInstance.close();
          this.isEditSetting = false;
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
      sessionStorage.setItem("settings", false);
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
</style>