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
    return { merge: [] }
  },
  computed: {},
  methods: {},
  watch: {
    media (media) {
      const merge = media
        .map(({ metadata }) => metadata)
        .reduce((map, metadata) => {
          return Object.keys(metadata).reduce((map, key) => {
            const value = metadata[key]
            const mapObject = map[key]
            const mapValue = mapObject ? mapObject.value : undefined
            if (!mapObject || mapValue === null || mapValue === undefined) {
              map[key] = {
                key,
                keyLabel: parseName(key),
                value,
                values: [value]
              }
            } else if (mapObject.values > 1) {
              mapObject.values.push(value)
              mapObject.value = 'multiple values'
            } else if (
              value !== null &&
              value !== undefined &&
              value !== mapValue
            ) {
              mapObject.values.push(value)
              mapObject.value = 'multiple values'
            }
            return map
          }, map)
        }, {})
      this.$data.merge = Object.keys(merge)
        .sort()
        .map(k => merge[k])
    }
  }
}
</script>

<style scoped></style>
