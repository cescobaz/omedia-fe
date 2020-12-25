const axios = require('axios')
const CancelToken = axios.CancelToken

const mutations = {
  SET_STATUS: 'SET_STATUS',
  TRIGGER_MEDIA: 'TRIGGER_MEDIA',
  SET_MEDIA: 'SET_MEDIA',
  APPEND_MEDIA: 'APPEND_MEDIA',
  UPDATE_MEDIA: 'UPDATE_MEDIA',
  SET_TO_IMPORT: 'SET_TO_IMPORT',
  SET_TAGS: 'SET_TAGS',
  ADD_TAGS: 'ADD_TAGS',
  DELETE_TAG: 'DELETE_TAG'
}

const actions = {
  LOAD_MEDIA: 'LOAD_MEDIA',
  LOAD_MORE_MEDIA: 'LOAD_MORE_MEDIA',
  DELETE_MEDIA: 'DELETE_MEDIA',
  LOAD_TO_IMPORT: 'LOAD_TO_IMPORT',
  IMPORT_MEDIA: 'IMPORT_MEDIA',
  LOAD_TAGS: 'LOAD_TAGS',
  ADD_TAGS: 'ADD_TAGS',
  DELETE_TAG: 'DELETE_TAG'
}

const store = {
  state: {
    cache: {},
    status: { message: 'Initialization ...' },
    media: {},
    mediaMap: {},
    selectedMedia: [],
    toImport: [],
    selectedToImport: [],
    tags: []
  },
  mutations: {
    [mutations.SET_STATUS] (state, { message }) {
      state.status = { message: `${new Date().toLocaleString()} | ${message}` }
    },
    [mutations.TRIGGER_MEDIA] (state, { media, id }) {
      state.media = { ...state.media }
    },
    [mutations.UPDATE_MEDIA] (state, { media }) {
      updateMediaMap(state, { media })
    },
    [mutations.SET_MEDIA] (state, { media, id }) {
      updateMediaMap(state, { media })
      const refMedia = media.map(m => state.mediaMap[m.id])
      state.media = { ...state.media, [id]: refMedia }
    },
    [mutations.APPEND_MEDIA] (state, { media, id }) {
      updateMediaMap(state, { media })
      const mediaList = state.media[id] || []
      media.forEach(m => mediaList.push(state.mediaMap[m.id]))
      state.media = { ...state.media, [id]: mediaList }
    },
    [mutations.SET_TO_IMPORT] (state, { media }) {
      state.toImport = media
    },
    [mutations.SET_TAGS] (state, tags) {
      state.tags = tags.sort((a, b) => a.tag - b.tag)
    }
  },
  actions: {
    [actions.LOAD_MEDIA] (context, query) {
      const mediaId = JSON.stringify(query || {})
      return getGenericMedia(context, {
        id: actions.LOAD_MEDIA + mediaId,
        promise: cancelToken => axios.get('backend/api/media/', { params: { ...query, offset: 0, limit: 25 }, cancelToken }),
        resultMutations: { mutation: mutations.SET_MEDIA, arg: { id: mediaId } },
        loadingMessage: 'media loading ...',
        loadedMessage: 'media loaded'
      })
    },
    [actions.LOAD_MORE_MEDIA] (context, query) {
      const mediaId = JSON.stringify(query || {})
      const mediaList = context.state.media[mediaId]
      const offset = mediaList ? mediaList.length : 0
      return getGenericMedia(context, {
        id: actions.LOAD_MORE_MEDIA + mediaId + offset,
        promise: cancelToken => axios.get('backend/api/media/', { params: { ...query, offset, limit: 25 }, cancelToken }),
        resultMutations: { mutation: mutations.APPEND_MEDIA, arg: { id: mediaId } },
        loadingMessage: 'media loading ...',
        loadedMessage: 'media loaded'
      })
    },
    [actions.LOAD_TO_IMPORT] (context) {
      return getGenericMedia(context, {
        id: actions.LOAD_TO_IMPORT,
        promise: cancelToken => axios.get('backend/api/to-import/', { cancelToken }),
        resultMutations: { mutation: mutations.SET_TO_IMPORT },
        loadingMessage: 'to-import loading ...',
        loadedMessage: 'to-import loaded'
      })
    },
    [actions.DELETE_MEDIA] ({ state, commit }, { id }) {
      commit(mutations.SET_STATUS, { message: 'deleting media ...' })
      return axios
        .delete(`/backend/api/media/${id}`)
        .then(() => {
          const index = state.media.findIndex(m => m.id === id)
          if (index >= 0) {
            const newMedia = [...state.media]
            newMedia.splice(index, 1)
            commit(mutations.TRIGGER_MEDIA)
            commit(mutations.SET_STATUS, { message: 'deleted media' })
          }
        })
        .catch(error => {
          commit(mutations.SET_STATUS, { message: error })
          console.log(error)
        })
    },
    [actions.IMPORT_MEDIA] ({ state, commit }, media) {
      commit(mutations.SET_STATUS, { message: `importing ${media.length} media ...` })
      return axios
        .post('/backend/api/media/', media.map(m => m.filePath))
        .then(response => {
          const indexes = []
          response.data.forEach(result => {
            if (result.result !== 'ok') {
              return
            }
            const index = state.toImport.findIndex(m => m.filePath === result.toImport)
            if (index < 0) {
              return
            }
            indexes.push(index)
          })
          if (indexes.length === 0) {
            commit(mutations.SET_STATUS, { message: `imported 0/${media.length} media` })
            return
          }
          const newMedia = [...state.toImport]
          indexes.forEach(index => {
            newMedia.splice(index, 1)
          })
          commit(mutations.SET_TO_IMPORT, { media: newMedia })
          commit(mutations.SET_STATUS, { message: `imported ${indexes.length}/${media.length} media` })
          invalidCache(actions.LOAD_MEDIA, state)
        })
        .catch(error => {
          commit(mutations.SET_STATUS, { message: error })
          console.log(error)
        })
    },
    [actions.LOAD_TAGS] ({ state, commit }) {
      const id = actions.LOAD_TAGS
      const cancelToken = createCancelToken(id, state, 0)
      if (!cancelToken) {
        return
      }
      commit(mutations.SET_STATUS, { message: 'loading tags ...' })
      return axios.get('backend/api/media/tags/', { cancelToken })
        .then(response => {
          commit(mutations.SET_TAGS, response.data)
          commit(mutations.SET_STATUS, { message: 'tags loaded' })
        })
        .catch(error => {
          invalidCache(id, state)
          commit(mutations.SET_STATUS, { message: error })
          console.log(error)
        })
    },
    [actions.ADD_TAGS] ({ state, commit, dispatch }, { media, tags }) {
      commit(mutations.SET_STATUS, { message: 'adding tags ...' })
      return axios.post('backend/api/media/tags', { media: media.map(m => m.id), tags: tags })
        .then(({ data }) => {
          normalizeMediaArray(data)
          commit(mutations.UPDATE_MEDIA, { media: data })
          commit(mutations.SET_STATUS, { message: 'tags added' })
          dispatch(actions.LOAD_TAGS)
          return data
        })
        .catch(error => {
          commit(mutations.SET_STATUS, { message: error })
          console.log(error)
          return Promise.reject(error)
        })
    },
    [actions.DELETE_TAG] ({ state, commit, dispatch }, { media, tag }) {
      commit(mutations.SET_STATUS, { message: 'removing tags ...' })
      return axios.delete('backend/api/media/tags/', { data: { media: media.map(m => m.id), tags: [tag] } })
        .then(({ data }) => {
          normalizeMediaArray(data)
          commit(mutations.UPDATE_MEDIA, { media: data })
          commit(mutations.SET_STATUS, { message: 'tags removed' })
          dispatch(actions.LOAD_TAGS)
          return data
        })
        .catch(error => {
          commit(mutations.SET_STATUS, { message: error })
          console.log(error)
          return Promise.reject(error)
        })
    }
  }
}

