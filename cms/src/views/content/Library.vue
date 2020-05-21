<template>
  <div class="library-view" :class="{ active: sidemenu }">
    <vue-headful :title="'Image Library - Control Seat CMS'"/>
    <Menu></Menu>
    <div class="content">
        <ImageLibrary></ImageLibrary>
    </div>
    <div class="version">Control Seat Alpha 0.4.5</div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import Upload from '@/components/management/Upload.vue'
import ImageLibrary from '@/components/management/ImageLibrary.vue'
import { db, storageRef } from '../../firebase/db.js'


let getImages = [];

export default {
  name: 'FileUpload',
  components: {
    Menu, Upload, ImageLibrary
  },
  data () {
      return {
          images: getImages,
          sidemenu: false
      }
  },
}
</script>

<style>
    .library-view {
      min-height: calc(100vh - 35px);
      display: flex;
    }
    .library-view .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
        min-height: 100vh;
    }

    /* High resolution */
    @media screen and (max-width: 1500px) {
    }
    
    /* Laptop-sized */
    @media screen and (max-width: 1280px) {
    }

    /* Desktop to iPad size */
    @media screen and (max-width: 991px) {
    }

    /* Mobile starts */
    @media screen and (max-width: 767px) {
        html .image-library {
          grid-template-columns: repeat(1, 1fr);
          max-width: none;
          padding-left: 30px;
          padding-right: 30px;
        }
        html .image-library figure {
          display: block;
        }

        html .image-library figure img {
          width: 100px;
          max-width: none;
        }
        html .library-view .content {
          padding-left: 0;
          padding-right: 0;
          height: 100%;
          max-width: 100%;
          margin-left: 0;
          transition: margin 0.3s ease-in-out;
        }

        html .library-view.active .content {
          margin-left: 250px;
        } 

        html .library-view {
          min-height: initial;
          overflow: scroll;
        }
        html .library-view .content > div {
          float: left;
          width: 100%;
        }
    }

    /* Small Mobile */
    @media screen and (max-width: 540px) {

    }
</style>