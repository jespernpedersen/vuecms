<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
        <!-- File Upload -->
        <upload></upload>
        <div class="image-library">
            <figure v-for="image in images">
                <img v-bind:src="image.path" />
            </figure>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import Upload from '@/components/management/Upload.vue'
import { db, storageRef } from '../../firebase/db.js'


let getImages = [];

export default {
  name: 'FileUpload',
  components: {
    Menu, Upload
  },
  data () {
      return {
          images: getImages
      }
  },
  methods: {
      RetrieveImages() { 
        // Create a reference under which you want to list
        var listRef = storageRef.ref('images');

        // Find all the prefixes and items.
        listRef.listAll().then(function(res) {
            res.prefixes.forEach(function(folderRef) {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            res.items.forEach(function(itemRef) {
                let imageName = itemRef.name
                // console.log(imagePath)
                listRef.child(imageName).getDownloadURL().then(function(url) {
                    let imageArray = {
                        name: imageName,
                        path: url
                    }
                    getImages.push(imageArray)
                });
            });
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log(error)
        });
      }
  },
  mounted() {
    this.RetrieveImages()
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

    .image-library {
        margin-top: 60px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        width: 100%;
        max-width: calc(100vw - 390px);
        grid-gap: 30px;
    }

    .image-library figure {
        border: 1px solid #CCC;
        padding: 8px;
    }

    .image-library img {
        max-width: 100%;
    }
</style>