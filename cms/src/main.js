import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import vueHeadful from 'vue-headful';

// Routing
import router from './router'

// Icons
import Unicon from 'vue-unicons'
import { uniCube, uniLayerGroup, uniWindowRestore, uniCog, uniImages, uniUsersAlt, uniCommentAltExclamation, uniListUl, uniBitcoinCircle, uniUserSquare, uniAngleDown, uniImagePlus, uniPlusCircle, uniText, uniLink, uniTimes } from 'vue-unicons/src/icons'

Unicon.add([uniCube, uniLayerGroup, uniWindowRestore, uniCog, uniImages, uniUsersAlt, uniCommentAltExclamation, uniListUl, uniBitcoinCircle, uniUserSquare, uniAngleDown, uniImagePlus, uniPlusCircle, uniText, uniLink, uniTimes])
Vue.use(Unicon)

// Firebase
import VueFirestore from 'vue-firestore';
Vue.use(VueFirestore);

Vue.config.productionTip = false

Vue.component('vue-headful', vueHeadful);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')