<template>
  <div>
    <div class="wrapper full-size">
      <div
        unselectable="on"
        class="content full-size unselectable"
        @click="deselectAll"
        @scroll.passive="onScroll"
        ref="content"
      >
        <div
          v-for="(m, index) in media"
          :key="m.id + m.path"
          class="box margin-rb selectable-color"
        >
          <div
            class="box-centered selectable-padding"
            @click.stop="toggleSelection(index, m, $event)"
            :class="{ selected: isSelected(m) }"
          >
            <img :src="imgSrc(m)" :class="imgClass(m)" />
          </div>
          <ToolBar
            :createActions="createActions"
            :value="m"
            class="toolbar"
            :class="{ selected: isSelected(m) }"
          />
        </div>
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
    createActions: Function
  },
  components: {
    ToolBar
  },
  data () {
    return {
      selections: [],
      scrollLimitInfo: {
        notified: false,
        mediaLength: -1
      }
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
      const bottomScrollSpace =
        event.target.scrollHeight -
        event.target.scrollTop -
        this.$refs.content.clientHeight * 2
      if (
        this.$data.scrollLimitInfo.notified &&
        this.$data.scrollLimitInfo.mediaLength !== this.media.length
      ) {
        this.$data.scrollLimitInfo.notified = false
      }
      if (!this.$data.scrollLimitInfo.notified && bottomScrollSpace < 0) {
        this.$data.scrollLimitInfo.notified = true
        this.$data.scrollLimitInfo.mediaLength = this.media.length
        console.log(
          'scroll-limit notified',
          JSON.stringify(this.$data.scrollLimitInfo),
          bottomScrollSpace
        )
        this.$emit('scroll-limit')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
}
.content {
  padding-left: 32px;
  width: calc(100% - 32px);
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
}
.toolbar {
  display: none;
  position: absolute;
  width: calc(100% - 8px);
  left: 4px;
  padding: 0;
  margin: 0;
  bottom: 0;
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
  padding: 0;
}
.box-centered {
  height: calc(100% - 16px);
  width: calc(100% - 16px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box img {
  max-height: 100%;
  max-width: 100%;
}
</style>
