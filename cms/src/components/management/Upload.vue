<template>
  <div class="file-component-view">
    <!-- File Upload -->
        <div class="upload-file">
            <p>Upload an image to Firebase:</p>
            <input type="file" @change="previewImage" accept="image/*" >
        </div>
        <div class="upload-progress">
            <p>Progress: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>      
        <div v-if="imageData!=null">
            <img class="preview" :src="picture">
            <br>
        <button @click="onUpload">Upload</button>
        </div>
  </div>
</template>

<script>
import { db, storageRef } from '../../firebase/db.js'
import firebase from 'firebase'

export default {
  name: 'Upload',
  components: {
  },
  data () {
    return {
        imageData: null,
        picture: null,
        uploadValue: 0,
        allImages: []
    }
  },
  methods: {
      previewImage(event) {
          this.uploadValue = 0
          this.picture = null
          this.imageData = event.target.files[0]
      },
        onUpload(){
            this.picture=null;
            const uploadRef = storageRef.ref(`${this.imageData.name}`).put(this.imageData);
            
            uploadRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                uploadRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.picture =url;
                });
            }      
            );
        }  
  },
}
</script>

<style>
    /* File Upload */
    img.preview {
        width: 200px;
    }
</style>