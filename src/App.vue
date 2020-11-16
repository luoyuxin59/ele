<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <tab-bar/>
    <router-view :seller="seller" />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Header from '@/components/common/header/Header'
import TabBar from  '@/components/common//tabbar/TabBar'

export default {
  name: 'app',
  data() {
    return  {
      seller: []
    }
  },
  components: {
    Header,
    TabBar,

  },
    created() {
    axios('/mock/data.json').then((res) => {
      if(res.status == 200) {
        console.log(res.data.seller);
        this.seller = res.data.seller
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import url('../src/assets/css/base.css');
 #app{
   height: 100vh;
   position: relative;
 }
</style>

