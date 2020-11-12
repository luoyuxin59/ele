<template>
  <div class="ratings">
    <div class="overview">
      <div class="left">
        <div class="score">{{ seller.score }}</div>
        <div class="text">综合评分</div>
        <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
      </div>
      <div class="right">
        <div class="score-wrapper">
          <span class="attitude-scroe ">服务态度</span>
          <star :score="seller.serviceScore" :size="36"></star>
          <span class="score">{{ seller.serviceScore }}</span>
        </div>
        <div class="score-wrapper">
          <div class="goods-scroe ">商品评分</div>
          <star :score="seller.serviceScore" :size="36"></star>
          <span class="score">{{ seller.foodScore }}</span>
        </div>
        <div class="delivery-time">送达时间<span class="time">{{ seller.deliveryTime }}分钟</span>
        </div>
      </div>
    </div>
    <spit></spit>
  </div>
</template>

<script>
import axios from "axios";
import Star from "@/components/common/star/Star";
import Spit from '@/components/common/split/Spit'
export default {
  name: "Ratings",
  data() {
    return {
      seller: [],
    };
  },
  created() {
    this.getData();
  },
  components: {
    Star,
    Spit
  },
  methods: {
    getData() {
      axios.get("/mock/data.json").then((res) => {
        console.log(res.data.seller);
        this.seller = res.data.seller;
      });
    },
  },
};
</script>

<style lang="scss">
.ratings {
  width: 100%;
  position: absolute;
  top: 174px;
  left: 0;
  color: rgba(7, 17, 27);

  // overflow: hidden;
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
         .attitude-scroe, .goods-scroe {
            display: inline-block;
            vertical-align: top;
            margin-top: 2px;
         }
         .score{
           color: #f90;
         }
      }
     .delivery-time{
       .time{
         margin-left: 12px;
         color:#93999f;
       }
     }
    }
  }
}
</style>