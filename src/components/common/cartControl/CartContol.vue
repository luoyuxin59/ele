<template>
  <div v-if="food" class="control">
    <div  class="sub"  v-show="isShow"   @click.stop="updateFoodCount(food, false, $event)" >-</div>
    <span class="count" v-show="isShow">{{ food.count }}</span>
    <div class="add" @click.stop="updateFoodCount(food, true, $event)">+</div>
  </div>
</template>

<script>
export default {
  name: "CartControl",
  data() {
    return {
    };
  },
  props: {
    food: {},
    updateFoodCount: Function,
  },
  computed: {
    isShow() {
      // 判断是否存在count属性来控制数量和减少按钮的显示
      return this.food.count ? true : false;
    },
  }
};
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  .count {
    padding: 0 10px;
    font-size: 10px;
    color: #ccc;
    line-height: 20px;
  }
  .add {
    background: #00a0dc;
    color: #fff;
    line-height: 20px;
    font-size: 20px;
  }
  .sub {
    background: #fff;
    color: #00a0dc;
    border: 2px solid #00a0dc;
    line-height: 15px;
    font-size: 25px;
  }
  .add,
  .sub {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    font-weight: 500;
  }
}
</style>