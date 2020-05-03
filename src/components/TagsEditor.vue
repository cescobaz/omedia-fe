<template>
  <div>
    <div class="wrapper">
      <div
        class="chip background color unselectable"
        v-for="id in Object.keys(chips)"
        :key="id"
        :class="chips[id].class"
      >
        {{ id }} ({{ chips[id].count }})
        <span @click.stop="onDelete(id)">x</span>
      </div>
      <input
        v-if="media.length !== 0"
        class="chip background color unselectable"
        placeholder="tag"
        type="text"
        @keyup.enter="onEnter"
      />
    </div>
  </div>
</template>

<script>
import { actions } from '../store'
export default {
  name: 'EditorArrayChips',
  props: {
    media: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return { chips: {} }
  },
  computed: {},
  methods: {
    onEnter (event) {
      const id = event.target.value.trim()
      if (id === '') {
        return
      }
      event.target.value = ''
      const chip = this.$data.chips[id] || { id, count: 0 }
      chip.count = this.media.length
      chip.class = 'loading'
      this.$set(this.$data.chips, id, chip)
      this.$store
        .dispatch(actions.ADD_TAGS, { media: this.media, tags: [id] })
        .then(() => {
          this.$set(this.$data.chips[id], 'class', '')
        })
        .catch(() => {
          this.$set(this.$data.chips[id], 'class', 'error')
        })
    },
    onDelete (id) {
      const chip = this.$data.chips[id]
      if (!chip) {
        console.log('error', 'onDelete', `no chip for id ${id}`)
        return
      }
      this.$set(this.$data.chips[id], 'class', 'loading')
      this.$store
        .dispatch(actions.DELETE_TAG, { media: this.media, tag: id })
        .then(() => {
          this.$delete(this.$data.chips, id)
        })
        .catch(() => {
          this.$set(this.$data.chips[id], 'class', 'error')
        })
    }
  },
  watch: {
    media (media) {
      this.$data.chips = media.reduce((chips, m) => {
        const { tags } = m
        if (!Array.isArray(tags) || tags.length === 0) {
          return chips
        }
        tags.forEach(tag => {
          const chip = chips[tag] || { id: tag, count: 0 }
          chip.count += 1
          chips[tag] = chip
        })
        return chips
      }, {})
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
}
.chip {
  padding: 4px;
  margin: 0 4px 4px 0;
}
.chip span {
  margin: 4px;
  padding: 4px;
}
.wrapper input {
  min-width: 30px;
  flex-grow: 2;
}
.loading {
  color: #aaaaaa;
}
.error {
  color: #ffbbbb;
}
</style>
