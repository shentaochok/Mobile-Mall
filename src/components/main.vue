<template>
    <div>
      <router-view></router-view>
      <van-tabbar v-model='active' @change="changeUrl">
          <van-tabbar-item icon='shop'>首页</van-tabbar-item>
          <van-tabbar-item icon='records'>分类</van-tabbar-item>
          <van-tabbar-item icon='cart'>购物车</van-tabbar-item>
          <van-tabbar-item icon='contact'>个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            active:0
        }
    },
    methods:{
        changeUrl(){
             let index=this.active;
             switch (index){
                  case 0:
                  this.$router.push('/');
                  break;
                  case 1:
                  this.$router.push('/categorylist');
                  break;
                  case 2:
                  this.$router.push('/cart');
                  break;
                  case 3:
                  this.$router.push('/user');
                  break;
             }
        },
        getActive(){
           let newPath=this.$route.path;
           if(newPath=="/"){
               this.active=0;
           }else if(newPath=="/categorylist"){
               this.active=1;
           }
           else if(newPath=="/cart"){
               this.active=2;
           }
           else if(newPath=="/user"){
               this.active=3;
           }
        }
    },
    created(){
        this.getActive();
    },
     watch:{
        '$route'(){
            this.getActive();
        }
    }
}
</script>
<style>
   
</style>


