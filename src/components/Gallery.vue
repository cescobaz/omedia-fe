<template>
  <div class="full-size">
    <div
      unselectable="on"
      class="wrapper unselectable"
      @click="deselectAll"
      @scroll="onScroll"
    >
      <div v-for="(m, index) in media" :key="m.path" class="box">
        <div
          class="box-centered"
          @click.stop="toggleSelection(index, m, $event)"
          :class="{ inverted: isSelected(m) }"
        >
          <img :src="imgSrc(m)" :class="imgClass(m)" />
        </div>
        <ToolBar :actions="actions" :value="m" class="toolbar" />
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from './ToolBar.vue'
import medialib from '../media'
export default {
  name: 'Gallery',
  props: {
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    media: Array,
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
      ],
      scrollThreasholdNotified: false
    }
  },
  computed: {},
  methods: {
    isSelected (media) {
      return this.indexOfSelection(media) >= 0
    },
    indexOfSelection (media) {
      return this.value.findIndex(({ path }) => path === media.path)
    },
    deselectAll () {
      this.$data.selections = []
      this.selectionChanged()
    },
    select (index, media) {
      const selection = { index, media }
      this.$data.selections.push(selection)
      this.$data.selections.sort((a, b) => a.index - b.index)
      this.selectionChanged()
    },
    selectInterval (startIndex, endIndex) {
      console.log('select interval -------------', startIndex, endIndex)
      const interval = this.media
        .slice(startIndex, endIndex + 1)
        .map((media, index) => {
          return { index: index + startIndex, media }
        })
      console.log('select interval count', interval.length, interval)
      this.$data.selections = this.$data.selections.concat(interval)
      this.$data.selections.sort((a, b) => a.index - b.index)
      this.selectionChanged()
    },
    selectionChanged () {
      this.$emit(
        'input',
        this.$data.selections.map(({ media }) => media)
      )
    },
    toggleSelection (index, media, event) {
      if (event.shiftKey) {
        this.toggleIntervalSelection(index, media)
      } else if (event.metaKey || event.ctrlKey) {
        this.toggleMultipleSelection(index, media)
      } else {
        this.toggleTrivialSelection(index, media)
      }
    },
    toggleTrivialSelection (index, media) {
      this.$data.selections = [{ index, media }]
      this.selectionChanged()
    },
    toggleIntervalSelection (index, media) {
      if (this.$data.selections.length === 0) {
        this.select(index, media)
        return
      }
      if (this.isSelected(media)) {
        return
      }
      let closeSelectedMediaIndex = null
      for (const key in this.$data.selections) {
        const { index: i } = this.$data.selections[key]
        console.log('search', i)
        if (i < index) {
          closeSelectedMediaIndex = i
        } else if (i > index) {
          if (closeSelectedMediaIndex === null) {
            closeSelectedMediaIndex = i
          }
          break
        }
      }
      if (closeSelectedMediaIndex < index) {
        this.selectInterval(closeSelectedMediaIndex + 1, index)
      } else {
        this.selectInterval(index, closeSelectedMediaIndex - 1)
      }
    },
    toggleMultipleSelection (index, media) {
      const sIndex = this.indexOfSelection(media)
      if (sIndex >= 0) {
        this.$data.selections.splice(sIndex, 1)
        this.selectionChanged()
      } else {
        this.select(index, media)
      }
    },
    imgSrc: medialib.thumbnailImgSrc(256),
    imgClass: medialib.imgClass,
    onScroll (event) {
      const scroll = event.target.scrollTop / event.target.scrollTopMax
      if (this.$data.scrollThreasholdNotified) {
        if (scroll < 0.6) {
          this.$data.scrollThreasholdNotified = false
        }
        return
      }
      if (scroll > 0.7) {
        console.log('LOAD MORE')
        this.$emit('scroll-limit')
        this.$data.scrollThreasholdNotified = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
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
  height: 256px;
  width: 256px;
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
