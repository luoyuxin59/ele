<template>
  <div class="warpper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data () {
    return {
      scroll: null,
    };
  },

  mounted () {
    // 1.组件创建完成后调用=

    // 2.监听滚的位置
    // this.scroll.on('scroll',(position) => {
    //  this.$emit('scroll', position)
    // })
    // 3.监听上拉加载事件
    // scroll.on('pullingUp', () => {
    //   this.$emit('pullingUp')
    // })
  },
  methods: {
    init () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true,
      })
      console.log('scroll', this.scroll);
         // 监听滚动的位置
         this.scroll.on('scroll',(position) => {
           this.$emit('scroll',position)
        })
    },
    refresh () {
      console.log('scroll');
      this.scroll && this.scroll.refresh()
    },
 
    
  },
};
</script>

<style scoped>
.warpper {
  height: 100%;
}
</style>