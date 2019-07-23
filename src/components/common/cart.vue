<template>
  <div>
    <van-nav-bar title="购物车"></van-nav-bar>
    <div class="cart-list">
      <van-swipe-cell
        v-for="(item,index) in cartInfo"
        :key="index"
        :on-close="onClose"
        :name="item.goodsId"
      >
        <div class="pang-row">
          <div class="pang-img">
            <img :src="item.image" width="100%" />
          </div>
          <div class="pang-text">
            <div class="pang-goods-name">{{item.goodsName}}</div>

            <div class="pang-control">
              <van-stepper v-model="item.count" />
            </div>
          </div>
          <div class="pang-goods-price">￥{{item.price}}</div>
          <div class="pang-goods-price">
            <div>￥{{item.price}}</div>
            <div>x{{item.count}}</div>
            <div class="allPrice">￥{{item.price*item.count}}</div>
          </div>
        </div>
        <template slot="right">
          <van-button square type="danger" text="删除" class="delete" />
        </template>
      </van-swipe-cell>
    </div>
    <div class="car_empty" v-if="!isEmpty">
      <van-icon name="shopping-cart-o" size="50px" />
      <h2>购物车居然是空的</h2>
      <p>再忙也要记得买点什么犒劳自己~</p>
      <van-button type="primary" @click="goCategoryList">去逛逛</van-button>
    </div>
    <div class="totalMoney" v-if="isEmpty">商品总价：￥ {{totalMoney}}</div>
    <div class="card-title" v-if="isEmpty">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false
    };
  },
  created() {
    this.getCartInfo();
  },
  computed: {
    totalMoney() {
      let price = 0;
      this.cartInfo.forEach(item => {
        price += item.count * item.price;
      });
      console.log(123);
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return price;
    }
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
      this.isEmpty = false;
    },
    goCategoryList() {
      this.$router.push("/categorylist");
    },
    onClose(clickPosition, instance, data) {
      let len = this.cartInfo.length;
      this.cartInfo.forEach((item, index) => {
        if (item.goodsId == data.name) {
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            this.cartInfo.splice(index, 1);
            if (len == 1) {
              localStorage.removeItem("cartInfo");
              this.cartInfo = [];
              this.isEmpty = false;
            }
            instance.close();
          });
        }
      });
    }
  }
};
</script>
<style>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.car_empty {
  text-align: center;
  padding-top: 24px;
}
.car_empty h2 {
  font-weight: normal;
  font-size: 24px;
}
.car_empty p {
  font-weight: normal;
  font-size: 15px;
}
.delete {
  height: 100%;
}
</style>


