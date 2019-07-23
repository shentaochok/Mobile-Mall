<template>
  <div>
    <div class="user_pic">
      <img class="user-poster" src="@/assets/user.jpg" />
      <van-icon class="icon_user" name="manager" size="90px" />
      <div class="user_submit" v-if="!isLogin">
        <van-button type="primary" class="submit" @click="register">注册</van-button>
        <van-button type="danger" class="submit" @click="login">登陆</van-button>
      </div>
      <div class="username" v-if="isLogin">用户名{{username}}</div>
    </div>
    <van-cell-group class="user-group" v-if="isLogin">
      <van-cell icon="records" title="全部订单" is-link @click="allOrder"/>
    </van-cell-group>
    <van-cell-group v-if="isLogin">
      <van-cell icon="cart" title="我的购物车" is-link @click="goCart"/>
    </van-cell-group>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      isLogin: false,
      username:''
    };
  },
  created() {
    if (localStorage.username) {
       this.isLogin = true;
       this.username=localStorage.username;
    }
  },
  methods:{
    register(){
       this.$router.push('/register');
    },
    login(){
       this.$router.push('/login');
    },
    goCart(){
      this.$router.push('/cart')
    },
    allOrder(){
         Toast.fail("尚未开发");
    }
  }
};
</script>
<style>
.user-poster {
  width: 100%;
  height: 53vw;
  display: block;
}
.user-group {
  margin-bottom: 15px;
}
.user-links {
  padding: 15px 0;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
}
.user_pic {
  position: relative;
}
.icon_user {
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
}
.user_submit {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24px;
  text-align: center;
}
.user_submit button:first-child {
  margin-right: 30px;
}
.submit {
  width: 100px;
}
.username {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24px;
  text-align: center;
}
</style>

