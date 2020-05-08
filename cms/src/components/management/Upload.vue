<template>
  <div class="file-component-view">
    <!-- File Upload -->
        <div v-if="imageData!=null">
            <img class="preview" :src="picture">
        </div>
        <div class="upload-file">
            <input type="file" @change="previewImage" accept="image/*" >
        </div>   
        <div class="upload-progress" v-if="isUploading">
            <p>Progress: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>   
        <div v-if="imageData!=null">
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
        isUploading: false,
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
                    console.log(url)
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

    .file-component-view input[type="file"] {
        background-color: transparent;
        border: none;
    }
</style>