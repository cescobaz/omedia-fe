<template>
  <div>
    <EditorObject class="editor" :value="merge" />
    <EditorArrayChips :media="media" />
  </div>
</template>

<script>
import EditorObject from './EditorObject'
import EditorArrayChips from './EditorArrayChips'

function nameReplacer (match, p1, offset, string) {
  if (!match) {
    return string
  }
  return ' ' + p1.toLowerCase()
}

function parseName (name) {
  return name.replace(/([A-Z])/g, nameReplacer)
}
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
  const result = {
    name,
    value,
    displayName: parseName(name),
    component: componentFromValue(object)
  }
  Object.keys(object)
    .sort()
    .forEach(function (key) {
      const value = object[key]
      const component = componentFromValue(value)
      const mustParseValue =
        component === 'EditorObject' || component === 'EditorArray'
      const index = result.value.findIndex(v => v.name === key)
      if (index < 0) {
        if (mustParseValue) {
          result.value.push(parseObject(value, key))
        } else {
          result.value.push({
            name: key,
            value,
            displayName: parseName(key),
            component
          })
        }
        return
      }
      const attribute = result.value[index]
      if (mustParseValue) {
        if (!Array.isArray(attribute.value) || !attribute.value) {
          console.log('non è un array: ', attribute.value)
          attribute.value = []
        }
        result.value[index] = parseObject(value, key, attribute.value)
        return
      }
      if (attribute.value !== value) {
        if (Array.isArray(attribute.value)) {
          attribute.value.forEach(v => (v.value = '--multiple values--'))
        } else {
          attribute.value = 'multiple values'
        }
        attribute.multipleValues = true
      }
      attribute.component = attribute.component || component
    })
  return result
}
function isEmptyValue (value) {
  return (
    !value.component ||
    !value.value ||
    (Array.isArray(value.value) && value.value.length === 0)
  )
}
function isNotEmptyValue (object) {
  return !isEmptyValue(object)
}
function discardEmptyValue (object) {
  if (isEmptyValue(object)) {
    return null
  }
  if (Array.isArray(object.value)) {
    object.value.forEach(discardEmptyValue)
    const values = object.value.filter(isNotEmptyValue)
    object.value = values
    if (values.length === 0) {
      return null
    }
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

function defaultMerge (count = '') {
  return { name: 'media ' + count, value: [] }
}

export default {
  name: 'Editor',
  components: { EditorObject, EditorArrayChips },
  props: {
    media: Array
  },
  data () {
    return {}
  },
  computed: {
    merge () {
      const count = this.media.length
      const merge = this.media
        .map(cleanMedia)
        .reduce(({ name, value }, media) => {
          return parseObject(media, name, value)
        }, defaultMerge(count))
      return discardEmptyValue(merge) || defaultMerge(count)
    }
  },
  methods: {},
  watch: {}
}
</script>

<style scoped>
.editor {
  padding: 2px;
  margin: 0;
  overflow: scroll;
}
</style>