function updateMediaMap (state, { media }) {
  state.mediaMap = media.reduce((map, m) => {
    if (!m.id) {
      return map
    }
    const existingMedia = map[m.id]
    if (existingMedia) {
      Object.assign(existingMedia, m)
    } else {
      map[m.id] = m
    }
    return map
  }, { ...state.mediaMap })
}

function normalizeMedia (media) {
  media.path = 'backend/' + media.filePath
  if (Array.isArray(media.thumbnails)) {
    media.thumbnails.forEach(thumbnail => { thumbnail.path = 'backend/' + thumbnail.filePath })
  }
  if (Array.isArray(media.tags)) {
    media.tags.sort()
  }
}

function normalizeMediaArray (media) {
  media.forEach(normalizeMedia)
}

function getGenericMedia ({ state, commit }, { id, promise, resultMutations, loadingMessage, loadedMessage }) {
  const cancelToken = createCancelToken(id, state)
  if (!cancelToken) {
    return
  }
  commit(mutations.SET_STATUS, { message: loadingMessage })
  return promise(cancelToken)
    .then(response => {
      normalizeMediaArray(response.data)
      const { mutation, arg } = resultMutations
      commit(mutation, { ...arg, media: response.data })
      commit(mutations.SET_STATUS, { message: loadedMessage })
    })
    .catch(error => {
      invalidCache(id, state)
      commit(mutations.SET_STATUS, { message: error })
      console.log(error)
    })
}

function invalidCache (id, { cache }) {
  delete cache[id]
}

function createCancelToken (id, { cache }, retention = 5000) {
  const oldCache = cache[id]
  const now = new Date()
  if (oldCache) {
    if (now.getTime() - oldCache.date.getTime() <= retention) {
      return null
    }
    if (oldCache.source) {
      oldCache.source.cancel()
    }
  }
  const source = CancelToken.source()
  const newCache = {
    source,
    date: now
  }
  cache[id] = newCache
  return source.token
}

module.exports = { store, mutations, actions }
