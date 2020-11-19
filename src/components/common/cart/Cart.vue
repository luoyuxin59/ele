<template>
<div>
  <div class="cart">
    <div class="shop-cart">
    <div class="left">
      <div class="icon"><i class="iconfont icon-ai66 " @click="toogleList"
      :class="isShow ? 'clickacitve' : 'iconfont1'" ></i>
      <div v-show="isShow" class="count">{{sum}}</div>
      </div>
      <span class="price">￥{{totalPrice}}</span>
      <span class="delivery-price">另需配送费￥4元</span>
    </div>
    <div class="right" :class="totalPrice >= minPrice ? 'enough' : 'not-enough'"
      @click="payClick"
      >{{payText}}</div>
    </div>
     <div class="cart-list"  v-show="showContent">
       <div class="list-header">
         <div class="title">购物车</div><div class="empty" @click="emptyClick">清空</div>
       </div>
      <scroll ref="scroll" class="scroll">
       <div class="list-content">    
        <ul >
          <li  class="item" v-for="(food,index) in foodList" :key="index">
            <div class="item-left">
              <span class="name">{{food.name}}</span><span v-if="food.count"> / {{food.count}}个</span>
            </div> 
            <div class="item-right">
              <span class="price">￥10</span>
              <cart-control :food="food" class="control" :update-food-count="updateFoodCount"></cart-control>
            </div>
          </li>
         </ul>
       </div>
       </scroll>
     </div>
     <div class="settlement" v-show="isShowsettlement">
      <span class="pay"> 需要支付{{totalPrice +4}}元</span>
      <button class="btn" @click="btnclick" >确认</button>
     </div>
  </div>
  <div class="list-mask"  v-show="isShowContent"> </div>
  </div>
</template>

<script>
import CartControl from '../cartControl/CartContol'
import Scroll from '../scroll/Scroll'
import Vue from 'vue'
export default {  
  name: "Cart",
  props: {
    foodList: Array,
    updateFoodCount: Function,
    minPrice: Number
  },
  data(){
    return {
      isShowContent: false,
      isShowsettlement: false
    }
  },
  components: {
    CartControl,
    Scroll,
    // Scroll
  },
  computed: {
    // 是否展示购物车为蓝色 和 商品件数显示为红色
    isShow(){
      return !this.foodList.length == 0 
    },
    // 总价
    totalPrice(){
      let  total = 0
      this.foodList.forEach(food => {
        total += food.price * food.count
      })
      return total 
    },
    // pay选项填充文字
    payText(){
      var totalPrice = this.totalPrice
      var  minPrice = this.minPrice
      if(totalPrice === 0) {
        return `￥${minPrice}元起送`
      }else if(totalPrice < minPrice){
          return `还差￥${minPrice - totalPrice}元起送`
      }else{
        return `去结算`
      }
    },
    // 商品件数综合
    sum(){
       var sum = 0
       this.foodList.forEach(food => {
        sum +=  food.count
      })
      return sum
    },
       // 商品件數 0 時隱藏购物车
    showContent() {
       if (this.sum == 0) {
         this.isShowContent =  false
         return false
       }
       if(this.isShowContent){
         Vue.nextTick(() => {

            if(!this.scroll){  //  !this.scroll未true 保存只創建一次scroll
               this.$refs.scroll.init()
                
            } else { // 不是第一次
              this.scroll.refresh()   //刷新一个滚动（荣誉感高度大于容器元素的高度，形成滚动条 ）
            }
         })
       }
        return  this.isShowContent
      },
      
  },
  methods: {
    // 清空购物车
    emptyClick() {
      this.foodList.forEach(food => {
        food.count = 0
      })   
      this.isShowContent = false
      this.isShowsettlement = false
    },
 
      toogleList() {
        if(this.sum > 0){
          this.isShowContent =  !this.isShowContent 
        }
      },
      // 结算
    payClick() {
      if(this.totalPrice >= 20) {
       this.isShowsettlement = true
      }
    },
    btnclick() {
        this.isShowsettlement = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .cart{
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 1000;
    .scroll{
      width: 100%;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
    }
    .shop-cart{
      width: 100%;
      display: flex;
      height: 46px;
      background: #141d27;
      color: #80858a;
    .left{
      // position: relative;
      flex: 1;
      .count{
        position: absolute;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        color: #fff;
        font-size: 12px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
        font-weight: 700;
        background: #f01414;;
        border-radius: 16px;
      }
      .icon{
        position: absolute;
        bottom: 0;
        left: 16px;
        width: 56px;
        height: 56px;
        background: #141d27;
        border-radius: 50%;
        text-align: center;
        .clickacitve{
          display: inline-block;
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 30px;
          width: 46px;
          height: 46px;
          line-height: 46px;
          border-radius: 50%;
           background: #00a0dc;
          text-align: center;
          color: #fff;
         
        }
        .iconfont1{
          display: inline-block;
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 30px;
          width: 46px;
          height: 46px;
          line-height: 46px;
          border-radius: 50%;
          background: #2b343c;
          text-align: center;
          color: #80858a;
      }
      }
      .price{
        font-weight: 800;
        padding: 0 12px 0 80px ;
        line-height: 46px;
        border-right: 1px solid rgba(255,255,255,0.1);
      }
      .delivery-price{
        font-weight: 600;
        font-size: 12px;
        padding: 0 48px 0 12px;
      }
    }
    .right{
      flex: 0 0 105px;
      line-height: 46px;
      text-align: center;
      font-weight: 800;
      font-size: 12px;
     }
     .not-enough{
      background: #2b333b;

     }
     .enough{
        background: #00b43c;
        color: #fff;
     }
    }
    .cart-list{
      position: absolute;
      color: #333;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      .list-header {
        position: relative;
        display: flex;
        padding: 0 15px;
        justify-content: space-between;
        background: #f3f5f7;
        line-height: 40px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        font-size: 14px;
        .empty{
          color: #00a0dc;
        }
      }
      .list-content{
        background: #fff;
        padding: 0 25px 0 15px; 
        .item{
          height: 46px;
          line-height: 46px;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          display: flex;
          justify-content: space-between;
          .item-left{
            font-size: 14px; 
            color: #111;
          }
          .item-right{
            display: flex;
            .price{
              color: #f01414;
            }
            .control{
              margin-top: 13px;
              margin-left: 8px;
            }
          }
        }
      }
      
    }
  .settlement{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 60px;
    line-height: 30px;
    background: #00a0dc;
    color: #fff;
    font-size: 14px;
    text-align: center;
    transform: translateX(-50%);
    .btn{
      width: 40px;
      height: 20px;
      border-radius: 5px;
      background: #fff;
      border: 1px solid #111;
    }
  }
  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7,17,27,0.6);
    z-index: 99;
  }
</style>