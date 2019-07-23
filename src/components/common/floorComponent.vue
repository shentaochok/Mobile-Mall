<template>
  <div class="floor">
    <div class="floor-title">{{floorTitle}}</div>
    <div class="floor-anomaly">
      <div class="floor-one">
        <router-link :to="{name:'Good',query:{goodsId:floor1.goodsId}}">
           <img :src="floor1.image" width="100%" />
        </router-link>
      </div>
      <div>
        <div class="floor-two">
          <router-link :to="{name:'Good',query:{goodsId:floor2.goodsId}}">
                <img :src="floor2.image" width="100%" />
          </router-link>
        </div>
        <div>
          <router-link :to="{name:'Good',query:{goodsId:floor3.goodsId}}">
                <img :src="floor3.image" width="100%" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="floor-rule">
      <div v-for="item,index in floorData.slice(3)">
        <img :src="item.image" alt width="100%" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["floorData", "floorTitle"],
  data() {
    return {
      floor1: {},
      floor2: {},
      floor3: {}
    };
  },
  created() {
    // console.log(this.floorData)
  },
  watch: {
    floorData() {
      this.floor1 = this.floorData[0];
      this.floor2 = this.floorData[1];
      this.floor3 = this.floorData[2];
    }
  }
};
</script>
<style scoped>
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-anomaly div {
  width: 10rem;

  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-one {
  border-right: 1px solid #ddd;
}
.floor-two {
  border-bottom: 1px solid #ddd;
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
.floor-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>


