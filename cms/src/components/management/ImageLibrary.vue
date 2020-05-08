<template>
    <div>
        <!-- File Upload -->
        <upload></upload>
        <div class="image-library">
            <figure v-for="image in images">
                <img v-bind:src="image.path" />
            </figure>
        </div>
    </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import Upload from '@/components/management/Upload.vue'
import { db, storageRef } from '../../firebase/db.js'


let getImages = [];

export default {
  name: 'ImageLibrary',
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
        
        // This check prevents duplicate content, we only want to retrieve data if there's nothing in our object
        if(getImages.length == 0) {
            listRef.listAll().then(function(res) {
                res.items.forEach(function(itemRef) {
                    let imageName = itemRef.name
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

    onUpload(){
        // Show progress bar
        this.isUploading = true
        
        // Reset preview
        this.picture = null;

        // Set reference for upload
        const uploadRef = storageRef.ref(`images/${this.imageData.name}`).put(this.imageData);
            
        // Upload then get URL for preview
        uploadRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                uploadRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.picture = url;
                });
            }      
        );
    } 
  },
  mounted() {
    this.RetrieveImages()
  }
}
</script>

<style>
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
        border: 2px solid #CCC;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-library img {
        max-width: 100%;
    }
</style>