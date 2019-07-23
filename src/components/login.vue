<template>
  <div>
    <van-nav-bar title="用户登陆" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field
        label="用户名"
        v-model="username"
        placeholder="请输入用户名"
        required
        :right-icon="clear"
        @input="change"
        @click-right-icon="username=''"
        :error-message="username_err"
      />
      <van-field
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        v-model="password"
        :error-message="password_err"
      />
    </div>
    <div class="register-button">
      <van-button type="primary" class="submit" @click="ok_submit" :loading="isComplete">登陆</van-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Toast } from "vant";
import { login } from "@/webpack.url.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      clear: "",
      isComplete: false,
      username_err: "",
      password_err: ""
    };
  },
  methods: {
    change() {
      this.username && (this.clear = "clear");
    },
    goBack() {
      this.$router.go(-1);
    },
    register() {
      this.isComplete = true;
      axios({
        method: "post",
        url: login,
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        this.isComplete = false;
        if (res.data.code == 200 && res.data.message) {
          if (res.data.message == true) {
            localStorage.username = this.username;
            Toast.success("登陆成功");
            this.$router.push("/user");
          }
          else{
            Toast.success("用户名不存在");
          }
        } else {
          Toast.fail("登陆失败");
          this.openLoading = false;
        }
      })
    },
    ok_submit() {
      if (this.checkform()) {
        this.register();
      }
    },
    checkform() {
      let state = true;
      if (this.username.length < 6) {
        this.username_err = "用户名不得小于6位数";
        state = false;
      } else {
        this.username_err = "";
      }
      if (this.password.length < 6) {
        this.password_err = "密码不得小于6位数";
        state = false;
      } else {
        this.username_err = "";
      }
      return state;
    }
  }
};
</script>
<style scoped>
.submit {
  display: block;
  width: 100px;
  margin: 30px auto 0;
}
</style>


