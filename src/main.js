import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import Media from './components/Media.vue'
import ToImport from './components/ToImport.vue'
import Upload from './components/Upload.vue'

import { store, mutations } from './store'

import axios from 'axios'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)

const vueStore = new Vuex.Store(store)

axios.interceptors.request.use(function (config) {
  vueStore.commit(mutations.SET_LOADING, { loading: 1 })
  return config
})
axios.interceptors.response.use(function (response) {
  vueStore.commit(mutations.SET_LOADING, { loading: -1 })
  return response
}, function (error) {
  vueStore.commit(mutations.SET_LOADING, { loading: -1 })
  return Promise.reject(error)
})

const router = new VueRouter({
  routes: [
    { path: '/', component: Media },
    { path: '/upload', component: Upload },
    { path: '/media', component: Media },
    { path: '/to-import', component: ToImport }
  ]
})
new Vue({
  render: h => h(App),
  router,
  store: vueStore
}).$mount('#app')
