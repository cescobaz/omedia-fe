<template>
  <div>
    <div class="wrapper">
      <h3>{{ value.displayName }}</h3>
      <div v-for="attribute in value.value" :key="attribute.name">
        <component :is="attribute.component" :value="attribute" />
      </div>
    </div>
  </div>
</template>

<script>
import EditorString from './EditorString'
export default {
  name: 'EditorObject',
  components: { EditorString },
  props: {
    value: {
      type: Object,
      default: function () {
        return { name: 'media', value: [] }
      }
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style scoped>
.wrapper {
  margin-top: 8px;
}
.wrapper h3 {
  margin-bottom: 2px;
}
</style>
