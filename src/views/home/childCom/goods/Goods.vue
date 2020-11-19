<template>
<div>
  <div class="goods">
    <div class="tab" ref="tabWrapper">
      <ul>
        <li class="tab-item  " :class="{active : currentIndex == index}" 
         @click="clickMenuItem(index, $event)" v-for="(item,index) in goods" :key="index"
        >
          <span class="border">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods" ref="foodsWrapper">
      <div  class="foods">
        <div class="food-list-hook" v-for="(item, index) in goods" :key="index">
          <div class="foods-title">{{item.name}}</div>
          <ul>
            <li class="foods-item border" v-for="(food, index) in item.foods" :key="index" 
               @click="foodClick(food, $event)">
              <img class="icon" :src="food.icon" alt="">
              <div class="item-info ">
                <div class="name">{{food.name}}</div>
                <div v-if="food.description" class="description">{{food.description}}</div>
                <div class="other">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPirce">￥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>             
              </div>
                <cart-control :food="food" class="control" :update-food-count="updateFoodCount"></cart-control>
            </li>  
          </ul>
        </div>
        </div>
    </div>
     <cart  :minPrice="seller.minPrice" :foodList="foodList" 
     :update-food-count="updateFoodCount"></cart>
   </div>
     <food :updateFoodCount="updateFoodCount" :food="selectFood" ref="food"></food>
     </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import BScroll from 'better-scroll'
import Cart from '@/components/common/cart/Cart'
import CartControl from '@/components/common/cartControl/CartContol'
import Food from '@/components/common/food/food'
export default {
  name: "Goods",
  props: {
    seller: Object
  },
  data() {
    return{
      goods: [],
      // currentIndex: 0,
      foodsScroll: null,
      scrollY: 0,
      tops: [],
      selectFood: {},
    }
  },
  components: {
    Cart,
    CartControl,
    Food
    
  },
  created() {
    axios.get('/api2/goods').then(res => {
      this.goods = res.data.data
      console.log(this.goods );
  
      Vue.nextTick(() => {
        this.initScroll()
        this.initTops()
      }) 
    })
  },
  computed: {
    currentIndex() {
      const {tops, scrollY} = this;
      // findIndex返回tops的索引位置  将此位置添加active 类名  
      return tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index +1]
      });
    },
    foodList() {
      // 遍历有count属性的food 
      const foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if(food.count) {
            foods.push(food)
          }
        })
      })
      return  foods
    }
  },
  methods: {
    clickMenuItem(index, event) {
      console.log(event);
      if(!event._constructed) {
        return
      }
      // 将右侧的列表滚动到对应的位置 
      var li = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')[index]
      console.log(li);
      this.foodsScroll.scrollToElement(li, 300)
    },
    initScroll() {
      // 创建分类列表的Scroll对象
      new BScroll(this.$refs.tabWrapper,{
        click: true
      })
      // 创建foodsScroll对象
     this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
       click: true,
       probeType: 3
      })
      // 绑定scroll监听 
      this.foodsScroll.on('scroll',(pos) => {
         this.scrollY = Math.abs(pos.y)
      })
    },
    initTops() {
      var tops = this.tops
      var top = 0
      tops.push(top)
      var lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      lis.forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
    },
    updateFoodCount(food, isAdd, event) {
      // if(!event._constructed) {
      //   return 
      // }
      if(isAdd) { //增加
        if(!food.count) { //第一次
         console.log('第一次click');
          // 新增count属性
          Vue.set(food, 'count', 1)
        }else {
          food.count++
        }
      }else { //减少
        if(food.count) {
          food.count--
          if(food.length == 0) {

          }
        }
      }
    },
     foodClick(food, event) {
        console.log(food);
         if(!event._constructed) {
          return
        }
      //  传到详情页面 
       this.$refs.food.show(true)
      this.selectFood  = food
      console.log( this.selectFood);
     
    }
  },
 
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
  .goods {
    display: flex;
    position: absolute;
    top: 173px;
    left: 0;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .tab{
      width: 80px;
      font-size: 12px;
      color: #000;
      background: #f3f5f7;
      .tab-item{
        display: table;
        height: 52px;
        width: 80px;
        padding: 0 12px;
        line-height: 14px;
        span{
          position: relative;  
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          position: relative;
          border: none;
          font-size: 12px;
        }
      }
      .active{
        background-color: #fff;
      }
    }
    .foods{
      flex: 1;
      .foods-title{
        width: 100%;
        height: 24px;
        color: #93999f;
        background: #f3f5f7;
        font-size: 12px;
        line-height: 24px;
        padding-left: 16px;
        border-left: 2px solid #ccc;
      }
      .foods-item{
        position: relative;
        display: flex;
        padding: 16px 0 16px 0;
        margin: 0 20px 0 16px;
        color: #000;
        .icon{
          height: 60px;
          width: 60px;
        }
        .item-info{
          position: relative;
          padding-left: 10px;
          width: 100%;
          .name{
            font-size: 13px;
            color: #333;
            line-height: 20px;
          }
          .other, .description{
            overflow: hidden;
            line-height: 20px;
            font-size: 10px;
            color: #93999f;
            .count{
              padding-right: 10px;
            }
          }
          .price{
            .newPirce{
              color: #f01414;
            }
            
            .oldPrice{
              padding-left: 10px;
              font-size: 10px;
              color: #93999f;
              text-decoration: line-through;
            }
          }
        }
      }
    }
    .control{
      position: absolute;
      right: 4px;
      bottom: 16px;
    }
  
  }
</style>