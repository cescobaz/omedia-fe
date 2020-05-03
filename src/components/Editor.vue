<template>
  <div>
    <h3>{{ media.length }} media selected</h3>
    <h4>tags</h4>
    <TagsEditor :media="media" />
    <h4>metadata</h4>
    <MetadataEditor :media="media" />
  </div>
</template>

<script>
import TagsEditor from './TagsEditor'
import MetadataEditor from './MetadataEditor'

export default {
  name: 'Editor',
  components: { TagsEditor, MetadataEditor },
  props: {
    media: Array
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
.editor {
  padding: 2px;
  margin: 0;
  overflow: scroll;
}
</style>
