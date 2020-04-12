<template>
  <div>
    <div class="wrapper">
      <h3>{{ value.name }}</h3>
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
        return { name: 'Media', value: [] }
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

<style scoped></style>
