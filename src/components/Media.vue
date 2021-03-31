<template>
  <div class="full-size">
    <div class="wrapper full-size">
      <Gallery
        class="gallery"
        :media="media"
        :createActions="createActions"
        :value="selected"
        @input="setSelected"
        @scroll-limit="loadMoreMedia"
      />
      <Editor class="editor section-border-l" :media="selected" />
    </div>
  </div>
</template>

<script>
import Gallery from './Gallery.vue'
import Editor from './Editor.vue'
import { mapState } from 'vuex'
import { actions, mutations } from '../store'

function createActions (store) {
  const deleteAction = {
    label: 'delete',
    do: (index, media) => {
      store.dispatch(actions.DELETE_MEDIA, { mediaIds: [media.id] })
    }
  }

  const untrashAction = {
    label: 'untrash',
    do: (index, media) => {
      store.dispatch(actions.DELETE_TAG, {
        media: [media],
        tag: 'trash'
      })
    }
  }
  const trashAction = {
    label: 'trash',
    do: (index, media) => {
      store.dispatch(actions.ADD_TAGS, {
        media: [media],
        tags: ['trash']
      })
    }
  }
  const presentAction = {
    label: 'present',
    do: (index, media) => {
      window.open(media.path, '_blank')
    }
  }
  return media => {
    if (media.tags && media.tags.indexOf('trash') >= 0) {
      return [deleteAction, untrashAction].concat([presentAction])
    } else {
      return [trashAction].concat([presentAction])
    }
  }
}
export default {
  name: 'Media',
  components: {
    Gallery,
    Editor
  },
  props: {},
  data () {
    return {
      createActions: createActions(this.$store)
    }
  },
  computed: mapState({
    media: function (state) {
      return state.media[JSON.stringify(this.$route.query || {})]
    },
    selected: 'selectedMedia'
  }),
  mounted () {
    this.$store.dispatch(actions.LOAD_MEDIA, this.$route.query)
  },
  methods: {
    loadMoreMedia () {
      this.$store.dispatch(actions.LOAD_MORE_MEDIA, this.$route.query)
    },
    setSelected (selected) {
      this.$store.commit(mutations.SET_SELECTED_MEDIA, { media: selected })
    }
  },
  watch: {
    $route: function route (route) {
      this.$store.dispatch(actions.LOAD_MEDIA, route.query)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}
.gallery {
  flex: 1;
}
.editor {
  width: 250px;
}
</style>
