<template>
  <div id="app">
    <div class="container">
      <div class="box">
        <el-image style="width: 100px; height: 100px" :src="url"></el-image>
        <h1>Self Reliance Portal</h1>
        <el-input
          prefix-icon="el-icon-user"
          autosize
          class="input"
          v-model="username"
          placeholder="Username"
        />
        <el-input
          prefix-icon="el-icon-lock"
          autosize
          class="input"
          v-model="password"
          placeholder="Password"
          show-password
        />
        <el-input
          prefix-icon="el-icon-lock"
          autosize
          class="input"
          v-model="token"
          v-show="showReg"
          placeholder="token"
        />
        <el-button @click="login">Login</el-button>
        <el-button @click="register">Register</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store.js";
export default {
  name: "index",
  store,
  data() {
    return {
      url:
        "https://www.eroducate.xyz/wp-content/uploads/2020/01/%E7%94%BB%E6%9D%BF-1.png",
      username: "",
      password: "",
      showReg: false,
      token: ""
    };
  },
  components: {},
  methods: {
    login() {
      var formattedData = {
        username: this.username,
        password: this.password,
      };
      this.$store.store.dispatch("login", formattedData).then(() => {
        setTimeout(() => {
          if (sessionStorage.getItem("isLoggedIn")) {
            location.reload();
          }
        }, 200);
      });
    },
    register() {
      if(this.token == ""){
        this.showReg = true;
        return
      }
      var formattedData = JSON.stringify({
        token: this.token,
        username: this.username,
        password: this.password,
      });
      this.$store.store.dispatch("register", formattedData).then(() => {
        setTimeout(() => {
          if (sessionStorage.getItem("isLoggedIn")) {
            location.reload();
          }
        }, 200);
      });
    },
  },
};
</script>
<style>
.input {
  margin-top: 10px;
  margin-bottom: 10px;
}

.box {
  height: 100%;
  width: 50%;
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