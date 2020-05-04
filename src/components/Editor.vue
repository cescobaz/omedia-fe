<template>
  <div>
    <h3>{{ media.length }} media selected</h3>
    <div class="preview">
      <div v-for="m in media" :key="m.path">
        <img :src="imgSrc(m)" :class="imgClass(m)" />
      </div>
    </div>
    <h4>tags</h4>
    <TagsEditor :media="media" />
    <h4>metadata</h4>
    <MetadataEditor :media="media" />
  </div>
</template>

<script>
import TagsEditor from './TagsEditor'
import MetadataEditor from './MetadataEditor'
import medialib from '../media'

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
  methods: {
    imgSrc: medialib.thumbnailImgSrc(64),
    imgClass: medialib.imgClass
  },
  watch: {}
}
</script>

<style scoped>
.editor {
  padding: 2px;
  margin: 0;
  overflow: scroll;
  overflow-x: hidden;
}
.preview {
  display: flex;
  flex-wrap: wrap;
  max-height: 160px;
  overflow: scroll;
  overflow-x: hidden;
}
.preview div {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview img {
  max-height: 100%;
  max-width: 100%;
}
</style>
