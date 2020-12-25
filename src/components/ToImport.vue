<template>
  <div class="full-size">
    <Gallery class="full-size" :media="media" :actions="actions" />
  </div>
</template>

<script>
import Gallery from './Gallery.vue'
import { mapState } from 'vuex'
import { actions } from '../store'

export default {
  name: 'ToImport',
  components: {
    Gallery
  },
  props: {},
  data () {
    return {
      section: 'media',
      actions: [
        {
          label: 'import',
          do: (index, media) => {
            this.$store.dispatch(actions.IMPORT_MEDIA, [media])
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
  computed: mapState({ media: 'toImport' }),
  mounted () {
    this.$store.dispatch(actions.LOAD_TO_IMPORT)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
