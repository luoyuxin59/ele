<template>
  <div v-if="food" class="food" v-show="isShow" ref="food">
    <div>
    <div class="img-header">
      <img class="img" :src="food.image" alt="food">
    </div>
    <div class="food-content">
      <div class="name">{{food.name}}</div>
      <div class="sales">
        <span class="yueshou">月售{{food.sellCount}}份</span>
        <span>好评率{{food.rating}}%</span>
      </div>
      <div class="other">
        <div class="price">
          <span class="now" >￥{{food.price}}</span>
        <span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
        </div>
         <span class="add" @click="updateFoodCount(food, true, $event)" v-if="!food.count">加入购物车</span>
        <cart-contol v-else :food="food" class="control" :update-food-count="updateFoodCount"></cart-contol>
        </div>
    </div>
    <Spit/>
    <div class="food-info">
      <div class="title">商品信息</div>
      <p class="info-text">{{food.info}}</p>
    </div>
    <Spit/>
    <span class="iconfont icon-buoumaotubiao09" @click="show(false)"></span>
      <rating-list :evelflag="evelflag" 
                    :classifyArr="classifyArr"
                    ref="ratingList" 
                    :ratings="evelArr"
                    @switchOnlyContent="switchOnlyContent" >
      </rating-list>
     <div class="list">
        <ul>
           {{evelArr}}
          <li class="list-item border" v-for="(item,index) in evelArr" :key="index">
           
            <div class="user-info">
              <div class="date">
                <span >{{item.rateTime}}</span>
              </div>
              <div class="user">
                <span class="name">{{item.username}}</span>
                <img :src="item.avatar" alt="" class="img">
              </div>
            </div>
            <div class="content">
              <i v-if="item.rateType == 0" class="iconfont icon-zan"></i>
              <i v-else class="iconfont icon-cai"></i>
              <p class="text">{{item.text}}</p>
            </div>
          </li>
        </ul>
     </div>
      </div>
  </div>
</template>

<script>
import CartContol from '../cartControl/CartContol'
import Spit from '../split/Spit'
import ratingList from '../ratingsList/ratingList'
// import Scroll from '../scroll/Scroll'
  import Vue from 'vue'
  import BScroll from 'better-scroll'

export default {
  name: "food",
  data(){
    return {
      isShow: false,
           classifyArr: [
        {
          name: "全部",
          count: 0,
          active: true,
        },
        {
          name: "推荐",
          count: 0,
          active: false,
        },
        {
          name: "不满意",
          count: 0,
          active: false,
        },
      ],
        evelflag: false,
    }
  },
  props :{
    food: Object,
    updateFoodCount:Function,
  },
  components: {
    CartContol,
    Spit,
    ratingList,
    // Scroll
  },
  computed: {
    evelArr () {
      var selectIndex = 0;
      this.classifyArr.forEach((data, index) => {
        console.log(data.active);
        
        if (data.active) {
          console.log(data.name);
          console.log(index);
          selectIndex = index;
        }
      });      
      return selectIndex
    //    return selectIndex ? this.food.ratings.filter((data) =>
    //      this.evelflag ? data.rateType === selectIndex - 1 &&
    //       data.text : data.rateType === selectIndex - 1
    //     )
    //     : this.food.ratings.filter((data) => (this.evelflag ? data.text : true));
    //     console.log(data);
    },
    },
  methods: {
    show(isShow) {
      this.isShow = !this.isShow
      if(isShow){
        Vue.nextTick(() => {
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
            }else {
              this.scroll.refresh()
          }
        })
      }
    },
    
    switchOnlyContent(event) {
      this.evelflag = !this.evelflag
       this.$nextTick(() => {
          // 刷新列表的Scroll对象
          this.scroll.refresh()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.border:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(7, 17, 27, 0.3);
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}
  .food {
   width: 100%;

   position: fixed;
   top: 0;
   bottom: 46px;
   left: 0;
   z-index: 999;
   background: #fff;
   .img-header{
    position: relative;
    width: 100%;
    height: 0;
     padding-top: 100%;
    .img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
   }
   .food-content{
    //  background: #fff;
     height: 110px;
     width: 100%;
     padding: 16px 16px 20px 16px;
     .name{
       font-size: 14px;
       color: #111;
       font-weight: 600;
       padding-bottom: 8px;
     }
     .sales{
       color: #93999f;
       font-size: 12px;
       padding-bottom: 20px;
       .yueshou{
         padding-right: 10px;
       }
     }
     .other{
       display: flex;
       justify-content: space-between;
       .price{
         font-size: 14px;
        .now{
          color: #f01414;
          margin-right: 8px;
         
        }
        .old{
          color: #93999f;
          font-size: 13px;  
          text-decoration: line-through;
        }
       }
       .add{
         width: 84px;
         height: 24px;
         line-height: 24px;
         text-align: center;
         background: #00a0dc;
         color: #fff;
         font-size: 12px;
          border-radius: 12px;
       }
     }
   }
    .icon-buoumaotubiao09{
      font-size: 40px;
      position: absolute;
      top: 10px;
      left: 10px;
      color: #00a0dc;
    }
    .list-item{
      position: relative;
      height: 68px;
      padding: 15px 0;
      margin: 0 15px;
      font-size: 10px;
      color: #ccc;
      .user-info{
        display: flex;
        justify-content: space-between;
        .user{
          .name{
            padding-right: 5px;
          }
          img{
            width: 10px;
            height: 10px;
            border-radius: 5px;
          }
        }
      }
      .content{
        display: flex;
        padding-top: 10px;
        line-height: 10px;
        .icon-zan{
          color: #00a0dc;
          padding-right: 10px;
        }
          .icon-cai{
            font-size: 10px;
          }
        .text{
          color: #111;
        }
      }
    }
    .food-info{
      padding: 15px 30px 15px 15px;
      .title{
        font-size: 13px;
        color: #222;
      }
      .info-text{
        padding-left: 8px;
        font-size: 10px;
        color: #666;
        line-height: 26px;
      }
    }
  }
</style>
