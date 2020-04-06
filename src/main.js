import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import Media from './components/Media.vue'
import ToImport from './components/ToImport.vue'
import Upload from './components/Upload.vue'

import { store } from './store'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)

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
  store: new Vuex.Store(store)
}).$mount('#app')
