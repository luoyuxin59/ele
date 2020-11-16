<template>
  <div class="seller" ref="seller">
    <div>
      <div class="name">
        <div class="left">
          <div class="text">{{ seller.name }}</div>
          <star class="star" :score="seller.serviceScore" :size="36"></star>
          <span class="count">({{ seller.ratingCount }})</span>月售单
        </div>
        <div class="right" @click="favoriteClick">
          <span
            class="iconfont icon-icon4"
            :class="{ active: favorite }"
          ></span>
          <div class="sc">{{ favorite ? "已收藏" : "收藏" }}</div>
        </div>
      </div>
      <div class="info">
        <div class="item">
          <div class="item-text">起送价</div>
          {{ seller.minPrice }}<span>元</span>
        </div>
        <div class="item2 item">
          <div class="item-text">商家配送</div>
          {{ seller.deliveryPrice }}<span>元</span>
        </div>
        <div class="item">
          <div class="item-text">平均配送时间</div>
          {{ seller.deliveryTime }}<span>分钟</span>
        </div>
      </div>
      <spit />
      <div class="bulletin">
        <h4 class="title">公告与活动</h4>
        <p class="text border">{{ seller.bulletin }}</p>
        <ul class="supports">
          <i class="icon"></i>
          <li
            class="supports-item border"
            v-for="item in seller.supports"
            :key="item.type"
          >
            {{ item.description }}
          </li>
        </ul>
      </div>
      <spit />
      <div class="pics">
        <div class="name1">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img width="120" height="90" :src="pic" />
            </li>
          </ul>
        </div>
      </div>
      <spit />
      <div class="other ">
        <div class="other-title border ">商家信息</div>
        <div class="other-info">
          <ul>
            <li class=" info-item border" v-for="item in seller.infos">{{item}}</li>
          </ul>
        </div>
      </div>
      <!-- <ul>
        <li v-for="i in 100">{{ i }}</li>
      </ul> -->
    </div>
  </div>
</template>

<script>
// import Scroll from "@/components/common/scroll/Scroll";
import Star from "@/components/common/star/Star";
import Spit from "../../../../components/common/split/Spit";
import BScroll from "better-scroll";

export default {
  name: "Seller",
  props: {
    seller: {},
  },
  data() {
    return {
      favorite: localStorage.getItem("favorite"),
    };
  },
  components: {
    // Scroll,
    Star,
    Spit,
  },
  created() {
    this.seller;
    this._initScroll();
  },
  methods: {
    favoriteClick($event) {
      if (!$event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      // 保存
      localStorage.setItem("favorite", this.favorite);
    },
    _initScroll() {
      this.$nextTick(() => {
       new BScroll(this.$refs.seller,{
         click: true
       })
       const liWidth = 120
       const space = 6
      //  给ul指定宽度
      const ul = this.$refs.picWrapper.children[0]
      const liConunt = ul.children.length
      ul.style.width = ((liWidth+space) * liConunt - space) + 'px'
      new BScroll(this.$refs.picWrapper, {
        click: true,
        scrollX: true
      })
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.border:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(7, 17, 27, 0.1);
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}
.seller {
   position: absolute;
    top: 180px;
    left: 0;
    right: 0;
    bottom: 0;
  overflow: hidden;
  .name {
    height: 60px;
    display: flex;
    padding: 8px 24px 16px 16px;
    font-size: 10px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .left {
      .star {
        margin-left: 0;
        margin-top: 5px;
      }
      .count {
        margin-right: 10px;
      }
      .text {
        font-size: 12px;
        color: #333;
        font-weight: 600;
      }
    }
    .right {
      width: 36px;
      margin-top: -6px;
      text-align: center;
      .icon-icon4 {
        font-size: 26px;
        vertical-align: top;
      }
      .active {
        color: red;
      }
    }
  }
  .info {
    padding: 16px 16px 24px 16px;
    display: flex;
    text-align: center;
    .item2 {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    .item {
      flex: 1;
      font-size: 28px;
      color: #111;
      .item-text {
        font-size: 10px;
        color: #ccc;
        font-weight: 500;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .bulletin {
    margin: 16px 16px 0 16px;
    .title {
      color: #333;
      font-size: 16px;
    }
    .text {
      position: relative;
      padding: 10px 18px 16px 10px;
      line-height: 25px;
      color: red;
      font-size: 10px;
      font-weight: 500;
    }
    .supports {
   
      color: #333;
      .supports-item {
        position: relative;
        padding-left: 10px;
        line-height: 38px;
        font-size: 10px;
      }
    }
  }
  .pics {
    margin: 16px;
    .name1 {
      font-size: 13px;
      color: #333;
      margin-bottom: 10px;
    }
    .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }
     .pic-list{
       .pic-item{
          display: inline-block;
          margin-right: 6px;;
          width: 120px;
          height: 90px;
       }
     }
  }
  .other{
    padding: 16px;
     color: #111;
    .other-title {
      position: relative;
      font-size: 14px;
      padding-bottom: 8px;
    }
    .other-info{
      .info-item{
        position: relative;
        padding-left: 10px;
        font-size: 10px;
        line-height: 44px;
    }
    }
    
  }
}
</style>