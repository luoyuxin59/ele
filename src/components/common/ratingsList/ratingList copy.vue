<template>
   <div class="ratings-list">
        <div class="tab">
          <span
            v-for="(item, index) in classifyArr"
            :key="index"
            class="item"
            :class="{
              active: item.active,
              no: index == 2,
              badActive: item.active && index == 2,
            }"
            @click="filterEvel(item)"
          >
            {{ item.name }}<span class="count">{{ item.count }}</span>
          </span>
        </div>
        <div class="switch">
          <i
            class="iconfont icon-ok"
            @click="switchOnlyContent"
            :class="{ on: evelflag }"
          ></i>
          <span class="text">只看有内容的评价</span>
        </div>
       
      </div>
</template>

<script>
import Star from "@/components/common/star/Star";

export default {
  name: "ratingList",
  data() {
    return{
      
    }
  },
  props: {
    ratings: Array,
    classifyArr: Array,
    evelflag: Boolean
 },
 components: {
   Star
 },
    
  methods: {
    filterEvel (item) {
    this.classifyArr.forEach((data) => {
      data.active = false;
    });
    item.active = true;
  },
   _initClassifyArr () {
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
    switchOnlyContent(event){
      console.log(event);
      this.$emit('switchOnlyContent')
    }
  }
}
</script>

<style lang="scss" scoped>
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
    .switch {
      width: 100%;
      line-height: 40px;
      text-align: left;
      padding: 0 18px;
      border-bottom: 1px solid #ccc;
      .iconfont {
        font-size: 25px;
        color: #666;
        vertical-align: top;
      }
      .text {
        vertical-align: top;
        font-size: 12px;
        color: #ccc;
      }
      .on {
        color: #00c850;
      }
    }
    
  }
</style>