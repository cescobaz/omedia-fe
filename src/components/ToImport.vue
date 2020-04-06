<template>
  <div class="full-size">
    <Gallery class="full-size" :media="media" :actions="actions" />
  </div>
</template>

<script>
import axios from 'axios'
import Gallery from './Gallery.vue'
import { mapState } from 'vuex'
import { actions } from '../store'

export default {
  name: 'Media',
  components: {
    Gallery
  },
  props: {},
  data () {
    return {
      section: 'media',
      actions: [
        { label: 'delete', do: console.log },
        {
          label: 'import',
          do: (index, media) => {
            axios
              .post('/backend/api/media/', [media.filePath])
              .then(response => {
                console.log(response)
                const index = this.$data.media.indexOf(media)
                if (index >= 0) {
                  this.$data.media.splice(index, 1)
                }
              })
              .catch(console.log)
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
