<template>
  <div class="custom-scrollbar">
    <div class="wrapper custom-scrollbar" ref="scrollDiv">
      <div
        class="custom-scroll-cursor"
        :style="{ top: top, height: cursorHeight }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollBar',
  props: { scrollData: Object },
  computed: {
    top () {
      if (this.$data.height <= 0) {
        return
      }
      return this.computeTop()
    }
  },
  methods: {
    computeTop () {
      if (!this.$refs.scrollDiv) {
        return '0'
      }
      const height = this.$refs.scrollDiv.clientHeight
      this.$data.height = height
      const { scrollTop, scrollTopMax } = this.scrollData
      const cursorHeight = Math.min(
        1.0,
        Math.max(height / (height + scrollTopMax), 0.1)
      )
      const cursorHeightPercentage = `${cursorHeight * 100.0}%`
      this.$data.cursorHeight = cursorHeightPercentage
      if (cursorHeight >= 1) {
        return '0'
      }
      const cursorHeightPixel = cursorHeight * height
      const top = (scrollTop / scrollTopMax) * (height - cursorHeightPixel)
      return `${top}px`
    }
  },
  mounted () {
    this.computeTop()
  },
  data () {
    return {
      height: 0,
      cursorHeight: '16px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
}
</style>
