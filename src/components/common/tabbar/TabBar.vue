<template>
  <div class="tab-bar">
    <ul>
      <router-link tag="li" to="goods">商品</router-link>
      <router-link tag="li" to="ratings">评价</router-link>
      <router-link tag="li" to="seller">商家</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style lang="scss" scoped>
  .tab-bar {
    position: relative;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #f3f3f3;
    ul{
      display: flex;
      text-align: center;
      li{
        flex: 1;
        line-height: 40px;
      }
      .router-link-active{ 
        color: #f00;
      }
    }
  }
</style>