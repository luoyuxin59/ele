<template>
   <div class="ratings-list" ref="ratingsList" v-if="ratings">
        <div class="tab">
          <span class="item positive" :class="{active: selectType===2}" @click="setType(2, $event)">
          {{desc.all}}<span class="count">{{ratings.length}}</span>
        </span>
         <span class="item positive" :class="{active: selectType===0}" @click="setType(0, $event)">
        {{desc.positive}}<span class="count">{{positiveLength}}</span>
      </span>
      <span class="item negative" :class="{noactive: selectType===1}" @click="setType(1, $event)">
        {{desc.nagetive}}<span class="count">{{ratings.length-positiveLength}}</span>
      </span>
          <!-- <span v-for="(item, index) in classifyArr" :key="index" class="item"
            :class="{  'active': item.active, no: index == 2, badActive: item.active && index == 2,}"
            @click="filterEvel(item)">
            {{ item.name }}<span class="count">{{ item.count }}</span>
          </span> -->
        </div>
        <div class="switch">
          <i class="iconfont icon-ok" @click="switchOnlyContent"  :class="{ on: onlyContent }" ></i>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
</template>

<script>
import Star from "@/components/common/star/Star";

export default {
  name: "ratingList",
  props: {
    ratings: Array,
    classifyArr: Array,
    selectType: Number,
    onlyContent: Boolean
 },
 components: {
   Star
 },
  created() {
    this.desc = {
        all: '全部',
        positive: '满意',
        nagetive: '不满意'
      }
  },
  computed: {
    positiveLength() {
      return this.ratings.reduce((preTotal, rating) => {
        return preTotal + (rating.rateType === 0 ? 1 : 0)
      },0)
      
    }
  },
  methods: {
   setType(type, event) {
    //  this.selectType = type
    
      this.$emit('setSelectType', type)
      
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
      .negative {
        width: 70px;
        background-color: #f1f1f1;
      }
      .noactive{
        background: #666;
        color: #fff;
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