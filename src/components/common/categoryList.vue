<template>
     <div>
          <div class="navbar-div">
               <van-nav-bar title='类别列表'/>
          </div>
          <div>
               <van-row>
                    <van-col span="6">
                         <div id="leftNav">
                             <ul>
                                <li v-for="(item,index) in category" :class="{categoryActive:index==categoryIndex}" @click="change(index)" :key="index">
                                     {{item.MALL_CATEGORY_NAME}}
                                </li>
                             </ul>
                         </div>
                    </van-col>
                    <van-col span="18">
                          <van-tabs v-model="active" @click="tabData">
                               <van-tab v-for="(item,index) in categorySub" :title="item.MALL_SUB_NAME" :key="index"></van-tab>
                          </van-tabs>
                          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                              <div id="list-div">
                                  <van-list @load="onLoad" v-model="loading" :finished="isFinished" finished-text="没有更多了">
                                   <div class="list-item" v-for="(item,index) in goodsList" @click="goDetail(item.ID)" :key="index">
                                        <div class="list-item-img"><img :src="item.IMAGE1" alt="" width="100%" :onerror="error"></div>
                                        <div class="list-item-text">
                                             <div>{{item.NAME}}</div>
                                             <div class="">￥{{item.ORI_PRICE}}</div>
                                        </div>
                                   </div>
                                  </van-list>
                              </div>
                          </van-pull-refresh>
                       
                    </van-col>
               </van-row>
          </div>
     </div>
</template>
<script>
import axios from 'axios'
import { Toast } from "vant";
import { setTimeout } from 'timers';
const { getCategory,getCategorySub,getCategoryGoods} = require("@/webpack.url.js");
export default {
     data(){
          return{
               category:[],
               categoryIndex:0,
               active:0,
               categorySub:[],
               goodsList:[],
               loading:false,
               isFinished:false,
               page:0,
               error:"this.src='"+require('@/assets/404.jpg')+"'",
               goodsName:'',
               isLoading:false
          }
     },
     methods:{
         getCategory(){
              axios({
                   method:'get',
                   url:getCategory
              }).then(res=>{
                   if(res.data.code==200 && res.data.message){
                        this.category=res.data.message;
                        this.category.forEach((item,index)=>{
                             if(item.MALL_CATEGORY_NAME==this.goodsName){
                                  this.categoryIndex=index;
                             }
                        })
                        this.getCategorySub(this.category[0].ID);
                   }else{
                        Toast("没有数据了")
                   }
              }).catch(err=>{
                   console.log(err)
              })
         },
         change(index){
              this.categoryIndex=index;
              this.active=0;
              this.getCategorySub(this.category[this.categoryIndex].ID);
              this.goodsList=[];
              this.page=0;
              this.isFinished=false;
         },
         getCategorySub(id){
              axios({
                   method:'post',
                   url:getCategorySub,
                   data:{
                        subId:id
                   }
              }).then(res=>{
                   if(res.data.code==200&&res.data.message){
                       this.categorySub=res.data.message;
                       this.onLoad();
                   }else{
                        Toast("没有数据了")
                   }
              }).catch(err=>{
                   console.log(err)
              })
         },
         getCategoryGoods(id){
              this.page++;
              axios({
                   method:"post",
                   url:getCategoryGoods,
                   data:{
                        goodsId:id,
                        page:this.page
                   }
              }).then(res=>{
                   if(res.data.code==200 && res.data.message){
                        if(res.data.message.length==0){
                             this.isFinished=true;
                             this.loading=false;
                             return;
                        }
                        this.goodsList=this.goodsList.concat(res.data.message);
                        this.loading=false;
                        setTimeout(()=>{
                            this.isLoading = false;
                        },500)
                        
                   }
                   else{
                        Toast("没有数据了")
                   }
              }).catch(err=>{
                   console.log(err)
              })
         },
         onLoad(){
             if(this.categorySub.length==0){
                  return;
             }
             this.getCategoryGoods(this.categorySub[this.active].ID)
         },
         tabData(){
              this.goodsList=[];
              this.page=0;
              this.isFinished=false;
              this.onLoad();
         },
         getInitIndex(goodsName){
              
         },
         goDetail(id){
              this.$router.push({name:'Good',query:{goodsId:id}})
        },
        onRefresh(){
             this.goodsList=[];
             this.page=0;
             this.isFinished=false;
             this.onLoad()
        }
     },
     created(){
          this.goodsName=this.$route.query.goodsName;
          this.getCategory()
     },
     mounted(){
           let winHeight = document.documentElement.clientHeight
           document.getElementById("leftNav").style.height= winHeight-46-50 +'px'
           document.getElementById("list-div").style.height= winHeight-90-50 +'px'
     }
}
</script>
<style scoped>
   #leftNav{
        background:lightgray;
   }
   #leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: #fff;
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
</style>


