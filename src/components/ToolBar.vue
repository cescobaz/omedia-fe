<template>
  <div class="selected">
    <div class="font selected wrapper">
      <div class="inverted label">{{ label }}</div>
      <div
        v-for="(action, index) in actions"
        :key="action.label"
        @click="action.do(index, value)"
        class="action"
        style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;"
        unselectable="on"
        onselectstart="return false;"
        onmousedown="return false;"
      >
        {{ action.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  components: {},
  props: { label: String, actions: Array, value: Object },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  padding: 0;
  margin: 0;
}
.label {
  flex: 1;
}
.action {
  cursor: pointer;
}
.label,
.action {
  margin: 0 8px;
}
</style>
