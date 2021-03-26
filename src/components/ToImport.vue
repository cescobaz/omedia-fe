<template>
  <div class="full-size">
    <Gallery class="full-size" :media="media" :createActions="createActions" />
  </div>
</template>

<script>
import Gallery from './Gallery.vue'
import { mapState } from 'vuex'
import { actions } from '../store'

function createActions (store) {
  return media => {
    return [
      {
        label: 'delete',
        do: (index, media) => {
          store.dispatch(actions.DELETE_MEDIA, { mediaIds: [media.id] })
        }
      },
      {
        label: 'import',
        do: (index, media) => {
          store.dispatch(actions.IMPORT_MEDIA, [media])
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
}

export default {
  name: 'ToImport',
  components: {
    Gallery
  },
  props: {},
  data () {
    return {
      section: 'media',
      createActions: createActions(this.$store)
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
