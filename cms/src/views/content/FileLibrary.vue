<template>
  <div class="file-library-view">
    <Menu></Menu>
    <div class="content">
        <div class="fluid-container">
            File Library
            <upload-image is="upload-image"
            :url="forms.create.url"
            :max_files="5"
            name="files[]"
            :resize_enabled="true"
            :resize_max_width="640"
            :button_html="forms.create.confirm"
            :button_class="'button is-primary'"
            v-on:upload-image-attemp="uploadImageAttempt"
            v-on:upload-image-success="uploadImageSuccess"
            v-on:upload-image-failure="uploadImageFailure"
            v-on:upload-image-loaded="uploadImageLoaded"
            v-on:upload-image-submit="uploadImageSubmit"
            v-on:upload-image-clicked="uploadImageClicked"
            v-on:upload-image-removed="uploadImageRemoved"
            ></upload-image>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db, blocksRef } from '../../firebase/db.js'
import UploadImage from 'vue-upload-image';

export default {

  name: 'FileLibrary',
  components: {
    Menu,
    UploadImage
  },
  data () {
    return {
    }
  },
  methods: {
  },
  firestore() {
    return {
    }
  },
}
</script>

<style>
    .file-library-view {
        min-height: 100vh;
        display: flex;
        padding-top: 34px;
    }
    .file-library-view .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
    }
    .blocks-view section {
        height: 200px;
        padding: 30px;
        text-align: left;
        color: #FFF;
    }

    .blocks-view textarea {
        width: 100%;
        background-color: transparent;
        border: none;
          --placeholder-color: #f0f;
        color: var(--placeholder-color);
        font-size: 16px;
        font-family: inherit;
        outline: none;
    }

    .blocks-view textarea::-webkit-input-placeholder {
        color: inherit !important;
    }
    
    .blocks-view textarea:-moz-placeholder { /* Firefox 18- */
        color: inherit !important;  
    }
    
    .blocks-view textarea::-moz-placeholder {  /* Firefox 19+ */
        color: inherit !important;  
    }
    
    .blocks-view textarea:-ms-input-placeholder {  
        color: inherit !important;  
    }

    aside.global-settings {
        min-width: 300px;
        padding-top: 30px;
        box-sizing: border-box;
    }

    aside.global-settings ul {
        list-style: none;
        text-align: left;
    }

    aside.global-settings ul li {
        padding: 15px 30px;
        color: #000;
        
        background-color: rgba(0,0,0,0.2);
    }

    aside.global-settings h2 {
        margin-bottom: 25px;
    }

    aside.global-settings ul li:nth-of-type(odd) {
        background-color: rgba(0,0,0,0.3);
    }


.fluid.container {
    min-height: 100%;
    position: relative;
    overflow: hidden;
}
.notification {
    position: absolute;
    max-width: 900px;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: -15%;
    transition: 0.3s ease-in-out;
    background-color: rgba(0,0,0,0.4);
    padding: 15px;
    border-radius: 8px;
    color: #FFF;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification .btn {
    background-color: #42b853;
    border-color: #42b853;
    padding: 5px 20px;
    font-size: 16px;
    color:  #FFF;
}

.active .notification {
    bottom: 2%;
}
</style>
