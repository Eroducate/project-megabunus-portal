<template>
  <div id="app">
    <p class="title top" @dblclick="editLevel">{{ level.localization.cn }}</p>
    <div class="bottom">
      <el-tooltip effect="dark" content="Save changes" placement="top">
        <el-button @click="composeLevel">SAVE</el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Add new clips" placement="top">
        <el-button @click="addClip">Add Clip</el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="Return to main menu" placement="top">
        <el-button @click="goBackToMainMenu">Main Menu</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Delete the existing level"
        placement="top"
      >
        <el-button @click="triggerDeleteWarning">Delete Level</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="For advanced/development usages"
        placement="top"
      >
        <el-button @click="showImportJson">Import Json</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="For advanced/development usages"
        placement="top"
      >
        <el-button @click="exportJson">Export Json</el-button>
      </el-tooltip>
    </div>
    <el-drawer title="EDIT LEVEL" :visible.sync="isEditLevel">
      <el-form style="padding: 15px">
        <el-form-item label="Level Name">
          <el-input
            style="margin-bottom: 10px"
            type="text"
            placeholder="level chinese name..."
            v-model="level.localization.cn"
          />
        </el-form-item>
        <el-form-item lavel="Level Texts">
          <el-input
            style="margin-bottom: 10px"
            type="text"
            placeholder="level english name..."
            v-model="level.localization.en"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            style="margin-bottom: 10px"
            type="text"
            placeholder="Super Text..."
            v-model="level.SuperText"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            style="margin-bottom: 10px"
            type="text"
            placeholder="OK Text..."
            v-model="level.OKText"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            style="margin-bottom: 10px"
            type="text"
            placeholder="Failed Text..."
            v-model="level.FailedText"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer title="EDIT CLIP" :visible.sync="isEditClip">
      <el-form style="padding: 15px">
        <el-collapse accordion>
          <el-collapse-item title="Clip Settings">
            <el-form-item label="CLIP NAME">
              <el-input
                style="margin-bottom: 10px"
                type="text"
                placeholder="clip name..."
                v-model="level.clips[currentClipIndex].name"
              />
            </el-form-item>
            <el-form-item>
              <el-select
                style="width: 100%"
                v-model="level.clips[currentClipIndex].importance"
                placeholder="clip重要度"
                filterable
              >
                <el-option
                  v-for="(importance, index) in importances"
                  :key="index"
                  :label="importance"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-switch
                active-text="是结局"
                inactive-text="不是结局"
                v-model="level.clips[currentClipIndex].isEnding"
                style="width: 100%"
              />
              <el-tooltip effect="dark" content="Delete clip" placement="top">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteClip"
                ></el-button>
              </el-tooltip>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Play List">
            <el-form-item>
              <el-input
                style="margin-bottom: 10px"
                v-for="(url, index) in level.clips[currentClipIndex].playList"
                :key="index"
                type="text"
                placeholder="video url..."
                v-model="level.clips[currentClipIndex].playList[index]"
              />
              <el-tooltip effect="dark" content="Add new url" placement="top">
                <el-button
                  type="info"
                  icon="el-icon-plus"
                  circle
                  @click="addUrl"
                ></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="Delete url" placement="top">
                <el-button
                  type="danger"
                  icon="el-icon-minus"
                  circle
                  @click="deleteUrl"
                ></el-button>
              </el-tooltip>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Choice Settings">
            <el-form-item
              :inline="true"
              label="CHOICES"
              v-if="!level.clips[currentClipIndex].isEnding"
            >
              <div
                style="margin-bottom: 10px; margin-top: 10px"
                v-for="(choice, index) in level.clips[currentClipIndex].choices"
                :key="index"
              >
                <el-input
                  placeholder="中文选项名..."
                  v-model="choice.localization.cn"
                  type="text"
                >
                  <el-select
                    v-model="choice.nextClipNum"
                    placeholder="请选择后续clip"
                    filterable
                    slot="prepend"
                  >
                    <el-option
                      v-for="(clip, index) in level.clips"
                      :key="index"
                      :label="clip.name"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-input>
                <el-input
                  style="margin-top: 10px"
                  placeholder="English choice text..."
                  v-model="choice.localization.en"
                  type="text"
                />
                <el-switch
                  v-model="
                    level.clips[currentClipIndex].choices[index].correctness
                  "
                  active-text="正确"
                  inactive-text="错误"
                  style="width: 100%"
                />
              </div>
              <el-form-item>
                <el-tooltip
                  effect="dark"
                  content="Add new choice"
                  placement="top"
                >
                  <el-button
                    type="success"
                    icon="el-icon-plus"
                    circle
                    @click="addChoice"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  content="Delete choice"
                  placement="top"
                >
                  <el-button
                    type="info"
                    icon="el-icon-minus"
                    circle
                    @click="minusChoice"
                  ></el-button>
                </el-tooltip>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="Collectible Settings">
            <el-form-item :inline="true" label="COLLECTIBLE">
              <div
                style="margin-bottom: 10px; margin-top: 10px"
                v-for="(collectible, index) in level.clips[currentClipIndex]
                  .collectibles"
                :key="index"
              >
                <el-input
                  placeholder="Name"
                  v-model="collectible.name"
                  type="text"
                >
                </el-input>
                <el-input
                  placeholder="中文收藏品名..."
                  v-model="collectible.localization.cn"
                  type="text"
                >
                </el-input>
                <el-input
                  style="margin-top: 10px"
                  placeholder="English collectible text..."
                  v-model="collectible.localization.en"
                  type="text"
                />
                <!-- put picture upload here -->
              </div>
              <el-form-item>
                <el-tooltip
                  effect="dark"
                  content="Add new collectible"
                  placement="top"
                >
                  <el-button
                    type="success"
                    icon="el-icon-plus"
                    circle
                    @click="addCollectible"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  content="Delete choice"
                  placement="top"
                >
                  <el-button
                    type="info"
                    icon="el-icon-minus"
                    circle
                    @click="minusCollectible"
                  ></el-button>
                </el-tooltip>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-drawer>
    <el-dialog title="Warning" :visible.sync="warningDialogFormVisible">
      <span>Are you sure that you want to delete the level?</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="warningDialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteLevel">Confirm</el-button>
      </div>
    </el-dialog>
    <el-dialog title="ImportJson" :visible.sync="showImportJsonDialog">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="paste json here"
        v-model="rawJson"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showImportJsonDialog = false">Cancel</el-button>
        <el-button type="primary" @click="importJson">Confirm</el-button>
      </div>
    </el-dialog>
    <network
      class="network"
      ref="network"
      :nodes="nodes"
      :edges="edges"
      :options="options"
      @double-click="editClip"
    ></network>
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
      level: this.$store.store.state.level,
      currentClipIndex: 0,
      isEditClip: false,
      isEditLevel: false,
      nodes: [],
      edges: [],
      options: {
        nodes: {
          shape: "box",
          color: "#7ca4ca",
        },
        edges: {
          arrows: "to",
          smooth: {
            enabled: true,
            type: "cubicBezier",
            roundness: 0.5,
            forceDirection: "vertical",
          },
        },
        layout: {
          improvedLayout: true,
          hierarchical: {
            enabled: true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: "UD", // UD, DU, LR, RL
            sortMethod: "directed", // hubsize, directed
          },
        },
        interaction: {
          hover: true,
        },
      },
      rawJson: "",
      warningDialogFormVisible: false,
      showImportJsonDialog: false,
      importances: ["Important", "OK", "Not Important"],
    };
  },
  components: {
    network: require("vue-vis-network").Network,
  },
  beforeMount() {
    this.loadLevel();
  },
  beforeUpdate() {
    this.renderMindMap();
  },
  methods: {
    loadLevel() {
      this.$store.store
        .dispatch("getLevel", sessionStorage.getItem("levelId"))
        .then(() => {
          setTimeout(() => {
            this.renderMindMap();
          }, 200);
        });
    },
    renderMindMap() {
      var level = this.level;
      var nodeArr = [];
      var edgeArr = [];
      for (let i = 0; i < level.clips.length; i++) {
        var label = "";
        if (!level.clips[i].isEnding) {
          label = level.clips[i].name;
          let choices = level.clips[i].choices;
          for (let j = 0; j < choices.length; j++) {
            edgeArr.push({
              from: i,
              to: choices[j].nextClipNum,
            });
          }
        } else {
          label = level.clips[i].name + " ENDING";
        }
        nodeArr.push({
          id: i,
          label: label,
        });
      }
      this.nodes = nodeArr;
      this.edges = edgeArr;
    },
    editLevel() {
      this.isEditLevel = true;
    },
    addClip() {
      var name = "Clip" + (this.level.clips.length + 1).toString();
      var keyName = "CLIP" + this.level.clips.length.toString() + "_CHOICE0";
      this.level.clips.push({
        name: name,
        playList: [],
        isEnding: false,
        importance: 1,
        choices: [
          {
            keyName: keyName,
            correctness: true,
            nextClipNum: 0,
            localization: {
              cn: "",
              en: "",
            },
          },
        ],
        collectibles: [
        ],
      });
    },
    editClip(e) {
      if (e.nodes.length > 0) {
        this.isEditClip = true;
        this.currentClipIndex = e.nodes[0];
      }
      return;
    },
    triggerDeleteWarning() {
      this.warningDialogFormVisible = true;
    },
    deleteClip() {
      this.isEditClip = false;
      var index = this.currentClipIndex;
      this.currentClipIndex = 0;
      this.level.clips.splice(index, 1);
    },
    addChoice() {
      var clip = this.level.clips[this.currentClipIndex];
      var keyName =
        "CLIP" +
        this.currentClipIndex.toString() +
        "_CHOICE" +
        clip.choices.length.toString();
      if (clip.choices.length <= 2) {
        clip.choices.push({
          keyName: keyName,
          nextClipNum: 0,
          correctness: true,
          localization: {
            cn: "",
            en: "",
          },
          choosed_count: 0,
        });
      } else {
        alert("Exceeds maximum clips");
      }
    },
    minusChoice() {
      var clip = this.level.clips[this.currentClipIndex];
      clip.choices.pop();
    },
    addCollectible() {
      var clip = this.level.clips[this.currentClipIndex];
      if(clip.collectibles.length <= 2){
        clip.collectibles.push({
                name: "",
                localization: {
                  cn: "",
                  en: "",
                },
                src: "",
              });
      }
    },
    minusCollectible() {
      var clip = this.level.clips[this.currentClipIndex];
      clip.collectibles.pop();
    },
    addUrl() {
      var clip = this.level.clips[this.currentClipIndex];
      for (let url of clip.playList) {
        if (url == "") {
          alert("Please fill in the existing blank url first!");
          return;
        }
      }
      clip.playList.push("");
    },
    deleteUrl() {
      var clip = this.level.clips[this.currentClipIndex];
      if (clip.playList.length >= 1) {
        clip.playList.pop();
      }
    },
    composeLevel() {
      let loadingInstance = Loading.service({
        lock: true,
        text: "Uploading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$store.store.dispatch("updateLevel", this.level).then(() => {
        this.$store.store.dispatch("upload").then(() => {
          loadingInstance.close();
          const h = this.$createElement;
          this.$notify({
            title: "上传结果",
            message: h(
              "i",
              { style: "color: teal" },
              "Upload success! Please refresh the page to see the saved changes"
            ),
          });
          location.reload();
        });
      });
    },
    deleteLevel() {
      this.$store.store
        .dispatch("deleteLevel", sessionStorage.getItem("levelId"))
        .then(() => {
          setTimeout(() => {
            console.log("deletion success");
            sessionStorage.setItem("showLevelDetail", false);
            location.reload();
          }, 200);
        });
    },
    goBackToMainMenu() {
      sessionStorage.setItem("showLevelDetail", false);
      location.reload();
    },
    showImportJson() {
      this.showImportJsonDialog = true;
    },
    importJson() {
      this.level = JSON.parse(this.rawJson);
      this.showImportJsonDialog = false;
    },
    exportJson() {
      console.log(JSON.stringify(this.level));
      const h = this.$createElement;
      this.$notify({
        title: "Exort Success",
        message: h(
          "i",
          { style: "color: teal" },
          "Json has been printed in the dev console"
        ),
      });
    },
  },
};
</script>
<style>
.network {
  position: absolute;
  width: 100%;
  height: 100%;
}

.el-select .el-input {
  width: 130px;
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

.top {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 996;
  padding-left: 20px;
  padding-right: 20px;
}

.title {
  font-size: 35px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  line-height: 2.25;
}
</style>