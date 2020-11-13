<template>
  <div class="home">
    <Header :seller="seller"></Header>
    <tab-bar/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Header from '@/components/common/header/Header'
import TabBar from  '@/components/common//tabbar/TabBar'
export default {
  name: 'Home',
  data() {
    return  {
      seller: []
    }
  },
  components: {
    Header,
    TabBar
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
  .home {
    width: 100%;
    position: relative;
  }
</style>
