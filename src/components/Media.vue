<template>
  <div class="full-size">
    <div class="wrapper">
      <Gallery
        class="gallery"
        :media="media"
        :actions="actions"
        v-model="selected"
      />
      <Editor class="editor inverted" :media="selected" />
    </div>
  </div>
</template>

<script>
import Gallery from './Gallery.vue'
import Editor from './Editor.vue'
import { mapState } from 'vuex'
import { actions } from '../store'

export default {
  name: 'Media',
  components: {
    Gallery,
    Editor
  },
  props: {},
  data () {
    return {
      selected: [],
      actions: [
        {
          label: 'delete',
          do: (index, media) => {
            this.$store.dispatch(actions.DELETE_MEDIA, media)
          }
        },
        {
          label: 'present',
          do: (index, media) => {
            window.open(media.path, '_blank')
          }
        }
      ]
    }
  },
  computed: mapState({ media: 'media' }),
  mounted () {
    this.$store.dispatch(actions.LOAD_MEDIA)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
.gallery {
  height: 100%;
}
.editor {
  width: 256px;
}
</style>
