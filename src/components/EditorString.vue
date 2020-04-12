<template>
  <div>
    <div class="wrapper">{{ value.displayName }}: {{ value.value }}</div>
  </div>
</template>

<script>
export default {
  name: 'EditorString',
  props: {
    value: Object
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style scoped></style>
