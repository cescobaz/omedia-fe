<template>
  <div>
    <div class="wrapper">
      <h3>{{ media.length }} media selected</h3>
      <div v-if="media.length !== 0" class="preview">
        <ul>
          <li class="selectable-padding" v-for="m in media" :key="m.path">
            <div class="img-container">
              <img :alt="m.filePath" :src="imgSrc(m)" :class="imgClass(m)" />
            </div>
            <ToolBar
              class="toolbar"
              :createActions="createActions()"
              :value="m"
            />
          </li>
        </ul>
      </div>
      <h4 v-if="media.length !== 0">tags</h4>
      <TagsEditor :media="media" />
      <h4 v-if="media.length !== 0">metadata</h4>
      <MetadataEditor :media="media" />
    </div>
  </div>
</template>

<script>
import TagsEditor from './TagsEditor'
import MetadataEditor from './MetadataEditor'
import medialib from '../media'
import ToolBar from './ToolBar'
import { mutations } from '../store'

export default {
  name: 'Editor',
  components: { TagsEditor, MetadataEditor, ToolBar },
  props: {
    media: Array
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    createActions () {
      return media => {
        return [
          {
            label: 'download',
            do: () => window.open(media.path, '_blank')
          },
          {
            label: 'deselect',
            do: () => {
              this.$store.commit(mutations.DESELECT_MEDIA, { media })
            }
          },
          {
            label: 'show in collection',
            do: () => {}
          }
        ]
      }
    },
    imgSrc: medialib.thumbnailImgSrc(64),
    imgClass: medialib.imgClass
  },
  watch: {}
}
</script>

<style scoped>
.wrapper {
  margin: 0;
  overflow: scroll;
  overflow-x: hidden;
}
.preview {
  max-height: 160px;
  overflow: scroll;
  overflow-x: hidden;
}
.preview ul {
  display: block;
  position: relative;
}
.preview li {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img-container {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.img-container img {
  max-height: 100%;
  max-width: 100%;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.toolbar a {
  margin-left: 8px;
  margin-top: 8px;
}
</style>
