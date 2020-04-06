const axios = require('axios')
const CancelToken = axios.CancelToken

const mutations = {
  SET_STATUS_MESSAGE: 'SET_STATUS_MESSAGE',
  SET_MEDIA: 'SET_MEDIA',
  SET_TO_IMPORT: 'SET_TO_IMPORT',
  SET_LOAD_MEDIA_SOURCE: 'SET_LOAD_MEDIA_SOURCE'
}

const actions = {
  LOAD_MEDIA: 'LOAD_MEDIA'
}

const store = {
  state: {
    statusMessage: 'Initialization ...',
    media: [],
    loadMediaTokenSource: null,
    selectedMedia: [],
    toImport: [],
    loadToImportToken: null,
    selectedToImport: []
  },
  mutations: {
    [mutations.SET_STATUS_MESSAGE] (state, message) {
      state.statusMessage = message
    },
    [mutations.SET_MEDIA] (state, media) {
      state.media = media
    },
    [mutations.SET_LOAD_MEDIA_SOURCE] (state, source) {
      state.loadMediaTokenSource = source
    },
    [mutations.SET_TO_IMPORT] (state, toImport) {
      state.toImport = toImport
    }
  },
  actions: {
    [actions.LOAD_MEDIA] ({ state, commit }) {
      commit(mutations.SET_STATUS_MESSAGE, 'media loading ...')
      const oldSource = state.loadMediaTokenSource
      if (oldSource) {
        oldSource.cancel()
      }
      const source = CancelToken.source()
      commit(mutations.SET_LOAD_MEDIA_SOURCE, source)
      axios
        .get('/backend/api/media/', { cancelToken: source.token })
        .then(response => {
          const media = response.data.map(media => {
            media.path = '/backend' + media.filePath
            return media
          })
          commit(mutations.SET_STATUS_MESSAGE, 'media loaded')
          commit(mutations.SET_MEDIA, media)
        })
        .catch(console.log)
    }
  }
}

module.exports = { store, mutations, actions }
