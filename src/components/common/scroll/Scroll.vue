<template>
  <div class="warpper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data(){
    return{
      scroll: false
    }
  },
mounted() {
      this.$nextTick(() => {
        //$refs绑定元素
        if(!this.scroll){
            this.scroll = new BScroll(this.$refs.wrapper, {
            //开启点击事件 默认为false
            click:true
        })
        // console.log(this.scroll)
        }else if(!this.$refs.wrapper){
            return
        }
        else{
            this.scroll.refresh()
        }
      })
  },
  methods: {
    refresh() {
        console.log('scroll');
      this.scroll.refresh()
      },
  }
};
</script>

<style scoped>
  .warpper{
    height: 100%;
  }
</style>