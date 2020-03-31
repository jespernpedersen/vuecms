import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Unicon from 'vue-unicons'
import { uniCube, uniLayerGroup, uniWindowRestore, uniCog } from 'vue-unicons/src/icons'

Unicon.add([uniCube, uniLayerGroup, uniWindowRestore, uniCog])
Vue.use(Unicon)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')