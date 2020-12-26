<template>
  <div>
    <div class="wrapper">
      <div v-for="value in merge" :key="value.key">
        {{ value.keyLabel }}: {{ value.value }}
      </div>
    </div>
  </div>
</template>

<script>
function nameReplacer (match, p1, offset, string) {
  if (!match) {
    return string
  }
  return ' ' + p1.toLowerCase()
}

function parseName (name) {
  return name.replace(/([A-Z])/g, nameReplacer)
}
export default {
  name: 'MetadataEditor',
  props: {
    media: Array,
    default () {
      return []
    }
  },
  data () {
    return {}
  },
  computed: {
    merge () {
      const metadatas = this.media.map(({ metadata }) => metadata)
      const keys = metadatas.reduce((keys, metadata) => {
        if (!metadata) {
          return keys
        }
        return keys.concat(Object.keys(metadata).filter(k => !!metadata[k]))
      }, [])
      const merge = metadatas.reduce((map, metadata) => {
        return keys.reduce((map, key) => {
          const value = (metadata ? metadata[key] : undefined) || undefined
          const mapObject = map[key]
          if (!mapObject) {
            map[key] = {
              key,
              keyLabel: parseName(key),
              value,
              values: [value]
            }
          } else {
            const index = mapObject.values.indexOf(value)
            mapObject.values.push(value)
            if (index < 0) {
              mapObject.value = 'multiple values'
            }
          }
          return map
        }, map)
      }, {})
      return Object.keys(merge)
        .sort()
        .map(k => merge[k])
    }
  },
  methods: {},
  watch: {}
}
</script>

<style scoped></style>
