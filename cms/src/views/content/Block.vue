<template>
  <div class="blocks-view">
    <Menu></Menu>
    <div class="content">

        <div class="fluid container">
            <div class="block" v-bind:class="{ saved: block.saved}" >
                <div class="section-toolbar">
                    <li>Visibility State: <input v-model="block.published" type="checkbox" @change="notifyChanges()"><span v-if="block.published">Published</span><span v-if="!block.published">Unpublished</span></li>
                </div>
                <section v-bind:class="{ disabled: !block.published }" v-bind:style="{ backgroundColor: block.bgcolor, color: block.textcolor }">
                    <h2 v-if="block.showtitle">{{ block.title }}</h2>     
                    <div v-for="element in block.elements" :key="element.id" style="text-align: left">
                        <ElementText 
                            v-if="element.type == 'text'" 
                            :elementid="element.id" 
                            :blockid="block.id" 
                            :text="element.text" 
                        >
                        </ElementText>
                        <ElementButton 
                            v-if="element.type == 'button'" 
                            :elementid="element.id" 
                            :blockid="block.id" 
                            :text="element.button_text" 
                            :link="element.button_link"
                        >
                        </ElementButton>
                        <ElementImage
                          v-if="element.type == 'image'"
                          :elementid="element.id"
                          :blockid="block.id"
                          :path="element.image_path"
                          :name="element.name"
                        >
                        </ElementImage>
                    </div>
                </section>
                <div class="new-elements" :class="{ active: activeElementSelection}">
                    <button class="add-element" @click="showElementLibrary()"><unicon name="plus-circle" />Add New Element</button>
                    <div class="element-library">
                        <button @click="AddElement(block.id, 'text')"><unicon name="text" />Paragraph Text</button>
                        <button @click="AddElement(block.id, 'button')"><unicon name="link" />Button Link</button>
                        <button @click="AddElement(block.id, 'image')"><unicon name="image-plus" />Image</button>
                    </div>
                </div>
                <div v-bind:class="{ active: unsavedChanges}">
                    <div class="notification">
                        <h3 style="text-align: center;">You've unsaved changes!</h3>
                        <button type="button" class="btn btn-default" @click="SaveBlock(block)">Save Block</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <aside class="global-settings">
        <h2>Block Settings</h2>
        <ul> 
            <li>Block Title: <input v-model="block.title" type="text" @change="notifyChanges()"/></li>
            <li>Block Type: 
              <select v-model="block.blocktype" @change="notifyChanges()">
                <option value="content">Content</option>
                <option value="header">Header</option>
                <option value="footer">Footer</option>
              </select></li>
            <li>Show Title on Block <input v-model="block.showtitle" type="checkbox" @change="notifyChanges()"></li>
            <li>Background Color: {{ block.bgcolor }} <input v-model="block.bgcolor" type="color" @change="notifyChanges()"/></li>
            <li>Container: <input v-model="block.container" type="checkbox" @change="notifyChanges()"></li>
            <li>Text Color: {{ block.textcolor }} <input v-model="block.textcolor" type="color" @change="notifyChanges()"/></li>
        </ul>
    </aside>
  <Modal v-if="showModal">
    <h3 slot="header">{{ modalheader }}</h3>
    <div slot="body">
      <Upload></Upload>
      <div class="image-library">
        <figure v-for="(image, i) in images" :key="i" >
          <img @click="SelectImage(image.path, image.name)" v-bind:src="image.path" :title="image.name" />
        </figure>
      </div>
    </div>
  </Modal> 
  <div class="version">Control Seat Alpha 0.4.5</div>
  </div>
  
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db, blocksRef, storageRef } from '../../firebase/db.js'

// Helpers
import Modal from '@/components/management/helper/Modal.vue'

// Elements
import ElementText from '@/components/management/elements/Text.vue'
import ElementButton from '@/components/management/elements/Button.vue'
import ElementImage from '@/components/management/elements/Image.vue'
import Upload from '@/components/management/Upload.vue'

let getImages = [];

