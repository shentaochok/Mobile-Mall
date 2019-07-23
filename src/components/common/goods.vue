<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="goBack" />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" alt width="100%" />
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格:{{goodsInfo.PRESENT_PRICE}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">正在制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsInfo">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger" @click="buy">直接购买</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Toast } from "vant";
const { getInfo} = require("@/webpack.url.js");
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getInfo() {
      axios({
        method: "post",
        url: getInfo,
        data: {
          goodsId: this.goodsId
        }
      }).then(res => {
        if (res.data.code == 200 && res.data.message) {
          this.goodsInfo = res.data.message;
        } else {
          Toast("获取数据失败");
        }
      });
    },
    addGoodsInfo(){
      let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[];
      let isHaveGoods=cartInfo.find(item=>{
           return item.goodsId==this.goodsId;
      })
      if(!isHaveGoods){
           let newGoodsInfo={
                goodsId:this.goodsInfo.ID,
                goodsName:this.goodsInfo.NAME,
                price:this.goodsInfo.PRESENT_PRICE,
                image:this.goodsInfo.IMAGE1,
                count:1
           }
           cartInfo.push(newGoodsInfo);

           localStorage.cartInfo=JSON.stringify(cartInfo);
      }else{
               cartInfo.forEach(item=>{
               if(item.goodsId==this.goodsId){
                     item.count+=1;
               }
               localStorage.cartInfo=JSON.stringify(cartInfo);
      })
      }
         Toast.success("添加成功");
         this.$router.push('/cart')
    },
    buy(){
       Toast.fail("尚未开发");
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getInfo();
  }
};
</script>
<style scoped>
.detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
  padding:0 8px;
  font-size:17px;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
.detail{
  margin-bottom:60px;
}
</style>


