<template>
  <div class="full-size">
    <Gallery
      class="full-size"
      :media="media"
      :actions="actions"
      :selected="selected"
    />
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
      actions: [
        {
          label: 'delete',
          do: (index, { id }) => {
            axios
              .delete(`/backend/api/media/${id}`)
              .then(() => {
                const index = this.$data.media.findIndex(m => m.id === id)
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
  methods: {
    selected () {}
  },
  computed: mapState({ media: 'media' }),
  mounted () {
    this.$store.dispatch(actions.LOAD_MEDIA)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
