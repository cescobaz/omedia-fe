<template>
  <div class="full-size">
    <div class="wrapper">
      <div class="gallery">
        <div v-for="(m, index) in media" :key="m.path" class="box">
          <div
            class="box-centered"
            @click="toggleSelection(index, m)"
            :class="{ inverted: selections.indexOf(m.path) >= 0 }"
          >
            <img :src="m.path" :class="imgClass(m)" />
          </div>
          <ToolBar :actions="actions" :value="m" class="toolbar" />
        </div>
      </div>
      <ToolBar :label="toolbarLabel" :actions="selectionActions" />
    </div>
  </div>
</template>

<script>
import ToolBar from './ToolBar.vue'
export default {
  name: 'Gallery',
  props: {
    media: Array,
    selected: Function,
    actions: Array
  },
  components: {
    ToolBar
  },
  data () {
    return {
      selections: [],
      selectionActions: [
        {
          label: 'deselect',
          do: () => {
            this.$data.selections = []
          }
        },
        { label: 'delete', do: console.log },
        { label: 'present', do: console.log }
      ]
    }
  },
  computed: {
    toolbarLabel () {
      return `selected ${this.$data.selections.length} media`
    }
  },
  methods: {
    toggleSelection (index, media) {
      const sIndex = this.$data.selections.indexOf(media.path)
      if (sIndex >= 0) {
        this.$data.selections.splice(sIndex, 1)
      } else {
        this.$data.selections.push(media.path)
      }
    },
    imgClass (media) {
      if (media && media.metadata && media.metadata.orientation) {
        return `img-orientation-${media.metadata.orientation}`
      }
      return ''
    }
  },
  watch: {
    selections (value) {
      if (this.selected) {
        this.selected(value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.gallery {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
}
.toolbar {
  display: none;
  position: absolute;
  width: 100%;
  padding: 0;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.box:hover .toolbar {
  display: block;
}
.box {
  height: 300px;
  width: 300px;
  position: relative;
  font-size: 150%;
  margin: 16px;
  padding: 0;
}
.box-centered {
  padding: 2px;
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box img {
  max-height: 100%;
  max-width: 100%;
}
</style>
