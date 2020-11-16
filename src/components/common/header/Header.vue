<template>
  <div class="header">
    <div class="title">
      <img :src="seller.avatar" alt="" />
      <div class="title-info">
        <div class="info-brand item">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="info-description item">
          <span >{{ seller.description }} / {{ seller.deliveryTime }}分钟送达</span>
        </div>
        <ul class="info-yh item" >
          <li v-if="seller.supports">
            <span class="icon" ></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </li>
        </ul>
      </div>
      <div class="count" v-if="seller.supports" @click="showDetail(true)">
        <span>{{seller.supports.length}}个</span><span class="iconfont icon-right"></span>
      </div>
    </div>
    <div class="notice"  @click="showDetail(true)">
      <span class="notice-title"></span><span class="notice-text">{{seller.bulletin}}</span><span class="iconfont icon-right"></span>
    </div>
    <div class="bg">
       <img :src="seller.avatar" alt="" />
    </div>
    <div class="fade">
        <div class="detail" v-show="detailShow">
          <div class="title2">
           {{ seller.name }}
          </div>
        <div class="star2">
            <star :score="seller.serviceScore" :size="48"></star>
        </div>
        <div class="yhxx">
          <div class="line"></div>
        <div class="text">优惠信息</div>
        <div class="line"></div>
        </div>
        <div class="supports">
          <ul>
            <li class="supports-item" v-for="item in seller.supports">{{item.description}}</li>
          </ul>
        </div>
        <div class="sjgg">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="content">
          {{seller.bulletin}}
        </div>
        <div class="back" @click="showDetail(false)">
          ×
        </div>
    </div> 
    </div>
  </div>
</template>

<script>
import Star from '../star/Star'
export default {
  name: "Header",
  data(){
   return{
      detailShow: false
   }
  },
  props: ["seller"],
   created() {
     
  },
  components: {
    Star
  },
  methods:{
    showDetail(isShow){
      this.detailShow = isShow
    }
  }
};
</script>

<style lang="scss" scoped>
  @import url('../../../assets/css/fonts/iconfont.css');

.header {
  position: relative;
  z-index: 999;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 140px;
  background-color: rgba(7,17,27,0.5);
  blur: 10px;
  overflow: hidden;
  .title {
    position: relative;
    flex: 1;
    padding: 24px 12px 18px 24px;

    display: flex;
    img {
      width: 64px;
      height: 64px;
      border-radius: 4px;
    }
    .title-info {
      display: flex;
      flex-direction: column;
      padding: 4px 0 0 14px;
     
      .info-brand {
        display: flex;
        .brand {
          background: url("./img/brand@3x.png");
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name{
          color:rgba(255,255,255);
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
          padding-left: 12px;
        }
      }
      .info-description {
        line-height: 12px;
        font-size: 12px;
        color:rgba(255,255,255);
        font-weight: 200;
        padding: 8px 0 10px 0;
      }
      .info-yh {
        font-size: 10px;
        color:rgba(255,255,255);
        font-weight: 200;
        line-height: 12px;
        .icon {
           background: url("./img/decrease_1@2x.png");
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }
        .text{
          padding-left: 8px;
        }
      }
    }
    .count{
      position: absolute;
      bottom: 18px;
      right: 24px;
      font-size: 10px;
      color: #fff;
      height: 24px;
      width: 50px;
      background-color:rgba(7,17,27,.2);
      text-align: center;
      border-radius: 13px;
      line-height: 24px;
      .iconfont{
        font-size: 10px;
        padding-left: 4px;
      }
    }
  }
  .notice {
    position: relative;
    height: 28px;
    line-height: 28px;
    background-color:rgba(7,17,27,.2);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(255,255,255);
    padding: 0 22px 0 12px;
    .notice-title {
      background: url('./img/bulletin@2x.png');
      display: inline-block;
      vertical-align: top;
      width: 25px;
      height: 13px;
      background-size: 24px 12px;
      background-repeat: no-repeat;
      margin: 7px 4px 0 0;
    }
    .notice-text{
      position: relative;
      vertical-align: middle;
      line-height: 28px;
      font-size: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .iconfont {
      position: absolute;
      top: 0px;
      right: 12px;
      font-size: 2px;
    }
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    z-index: -1;
      img{
        width: 100%;
      }
    }
  }
  .fade{
    .detail{
      min-width: 100%;
      min-height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:rgba(7,17,27,0.8) ;
      z-index: 100; 
        padding: 64px 0 32px;
      .title2{
          font-size: 16px;
          color: #fff;
          font-weight: 700;
          line-height: 16px;
          text-align: center;
          margin-bottom: 16px;
      }
      .star2{
        line-height: 24px;
        text-align: center;
      }
      .yhxx{
        display: flex;
        padding:  28px 36px 24px;
        .text{
        text-align: center;
        color: #fff;
        font-weight: 500;
        padding: 0 12px;
        // margin-bottom: 24px;
      }
      .line{
        position: relative;
        top: 8px;
        width: 107px;
        height: 2px;
        background: rgba(255,255,255, .2);
        flex: 1;
       }
      }
      .supports{
        padding: 0 48px;
        .supports-item {
          font-size: 12px;
          line-height: 14px;
          color: #fff;
          font-weight: 700;
          margin-bottom: 12px;
        }
      }
      .sjgg{
        display: flex;
        padding:  28px 36px 24px;
        .text{
        text-align: center;
        color: #fff;
        font-weight: 500;
        padding: 0 12px;
    
        }
        .line{
        position: relative;
        top: 8px;
        width: 107px;
        height: 2px;
        background: rgba(255,255,255, .2);
        flex: 1;
       }
      }
      .content{
        font-size: 12px;
        color: #fff;
        line-height: 24px;
        padding: 0 48px;
      }
      .back{
        margin-top: 80px;
        font-size: 32px;
        color: #fff;
        text-align: center;
        line-height: 16px;
      }
  }
}
</style>

