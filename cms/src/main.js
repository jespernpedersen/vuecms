import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import Unicon from 'vue-unicons'
import { uniLayerGroupMonochrome, uniCarWash } from 'vue-unicons/src/icons'

Unicon.add([uniLayerGroupMonochrome, uniCarWash])
Vue.use(Unicon)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')