<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3" class="location">
          <img :src="locationIcon" alt width="70%"/>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" v-model="searchWord" />
        </van-col>
        <van-col span="4" offset="1">
          <van-button size="mini" @click="searchGood">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swiper-area">
      <van-swipe>
        <van-swipe-item v-for="(item,index) in bannerPicArray" :key="index">
          <img :src="item.image" alt width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(item,index) in category" @click="goCategory(item.mallCategoryName)" :key="index">
        <img v-lazy="item.image" alt width="90%" />
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <div class="adBanner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" alt width="100%" />
    </div>
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" class="recommend-item" :key="index">
            <div @click="goDetail(item.goodsId)">
              <img :src="item.image" alt width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1" />
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2" />
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3" />
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-row gutter="20">
          <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
            <goods-info
              :goodsImage="item.image"
              :goodsName="item.name"
              :goodsPrice="item.price"
              :goodsId="item.goodsId"
            ></goods-info>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import floorComponent from "@/components/common/floorComponent";
import goodsInfo from "@/components/common/goodsInfoComponent";
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const { index } = require("@/webpack.url.js");
export default {
  data() {
    return {
      locationIcon: require("../assets/location.png"),
      bannerPicArray: [
        { imageUrl: require("../assets/1.jpg") },
        { imageUrl: require("../assets/2.jpg") },
        { imageUrl: require("../assets/3.jpg") }
      ],
      category: null,
      adBanner: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: "",
      hotGoods: [],
      searchWord:''
    };
  },
  created() {
    axios({
      url: index,
      method: "get"
    }).then(response => {
      if (response.status == 200) {
        let data = response.data.data;
        this.category = data.category;
        this.adBanner = data.advertesPicture;
        this.bannerPicArray = data.slides;
        this.recommendGoods = data.recommend;
        this.floor1 = data.floor1;
        this.floor2 = data.floor2;
        this.floor3 = data.floor3;
        this.floorName = data.floorName;
        this.hotGoods = data.hotGoods;
      }
    });
  },
  methods: {
    goCategory(goodsName) {
      this.$router.push({
        name: "categoryList",
        query: { goodsName: goodsName }
      });
    },
    goDetail(id){
        this.$router.push({name:'Good',query:{goodsId:id}})
    },
    searchGood(){
        let word=this.searchWord;
        this.$router.push({name:'Search',query:{word:word}})
    }
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  }
};
</script>
<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
  font-size:20px;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  width: 0;
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex-grow: 1;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-area{
  font-size: 14px;
  text-align: center;
  margin-bottom:50px;
}
.location{
  height:2.2rem;
  overflow:hidden;
  position:relative;
}
.location>img{
   position:absolute;
   top:50%;
   transform:translateY(-50%);
   left:5px;
}
</style>


