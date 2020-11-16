<template>
  <div class="goods">
    <div class="tab" ref="tabWrapper">
      <ul>
        <li class="tab-item  " :class="{'active' : currentIndex == index}" 
        @click="tabClick(index)" v-for="(item,index) in category" :key="index">
          <span class="border">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods" ref="foodsWrapper">
      <div  class="foods">
        <div v-for="(item, index) in category" :key="index">
          <div class="foods-title">{{item.name}}</div>
          <ul>
            <li class="foods-item border" v-for="(food, index) in item.foods" :key="index">
              <img class="icon" :src="food.icon" alt="">
              <div class="item-info">
                <div class="name">{{food.name}}</div>
                <div v-if="food.description" class="description">{{food.description}}</div>
                <div class="other">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPirce">￥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="addCart">+</div>
              </div>
            </li>
          </ul>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import BScroll from 'better-scroll'
export default {
  name: "Goods",
  data() {
    return{
      category: [],
      currentIndex: 0
    }
  },
  created() {
    axios.get('/api2/goods').then(res => {
      this.category = res.data.data
      console.log(this.category );
      Vue.nextTick(() => {
        this.initScroll()
      }) 
    })
  },
  methods: {
    tabClick(index) {
        console.log(index);
      this.currentIndex = index
      console.log('-----');
      console.log(this.currentIndex);
    },
    initScroll() {
      // 创建分类列表的Scroll对象
      new BScroll(this.$refs.tabWrapper,{
        click: true
      })
      new BScroll(this.$refs.foodsWrapper, {

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
  .goods {
    display: flex;
    position: absolute;
    top: 181px;
    left: 0;
    bottom: 56px;
    width: 100%;
    overflow: hidden;
    .tab{
      width: 80px;
      font-size: 12px;
      color: #000;
      background: #f3f5f7;
      .tab-item{
        display: table;
        height: 54px;
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
          .addCart{
            position: absolute;
            right: 0px;
            bottom: 0px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 50%;
            background: #00a0dc;
            text-align: center;
            color: #fff;
            font-weight: 500;
            font-size: 20px;
          }
        }
      }
    }
  }
</style>