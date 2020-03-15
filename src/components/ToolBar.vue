<template>
  <div class="selected">
    <div class="font selected wrapper">
      <span
        v-for="action in actions"
        :key="action.label"
        @click="action.do(value)"
        class="action"
        style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;"
        unselectable="on"
        onselectstart="return false;"
        onmousedown="return false;"
        >{{ action.label }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
  components: {},
  props: { actions: Array, value: Object },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  text-align: right;
  padding: 0;
  margin: 0;
}
.action {
  margin: 8px;
  cursor: pointer;
}
</style>
