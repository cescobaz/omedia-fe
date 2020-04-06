<template>
  <div class="full-size">
    <div class="wrapper">
      <Navigator class="navigator" />
      <div class="page">
        <div class="header">
          <div class="selected">{{ $route.path }} - {{ statusMessage }}</div>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
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
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0;
}
.header div {
  padding: 2px;
  margin: 0;
}
.content {
  flex: 1;
  width: 100%;
  overflow: scroll;
}
</style>
