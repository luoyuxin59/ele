<template>
  <div class="ratings">
  <scroll class="warpper" ref="scroll" > 
    <div class="overview">
      <div class="left">
        <div class="score">{{ seller.score }}</div>
        <div class="text">综合评分</div>
        <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
      </div>
      <div class="right">
        <div class="score-wrapper">
          <span class="attitude-scroe">服务态度</span>
          <star :score="seller.serviceScore" :size="36"></star>
          <span class="score">{{ seller.serviceScore }}</span>
        </div>
        <div class="score-wrapper">
          <div class="goods-scroe">商品评分</div>
          <star :score="seller.serviceScore" :size="36"></star>
          <span class="score">{{ seller.foodScore }}</span>
        </div>
        <div class="delivery-time">
          送达时间<span class="time">{{ seller.deliveryTime }}分钟</span>
        </div>
      </div>
    </div>
    <spit></spit>
    <div class="ratings-list">
      <div class="tab">
        <span
          v-for="(item, index) in classifyArr"  :key="index" class="item"
          :class="{  'active': item.active,  'no': index == 2,
            'badActive': item.active && index == 2,
          }"
          @click="filterEvel(item)"
        >
          {{ item.name }}<span class="count">{{ item.count }}</span>
        </span>
      </div>
      <div class="switch" >
        <i class="iconfont icon-ok" @click="evelflag = !evelflag" :class="{'on': evelflag}"></i>
        <span class="text">只看有内容的评价</span>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in evelArr" :key="index">
            <div class="avatar">
              <img :src="item.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <div class="content-title">
                <span class="title">{{item.username}}</span>
                <span class="time">{{item.rateTime | date-string}}</span>
              </div>
           <div class="star-warper">
              <star class="star" :score="item.score" :size="24"></star>
              <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
           </div>
           <div class="text">
             {{item.text}}
           </div>
           <div class="recommend" >
                <i class="iconfont" :class="item.rateType == 0 ? 'icon-zan' : ' icon-cai'"></i>
              
             <span class="recommend-item" v-for="(recommend,index) in item.recommend " :key="index"> 
            {{recommend}}</span>
           </div>
            </div>
          </li>
        </ul>
      </div>
    </div> 
    <ul> 
     <li>1</li>
      
   </ul> 
     </scroll>
  </div>
 
</template>

<script>

import axios from "axios";
import Star from "@/components/common/star/Star";
import Spit from "@/components/common/split/Spit";
import Scroll from '@/components/common/scroll/Scroll'
export default {
  name: "Ratings",
  data() {
    return {
      seller: [],
      ratings: [],
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
    };
  },
  created() {
      this.getData();
  },
  components: {
    Star,
    Spit,
    Scroll
  },
  mounted() {
  },
  computed: {
    evelArr() {
      let selectIndex = 0;
      this.classifyArr.forEach((data, index) => {
        console.log(data, index);
        if (data.active) {
          selectIndex = index;
        }
      });
      return selectIndex
        ? this.ratings.filter((data) =>
            this.evelflag
              ? data.rateType === selectIndex - 1 && data.text
              : data.rateType === selectIndex - 1
          )
        : this.ratings.filter((data) => (this.evelflag ? data.text : true));
    },
  },
  methods: {
    getData() {
      axios.get("/mock/data.json").then((res) => {
        this.seller = res.data.seller;
        this.ratings = res.data.ratings;
        console.log(this.ratings);
          this._initClassifyArr();
      });
    },
       _initClassifyArr() {
      this.classifyArr.forEach((data, index) => {
        if (index) {
          data.count = this.ratings.filter(
            (temp) => temp.rateType === index - 1
          ).length;
        } else {
          data.count = this.ratings.length;
        }
      });
    },
    filterEvel(item) {
      this.classifyArr.forEach((data) => {
        data.active = false;
      });
      item.active = true;
    },
  },
};

</script>

<style lang="scss" scoped>
@import url('../../../../assets/css/fonts/iconfont.css');

.ratings {
    position: absolute;
    top: 180px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  .overview {
    width: 100%;
    padding: 18px 0;
    display: flex;
  
    .left {
      flex: 0 0 137px;
      width: 137px;
      padding: 6px 0;
      border-right: 1px solid #ccc;
      text-align: center;
      .score {
        line-height: 38px;
        font-size: 24px;
        color: rgba(255, 153, 0);
        font-weight: 500;
      }
      .text {
        font-size: 12px;
        color: rgba(7, 17, 27);
        line-height: 24px;
      }
      .rank {
        font-size: 10px;
        line-height: 20px;
        color: #ccc;
      }
    }
    .right {
      flex: 1;
      font-size: 12px;
      padding: 6px 0 6px 24px;
      .score-wrapper {
        margin: 9px 0;
        .attitude-scroe,
        .goods-scroe {
          display: inline-block;
          vertical-align: top;
          margin-top: 2px;
        }
        .score {
          color: #f90;
        }
      }
      .delivery-time {
        .time {
          margin-left: 12px;
          color: #93999f;
        }
      }
    }
  }
  .ratings-list {
    .tab {
      padding: 18px 0;
      margin: 0 18px;
      border-bottom: 1px solid #ccc;
      .item {
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        color: #666;
        background-color: rgba(0, 160, 220, 0.2);
        margin-right: 8px;
      }
      .no {
        width: 70px;
        background-color: #f1f1f1;
      }
      .active {
        background-color: #00a0dc;
        color: #fff;
      }
    }
    .switch{
      width: 100%;
      line-height: 40px;
      text-align: left;
      padding: 0 18px;
      border-bottom: 1px solid #ccc;
      .iconfont{
        font-size: 25px;
        color: #666;
        vertical-align: top;
      }
      .text{
        vertical-align: top;
        font-size: 12px;
        color: #ccc;
      }
      .on{
        color: #00c850;
      }
    }
    .list{
      margin: 0 18px;
      border-bottom: 1px solid #ccc;
      .avatar img {
        border-radius: 50%;
        vertical-align: top;
      }
      ul{
         width: 100%;
        li{
           width: 100%;
           display: flex;
           border-bottom: 1px solid #ccc;
           padding: 18px 0;
          .content{
            width: 100%;
            padding-left: 12px;
            .content-title{
              display: flex;
              justify-content: space-between;
      
              font-size: 10px;
            .time{
              color: #ccc;
             }
           }
           .star-warper{
             .star{
               margin-left: 0;
             }
             .deliveryTime{
               color: rgba(147,153,159);
              line-height: 18px;
              font-size: 12px;
             }
           }
           .text{
             font-size: 12px;
             color: rgba($color: #000000, $alpha: 1.0);
             line-height: 18px;
           }
           .recommend{
             width: 100%;
             margin-top: 8px;
           
            .recommend-item{
              display: inline-block;
              border: 1px solid rgba(7,17,27,.1);
              color: rgba(147,153,159);
              line-height: 16px;
              font-size: 9px;
              margin: 3px 0 3px 8px;
              border-radius: 2px;
              padding: 2px 6px;
            }
            .icon-zan{
              color: #00a0dc;
            }
            .icon-cai{
              font-size: 10px;
            }
           }
          }
        }
      }
    }
  }
}
</style>