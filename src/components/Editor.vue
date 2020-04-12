<template>
  <div>
    <EditorObject class="editor" :value="merge" />
  </div>
</template>

<script>
import EditorObject from './EditorObject'

function componentFromValue (value) {
  if (value === null || value === undefined) {
    return null
  }
  if (Array.isArray(value)) {
    return 'EditorObject'
  }
  if (typeof value === 'object') {
    return 'EditorObject'
  }
  return 'EditorString'
}
function parseObject (object, name, value = []) {
  const result = { name, value, component: componentFromValue(object) }
  Object.keys(object).forEach(function (key) {
    const value = object[key]
    const component = componentFromValue(value)
    const mustParseValue =
      component === 'EditorObject' || component === 'EditorArray'
    const index = result.value.findIndex(v => v.name === key)
    if (index < 0) {
      if (mustParseValue) {
        result.value.push(parseObject(value, key))
      } else {
        result.value.push({ name: key, value, component })
      }
      return
    }
    const attribute = result.value[index]
    if (mustParseValue) {
      result.value[index] = parseObject(value, key, attribute.value)
      return
    }
    if (attribute.value !== value) {
      attribute.value = 'multiple values'
      attribute.multipleValues = true
    }
    attribute.component = attribute.component || component
  })
  return result
}
function discardNullComponent (object) {
  if (!object.component) {
    return null
  }
  if (Array.isArray(object.value)) {
    const values = object.value.filter(v => !!v.component)
    values.forEach(discardNullComponent)
    object.value = values
  }
  return object
}
function cleanMedia (media) {
  return {
    ...media,
    thumbnails: undefined,
    id: undefined,
    filePath: undefined,
    path: undefined
  }
}

function defaultMerge () {
  return { name: 'Media', value: [] }
}

export default {
  name: 'Editor',
  components: { EditorObject },
  props: {
    media: Array
  },
  data () {
    return {}
  },
  computed: {
    merge () {
      const merge = this.media
        .map(cleanMedia)
        .reduce(({ name, value }, media) => {
          return parseObject(media, name, value)
        }, defaultMerge())
      return discardNullComponent(merge) || defaultMerge()
    }
  },
  methods: {},
  watch: {}
}
</script>

<style scoped>
.editor {
  overflow: scroll;
}
</style>
