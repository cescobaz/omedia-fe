<template>
  <div class="full-size">
    <div class="wrapper">
      <div class="content">
        <Navigator class="navigator" />
        <div class="page">
          <div class="selected header">
            <div class="path">{{ $route.path }}</div>
          </div>
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <div class="status-message">{{ statusMessage }}</div>
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
  computed: mapState(['statusMessage']),
  created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.navigator {
  width: 150px;
  height: 100%;
}
.page {
  height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  padding: 0;
  margin: 0;
}
.path,
.status-message {
  padding: 2px;
  margin: 0;
}
.status-message {
  text-align: left;
}
.content {
  flex: 1;
  width: 100%;
  overflow: scroll;
}
</style>
