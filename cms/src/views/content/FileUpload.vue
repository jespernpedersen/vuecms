<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
        <!-- File Upload -->
        <upload></upload>
        <pre>
            {{ images }}
        </pre>
    </div>
    <div class="version">Control Seat Alpha 0.4.1</div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import Upload from '@/components/management/Upload.vue'
import { db, storageRef } from '../../firebase/db.js'

export default {
  name: 'FileUpload',
  components: {
    Menu, Upload
  },
  data () {
      return {
          images: []
      }
  },
  firestore() {
    return {
    }
  }
}
</script>

<style>
    .pages-view {
      min-height: calc(100vh - 35px);
      display: flex;
    }
    .pages-view .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
        min-height: 100vh;
    }
    .pages-view h1 {
        text-align: left;
    }
    /* File Upload */
    img.preview {
        width: 200px;
    }
</style>