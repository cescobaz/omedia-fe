<template>
  <div class="full-size overflow-hidden">
    <div class="wrapper full-size">
      <div class="header section-border-b">
        <Header />
      </div>
      <div class="content">
        <Navigator class="navigator section-border-r" />
        <div class="page">
          <router-view></router-view>
        </div>
      </div>
      <div class="status-message padding-a section-border-t">
        {{ status.date }} | {{ status.message }}
        <span class="status-error">{{
          status.error ? ` | ${status.error}` : ""
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navigator from './Navigator.vue'
import Header from './Header.vue'
import { mapState } from 'vuex'

export default {
  name: 'Navigation',
  components: {
    Navigator,
    Header
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
<style lang="scss" scoped>
@import "../assets/variables.scss";
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
  overflow: hidden;
}
.header {
}
.content {
  position: relative;
  flex: 1;
  flex-grow: 4;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}
.navigator {
  width: 200px;
}
.page {
  flex: 1;
}
.status-message {
  text-align: left;
}
.status-error {
  color: $error-color;
}
</style>
