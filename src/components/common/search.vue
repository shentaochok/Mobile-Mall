<template>
  <div>
    <van-nav-bar title="搜索结果" left-text="返回" left-arrow @click-left="goBack"/>
    <div id="list-div">
      <van-list @load="onLoad" v-model="loading" :finished="isFinished" :finished-text="text">
        <div class="list-item" v-for="(item,index) in goodsList" @click="goDetail(item.ID)" :key="index">
          <div class="list-item-img">
            <img :src="item.IMAGE1" alt width="100%" :onerror="error" />
          </div>
          <div class="list-item-text">
            <div>{{item.NAME}}</div>
            <div class>￥{{item.ORI_PRICE}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const { searchGoods } = require("@/webpack.url.js");
export default {
  data() {
    return {
      word: "",
      page: 0,
      goodsList:[],
      loading:false,
      isFinished:false,
      error:"this.src='"+require('@/assets/404.jpg')+"'",
      text:"没有更多了"
    };
  },
  created() {
    this.word = this.$route.query.word;
  },
  methods: {
    queryGoods() {
      this.page++;
      axios({
        method: "post",
        url: searchGoods,
        data: {
          word: this.word,
          page: this.page
        }
      }).then(res => {
           this.isShow = false;
           if(res.data.message.length==0&&this.page==1){
              this.text="暂无此商品";
           }
           if(res.data.message.length==0){
               this.isFinished=true;
           }
           if(res.data.code==200&&res.data.message){
                this.goodsList=this.goodsList.concat(res.data.message);
                this.loading=false;
           }
      });
    },
    onLoad(){
        this.queryGoods();
    },
    goBack(){
        this.$router.go(-1)
    },
       goDetail(id){
              this.$router.push({name:'Good',query:{goodsId:id}})
        }
  },
    mounted(){
           let winHeight = document.documentElement.clientHeight
           document.getElementById("list-div").style.height= winHeight-50+'px'
     }
};
</script>
<style scoped>
.loading {
  text-align: center;
  margin-top: 15px;
}
.list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow-y: scroll;
       -webkit-overflow-scrolling: touch;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
    #list-div{
        width:90%;
        margin:0 auto;
    }
</style>


