import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// Routing
import router from './router'

// Icons
import Unicon from 'vue-unicons'
import { uniCube, uniLayerGroup, uniWindowRestore, uniCog, uniImages, uniUsersAlt, uniCommentAltExclamation, uniListUl, uniBitcoinCircle, uniUserSquare } from 'vue-unicons/src/icons'
Unicon.add([uniCube, uniLayerGroup, uniWindowRestore, uniCog, uniImages, uniUsersAlt, uniCommentAltExclamation, uniListUl, uniBitcoinCircle, uniUserSquare])
Vue.use(Unicon)

// Firebase
import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')