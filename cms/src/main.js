import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// File Library
import UploadImage from 'vue-upload-image';

// Routing
import router from './router'

// Icons
import Unicon from 'vue-unicons'
import { uniCube, uniLayerGroup, uniWindowRestore, uniCog, uniImages, uniUsersAlt, uniCommentAltExclamation, uniListUl, uniBitcoinCircle, uniUserSquare, uniAngleDown, uniAngleUp } from 'vue-unicons/src/icons'

Unicon.add([uniCube, uniLayerGroup, uniWindowRestore, uniCog, uniImages, uniUsersAlt, uniCommentAltExclamation, uniListUl, uniBitcoinCircle, uniUserSquare, uniAngleDown, uniAngleUp])
Vue.use(Unicon)

// Firebase
import VueFirestore from 'vue-firestore';
Vue.use(VueFirestore);

// File Library
Vue.component('upload-image', UploadImage)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    components: {
        UploadImage
    }
}).$mount('#app')