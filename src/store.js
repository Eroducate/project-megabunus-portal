import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const url = 'http://127.0.0.1:5000'
const store = new Vuex.Store({
  state: {
    level: {
      localization:{
        cn:"",
        en:""
      },
      clips: [{
        playList: ["https://a.com/a.mp4", "https://a.com/b.mp4"],
        isEnding: false,
        choices: [{
          keyName: "1第一选项",
          nextClipNum: 1,
          correctness: true,
          choosed_count: 0,
        },
        {
          keyName: "1第二选项",
          nextClipNum: 2,
          correctness: false,
          choosed_count: 0,
        },
        {
          keyName: "1第三选项",
          nextClipNum: 3,
          correctness: false,
          choosed_count: 0,
        }
        ],
        collectibles: [],
      },
      ]
    },
    levels: [],
    settings: [],
  },
  actions: {
    register(context, args) {
      this.commit("REGISTER", args)
    },
    login(context, args) {
      this.commit("LOGIN", args)
    },
    addClip() {
      this.commit("ADD_CLIP")
    },
    getLevel(context, args) {
      this.commit("GET_LEVEL", args)
    },
    getLevels() {
      this.commit("GET_LEVELS")
    },
    createLevel(context, args) {
      this.commit("CREATE_LEVEL", args)
    },
    deleteLevel(context, args) {
      this.commit("DELETE_LEVEL", args)
    },
    updateLevel(context, args) {
      this.commit("UPDATE_LEVEL", args)
    },
    getSettings() {
      this.commit("GET_SETTINGS")
    },
    deleteSetting(context, args){
      this.commit("DELETE_SETTING", args)
    },
    uploadSetting({
      commit
    }, args) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("UPLOAD_SETTING", args)
          resolve()
        }, 1000)
      })
    },
    upload({
      commit
    }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("UPLOAD")
          resolve()
        }, 1000)
      })
    }
  },
  mutations: {
    ADD_CLIP(state) {
      state.level.clips.push({
        playList: [],
        isEnding: false,
        choices: [{
          keyName: "",
          correctness: true,
          nextClipNum: 0,
          choosed_count: 0,
        }],
        collectibles: [],
      })
    },
    REGISTER(state, args) {
      axios.post(url + '/register', args).then((res) => {
        console.log(res.data)
        if (res.data == "User Created") {
          sessionStorage.setItem("isLoggedIn", true);
        }
      })
    },
    LOGIN(state, args) {
      axios.post(url + '/login', args).then((res) => {
        console.log(res.data)
        if (res.data == "True") {
          sessionStorage.setItem("isLoggedIn", true);
        }
      })
    },
    GET_LEVEL(state, args) {
      console.log('getting level')
      axios.get(url + '/level?id=' + args).then((res) => {
        console.log("got level!")
        console.log(res.data)
        state.level.id = JSON.parse(res.data.id)
        state.level.localization = JSON.parse(res.data.name)
        state.level.clips = JSON.parse(res.data.level)
      })
    },
    GET_LEVELS(state) {
      console.log('getting levels')
      axios.get(url + '/levels').then((res) => {
        console.log("got levels")
        state.levels = res.data
      })
    },
    CREATE_LEVEL(state, args) {
      var defautLevel = {
        played_count: 0,
        localization: {
          cn: "",
          en: ""
        },
        clips: [{
          name: "Clip1",
          playList: [],
          isEnding: false,
          importance: 1,
          choices: [{
            keyName: "CLIP1_CHOICE0",
            nextClipNum: 1,
            correctness: true,
            localization: {
              cn: "",
              en: ""
            },
            choosed_count: 0,
          },
          {
            keyName: "CLIP1_CHOICE1",
            nextClipNum: 2,
            correctness: false,
            localization: {
              cn: "",
              en: ""
            },
            choosed_count: 0,
          },
          {
            keyName: "CLIP1_CHOICE2",
            nextClipNum: 3,
            correctness: false,
            localization: {
              cn: "",
              en: ""
            },
            choosed_count: 0,
          }
          ],
          collectibles: [],
        },
        {
          name: "Clip2",
          playList: [],
          isEnding: false,
          importance: 1,
          choices: [{
            keyName: "CLIP2_CHOICE0",
            nextClipNum: 3,
            correctness: true,
            localization: {
              cn: "",
              en: ""
            },
            choosed_count: 0,
          },
          {
            keyName: "CLIP2_CHOICE1",
            nextClipNum: 3,
            correctness: false,
            localization: {
              cn: "",
              en: ""
            },
            choosed_count: 0,
          }
          ],
          collectibles: [],
        },
        {
          name: "Clip3",
          playList: [],
          isEnding: false,
          importance: 1,
          choices: [{
            keyName: "CLIP3_CHOICE0",
            nextClipNum: 3,
            correctness: true,
            localization: {
              cn: "",
              en: ""
            },
            choosed_count: 0,
          },
          {
            keyName: "CLIP3_CHOICE1",
            nextClipNum: 3,
            correctness: false,
            localization: {
              cn: "",
              en: ""
            },
            choosed_count: 0,
          }
          ],
          collectibles: [],
        },
        {
          name: "Clip4",
          playList: [],
          isEnding: true,
          importance: 1,
          choices: [{
            keyName: "CLIP4_CHOICE0",
            nextClipNum: 1,
            correctness: true,
            localization: {
              cn: "",
              en: ""
            },
            choosed_count: 0,
          }],
          collectibles: [],
        }
        ]
      }
      defautLevel.localization.cn = args
      defautLevel = JSON.stringify(defautLevel)
      console.log(defautLevel)
      axios.post(url + '/level', defautLevel).then((res) => {
        console.log(res)
      })
    },
    UPDATE_LEVEL(state, args) {
      state.level = args
    },
    DELETE_LEVEL(state, args) {
      axios.delete(url + '/level?id=' + args).then((res) => {
        console.log(res)
      })
    },
    GET_SETTINGS(state) {
      console.log('getting settings')
      axios.get(url + '/settings').then((res) => {
        console.log("got settings")
        
        for (let index = 0; index < res.data.length; index++){
          res.data[index].localization = JSON.parse(res.data[index].localization)
        }
        state.settings = res.data
        console.log(state.settings)
      })
    },
    DELETE_SETTING(state, args) {
      axios.delete(url + '/settings?id=' + args).then((res) => {
        console.log(res)
      })
    },
    UPLOAD_SETTING(state, args) {
      var jsonSetting = JSON.stringify(args)
      console.log(jsonSetting)
      axios.post(url + '/settings', jsonSetting)
        .then((res) => {
          console.log(res)
        })
    },
    
    UPLOAD(state) {
      var jsonLevel = JSON.stringify(state.level)
      console.log(jsonLevel)
      axios.post(url + '/level', jsonLevel)
        .then((res) => {
          console.log(res)
        })
    }
  }
});
export default {
  store
}