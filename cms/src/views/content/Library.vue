<template>
  <div class="library-view">
    <Menu></Menu>
    <div class="content">
        <ImageLibrary></ImageLibrary>
    </div>
    <div class="version">Control Seat Alpha 0.4.2</div>
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
          images: getImages
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
</style>