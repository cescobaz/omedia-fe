const axios = require('axios')
const CancelToken = axios.CancelToken

const mutations = {
  SET_STATUS_MESSAGE: 'SET_STATUS_MESSAGE',
  SET_MEDIA: 'SET_MEDIA',
  SET_TO_IMPORT: 'SET_TO_IMPORT'
}

const actions = {
  LOAD_MEDIA: 'LOAD_MEDIA',
  DELETE_MEDIA: 'DELETE_MEDIA',
  LOAD_TO_IMPORT: 'LOAD_TO_IMPORT',
  IMPORT_MEDIA: 'IMPORT_MEDIA'
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
      state.statusMessage = `${new Date().toLocaleString()} - ${message}`
    },
    [mutations.SET_MEDIA] (state, media) {
      state.media = media
    },
    [mutations.SET_TO_IMPORT] (state, toImport) {
      state.toImport = toImport
    }
  },
  actions: {
    [actions.LOAD_MEDIA] (context) {
      return getGenericMedia(context, {
        id: actions.LOAD_MEDIA,
        promise: cancelToken => axios.get('/backend/api/media/', { cancelToken }),
        resultMutations: mutations.SET_MEDIA,
        loadingMessage: 'media loading ...',
        loadedMessage: 'media loaded'
      })
    },
    [actions.LOAD_TO_IMPORT] (context) {
      return getGenericMedia(context, {
        id: actions.LOAD_TO_IMPORT,
        promise: cancelToken => axios.get('/backend/api/to-import/', { cancelToken }),
        resultMutations: mutations.SET_TO_IMPORT,
        loadingMessage: 'to-import loading ...',
        loadedMessage: 'to-import loaded'
      })
    },
    [actions.DELETE_MEDIA] ({ state, commit }, { id }) {
      commit(mutations.SET_STATUS_MESSAGE, 'deleting media ...')
      return axios
        .delete(`/backend/api/media/${id}`)
        .then(() => {
          const index = state.media.findIndex(m => m.id === id)
          if (index >= 0) {
            const newMedia = [...state.media]
            newMedia.splice(index, 1)
            commit(mutations.SET_MEDIA, newMedia)
            commit(mutations.SET_STATUS_MESSAGE, 'deleted media')
          }
        })
        .catch(console.log)
    }
  }
}

function getGenericMedia ({ state, commit }, { id, promise, resultMutations, loadingMessage, loadedMessage }) {
  const cancelToken = createCancelToken(id, state)
  if (!cancelToken) {
    return
  }
  commit(mutations.SET_STATUS_MESSAGE, loadingMessage)
  return promise(cancelToken)
    .then(response => {
      const media = response.data.map(media => {
        media.path = '/backend' + media.filePath
        return media
      })
      commit(resultMutations, media)
      commit(mutations.SET_STATUS_MESSAGE, loadedMessage)
    })
    .catch(error => {
      invalidCache(id, state)
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
