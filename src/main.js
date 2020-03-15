import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

import Media from './components/Media.vue'
import ToImport from './components/ToImport.vue'
import Upload from './components/Upload.vue'

const router = new VueRouter({
  routes: [
    { path: "/", component: Media },
    { path: "/upload", component: Upload },
    { path: "/media", component: Media },
    { path: "/to-import", component: ToImport }
  ]
});
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