export default {
  name: 'Block',
  components: {
    Menu, ElementText, ElementButton, ElementImage, Modal, Upload
  },
  data () {
    return {
      block: [],
      unsavedChanges: false,
      activeElementSelection: false,
      showImageLibrary: null,
      showModal: false,
      images: getImages,
    }
  },
  methods: {
      async showElementLibrary(i) {
        this.activeElementSelection = true
      },
      notifyChanges() {
          this.unsavedChanges = true
      },
      async SaveBlock(block) {
        // Firebase wants document ref always to be a string, so we will need to convert it
        let blockId = String(block.id)

        // Construct what we want to be able to change/update
        blocksRef.doc(blockId).update({
             bgcolor: block.bgcolor,
             blocktype: block.blocktype,
             bgimage: block.bgimage,
             columns: block.columns,
             published: block.published,
             title: block.title,
             container: block.container,
             textcolor: block.textcolor,
             elements: block.elements
        })
        // We want to hide the notification of unsaved changes when we have saved to database
        this.unsavedChanges = false
      },
      async AddElement(blockid, elementtype) {
        // Get Section we're adding to
        let section = this.block
        if(section.elements.length == 0) {
          let elementID = 0
          this.ElementTemplate(elementID, elementtype, section)
        }
        else {
          console.log(elementID)
          let elementID = section.elements[section.elements.length - 1].id + 1
          this.ElementTemplate(elementID, elementtype, section)
        }
        // Here we got the different element types
        this.notifyChanges()
      },
      ElementTemplate(elementID, elementtype, section) {
          if(elementtype == "text") {
            let element = {
              id: elementID,
              type: "text",
              text: ""
            }
            section.elements.push(element)
          }
          if(elementtype == "button") {
            let element = {
              id: elementID,
              type: "button",
              button_text: "Button Text",
              button_link: "where-should-this-go"
            }
            section.elements.push(element)
          }
          else if(elementtype == "image") {
              this.newelementID = elementID
              this.modalheader = "Image Library"
              this.showModal = true;
              this.SelectedSection = section;
              this.RetrieveImages()
          }
      },
      async SelectImage(path, title) {
        let element = {
          id: this.newelementID,
          type: "image",
          name: title,
          image_path: path
        }
        this.block.elements.push(element)
        this.showModal = false
        
      },
      async RetrieveImages() {
          let getImages = [];
          // Create a reference under which you want to list
          var listRef = storageRef.ref('images');
              
          // This check prevents duplicate content, we only want to retrieve data if there's nothing in our object
          if(getImages.length == 0) {
            listRef.listAll().then((res) => {
                  res.items.forEach((itemRef) => {
                    let imageName = itemRef.name
                    listRef.child(imageName).getDownloadURL().then((url) => {
                      let imageArray = {
                        name: imageName,
                        path: url
                      }
                      this.images.push(imageArray)
                    });
                  });
              }).catch(function(error) {
                // Uh-oh, an error occurred!
                console.log(error)
              })
          }
      },
  },
  firestore() {
    return {
      block: blocksRef.doc(this.$router.app._route.params.id),
    }
  },
}
</script>

<style>
    .blocks-view {
        min-height: 100vh;
        display: flex;
        padding-top: 34px;
    }
    .blocks-view .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
    }
    .blocks-view section {
        padding: 30px;
        text-align: left;
        color: #FFF;
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

/* Toolbar */


    .section-toolbar {
      list-style: none;
    }

    .section-toolbar li {
      display: inline-block;
    }
        .section-toolbar li:not(:first-of-type) {
      margin-left: 30px;
    }

/* Element Library */

    .new-elements {
      height: 51px;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 1);     
      transition: 0.3s ease-in-out;
    }

    .new-elements.active {
      height: 118px;
      padding-top: 10px;
      padding-bottom: 30px;
    }
    .add-element {
      border: none;
      color: #000;
      width: 100%;
      padding: 12px 0;
      background-color: transparent;
      outline: none;
    }
    
    .new-elements .element-library {
      text-align: center;
    }
    .new-elements .element-library button {
      background-color: transparent;
      border: none;
      color: #FFF;
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 5px 20px;
      border-radius: 20px;
      outline: none;
      cursor: pointer;
    }

    .new-elements .element-library button + button {
      margin-left: 15px;
    }

    .new-elements .element-library .unicon {
      fill: #FFF;
      vertical-align: middle;
      margin-right: 6px;
    }

    .add-element .unicon {
      vertical-align: middle;
      color: #000;
      fill: #000;
      margin-right: 10px;
    }

    .add-element:before,
    .add-element:after {
      content: "";
      height: 2px;
      background-color: #000;
      vertical-align: middle;
      display: inline-block;
      width: 30%;
      margin-right: 15px;
    }
    .add-element:after {
      margin-right: 0;
      margin-left: 15px;
    }
        .image-library {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 30px;
      max-height: 70vh;
      overflow-y: scroll;
      padding-right: 15px;
    }

    .image-library figure {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #CCC;
      padding: 8px;
      cursor: pointer;
    }
    .image-library img {
      max-width: 100%;
    }
</style>
