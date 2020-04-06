const axios = require('axios')
const CancelToken = axios.CancelToken

const mutations = {
  SET_STATUS_MESSAGE: 'SET_STATUS_MESSAGE',
  SET_MEDIA: 'SET_MEDIA',
  SET_TO_IMPORT: 'SET_TO_IMPORT'
}

const actions = {
  LOAD_MEDIA: 'LOAD_MEDIA',
  LOAD_TO_IMPORT: 'LOAD_TO_IMPORT'
}

const store = {
  state: {
    cache: {},
    statusMessage: 'Initialization ...',
    media: [],
    selectedMedia: [],
    toImport: [],
    selectedToImport: []
  },
  mutations: {
    [mutations.SET_STATUS_MESSAGE] (state, message) {
      state.statusMessage = message
    },
    [mutations.SET_MEDIA] (state, media) {
      state.media = media
    },
    [mutations.SET_TO_IMPORT] (state, toImport) {
      state.toImport = toImport
    }
  },
  actions: {
    [actions.LOAD_MEDIA] ({ state, commit }) {
      const cacheId = actions.LOAD_MEDIA
      const cancelToken = createCancelToken(cacheId, state)
      if (!cancelToken) {
        return
      }
      commit(mutations.SET_STATUS_MESSAGE, 'media loading ...')
      axios
        .get('/backend/api/media/', { cancelToken })
        .then(response => {
          const media = response.data.map(media => {
            media.path = '/backend' + media.filePath
            return media
          })
          commit(mutations.SET_STATUS_MESSAGE, 'media loaded')
          commit(mutations.SET_MEDIA, media)
        })
        .catch(error => {
          invalidCache(cacheId, state)
          console.log(error)
        })
    },
    [actions.LOAD_TO_IMPORT] ({ state, commit }) {
      const cacheId = actions.LOAD_TO_IMPORT
      const cancelToken = createCancelToken(cacheId, state)
      if (!cancelToken) {
        return
      }
      commit(mutations.SET_STATUS_MESSAGE, 'to-import loading ...')
      axios
        .get('/backend/api/to-import/')
        .then(response => {
          const media = response.data.map(media => {
            media.path = '/backend' + media.filePath
            return media
          })
          commit(mutations.SET_STATUS_MESSAGE, 'to-import loaded')
          commit(mutations.SET_TO_IMPORT, media)
        })
        .catch(error => {
          invalidCache(cacheId, state)
          console.log(error)
        })
    }
  }
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
