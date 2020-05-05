<template>
  <div class="full-size overflow-hidden">
    <div class="wrapper full-size">
      <div class="content margin-tl margin-b">
        <Navigator class="navigator margin-r" />
        <div class="page margin-r">
          <router-view></router-view>
        </div>
      </div>
      <div class="status-message margin-rb margin-l">{{ status.message }}</div>
    </div>
  </div>
</template>

<script>
import Navigator from './Navigator.vue'
import { mapState } from 'vuex'

export default {
  name: 'Navigation',
  components: {
    Navigator
  },
  props: {},
  data () {
    return {}
  },
  computed: mapState(['status']),
  created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  overflow: hidden;
}
.content {
  position: relative;
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}
.navigator {
  width: 150px;
}
.page {
  flex: 1;
}
.status-message {
  text-align: left;
}
</style>
