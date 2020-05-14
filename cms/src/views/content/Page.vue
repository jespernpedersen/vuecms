<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
      <div class="fluid container">
          <div class="field">
              <label>Title</label>
              <input type="text" class="title"
              v-model="page.title" @change="notifyChanges()"
              />
          </div>
          <!-- Block System -->
          <div class="all-blocks">
            <draggable class="section-list" tag="div" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                <transition-group type="transition" :name="'flip-list'">
                  <div v-for="(block, i) in blocks" :key="i" :class="{ active: i === activeSection}">
                    <div class="block" v-bind:class="{ saved: block.saved}" >
                      <div class="section-toolbar">
                        <li>Visibility State: <input v-model="block.published" type="checkbox" @change="notifyChanges()"><span v-if="block.published">Published</span><span v-if="!block.published">Unpublished</span></li>
                        <li class="toolbar edit" @click="EditSettings(i)">Edit Section Settings</li>
                        <li class="toolbar move">Move</li>
                        <li class="toolbar delete" @click="DeleteSection(i)">Delete</li>
                        <li>Order: {{ block.order }}</li>
                      </div>
                      <div class="block-tooltip" v-if="block.saved">
                        Saved Block
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
                          <div class="new-elements" :class="{ active: i === activeElementSelection}">
                            <button class="add-element" @click="showElementLibrary(i)"><unicon name="plus-circle" />Add New Element</button>
                            <div class="element-library">
                              <button @click="AddElement(block.id, 'text')"><unicon name="text" />Paragraph Text</button>
                              <button @click="AddElement(block.id, 'button')"><unicon name="link" />Button Link</button>
                              <button @click="AddElement(block.id, 'image')"><unicon name="image-plus" />Image</button>
                            </div>
                          </div> 
                      <aside class="section-settings">
                        <div class="settings-inner">
                            <ul> 
                                <li>Block Title: <input v-model="block.title" type="text" @change="notifyChanges()"/></li>
                                <li>Show Title on Block <input v-model="block.showtitle" type="checkbox" @change="notifyChanges()"></li>
                                <li>Background Color: {{ block.bgcolor }} <input v-model="block.bgcolor" type="color" @change="notifyChanges()"/></li>
                                <li>Container: <input v-model="block.container" type="checkbox" @change="notifyChanges()"></li>
                                <li>Text Color: {{ block.textcolor }} <input v-model="block.textcolor" type="color" @change="notifyChanges()"/></li>
                            </ul>
                        </div>
                      </aside>
                    </div>
                </div>
                </transition-group>
            </draggable>
          </div>
          
          <button class="btn" @click="AddSection(blocks)">Add New Section</button>
          <button class="btn" @click="AddSavedSection(blocks)">Add Saved Section</button>
          
          <div v-bind:class="{ active: unsavedChanges}">
              <div class="notification">
                  <h3 style="text-align: center;">You've unsaved changes!</h3>
                  <button type="button" class="btn btn-default" @click="SavePage(blocks)">Save Page</button>
              </div>
          </div>
        </div>
      </div>
      
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
// Overall Components
import Menu from '@/components/management/Menu.vue'

// Data
import { db, pagesRef, blocksRef, storageRef } from '../../firebase/db.js'

// Helper frameworks
import draggable from "vuedraggable"

// Helpers
import Modal from '@/components/management/helper/Modal.vue'

// Elements
import ElementText from '@/components/management/elements/Text.vue'
import ElementButton from '@/components/management/elements/Button.vue'
import ElementImage from '@/components/management/elements/Image.vue'
import Upload from '@/components/management/Upload.vue'

let SavedBlockRef = blocksRef.where("blocktype", '==', "content")
let getImages = []

export default {
  name: 'Page',
  components: {
    Menu, draggable, Upload, ElementText, ElementButton, ElementImage, Modal
  },
  data () {
    return {
      pages: [],
      blocks: [],
      unsavedChanges: false,
      editable: true,
      isDragging: false,
      delayedDragging: false,
      activeSection: null,
      activeElementSelection: null,
      showImageLibrary: null,
      showModal: false,
      images: getImages,
      SelectedSection: null
    }
  },
  methods: {
      async showElementLibrary(i) {
        this.activeElementSelection = i
      },
      async onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
      },
      async AddElement(blockid, elementtype) {
        // Get Section we're adding to
        let section = this.blocks[blockid]

        if(section.elements.length == 0) {
          let elementID = 0
          this.ElementTemplate(elementID, elementtype, section)
        }
        else {
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
          else if(elementtype == "button") {
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
        let sectionid = this.SelectedSection.id
        let element = {
          id: this.newelementID,
          type: "image",
          name: title,
          image_path: path
        }
        this.blocks[sectionid].elements.push(element)
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
      async EditSettings(i) {
        this.activeSection = i;
      },
      async DeleteSection(blockid) {
        pagesRef.doc(this.$router.app._route.params.id).collection("blocks").doc(String(blockid)).delete()
      },
      async SavePage(blocks) {
        // Set page id
        let pageID = this.$router.app._route.params.id;

        // Update page variables
        pagesRef.doc(pageID).update({
          title: this.page.title
        })
        // Save Blocks
        blocks.forEach(function(block) {
          // Change Doc ID to String
          let blockID = String(block.id)
          // Construct Data to Update
          if(block.saved) {
            let blockID = String(block.id)
            let reference = String(block.reference)

            blocksRef.doc(String(reference)).update({
              bgcolor: block.bgcolor,
              bgimage: block.bgimage,
              published: block.published,
              title: block.title,
              showtitle: block.showtitle,
              container: block.container,
              textcolor: block.textcolor,
              elements: block.elements
            })
            pagesRef.doc(pageID).collection("blocks").doc(blockID).update({
              order: block.order
            })
          }
          else {
            pagesRef.doc(pageID).collection("blocks").doc(blockID).update({
              bgcolor: block.bgcolor,
              bgimage: block.bgimage,
              columns: block.columns,
              published: block.published,
              title: block.title,
              showtitle: block.showtitle,
              container: block.container,
              textcolor: block.textcolor,
              textcontent: block.textcontent, 
              order: block.order,
              elements: block.elements     
            })
          }
        })  
        // Hide notification once we have saved
        this.unsavedChanges = false
        // Hide Settings once we have saved
        this.activeSection = null
      },
      async notifyChanges() {
          this.unsavedChanges = true
      },
      async AddSection(blocks) {
        // New ID
        if(blocks != '') {
          let NewSectionID = blocks[blocks.length - 1].id + 1;
          // New ID as String, Firestore uses string instead of numbers as identifiers
          let NewSectionIDString = String(NewSectionID)
          // Construct data
          pagesRef.doc(this.$router.app._route.params.id).collection("blocks").doc(NewSectionIDString).set({
            id: NewSectionID,
            bgcolor: "#222",
            bgimage: "",
            blocktype: "content",
            columns: 1,
            container: true,
            published: true,
            textcolor: "#ffffff",
            title: "New Section",
            showtitle: false,
            textcontent: "",
            order: NewSectionID,
            elements: [],
            saved: false
          })
        }
        // If no sections exist
        else {         
            pagesRef.doc(this.$router.app._route.params.id).collection("blocks").doc("0").set({
            id: 0,
            bgcolor: "#222",
            bgimage: "",
            blocktype: "content",
            columns: 1,
            container: true,
            published: true,
            textcolor: "#ffffff",
            title: "New Section",
            showtitle: false,
            textcontent: "",
            order: 0,
            elements: [],
            saved: false
            })
        }
      },
      async AddSavedSection(blocks) {
        // New ID
        if(blocks != '') {
          let NewSectionID = blocks[blocks.length - 1].id + 1;
          let NewSectionIDString = String(NewSectionID)
          // Construct Saved Data
          pagesRef.doc(this.$router.app._route.params.id).collection("blocks").doc(NewSectionIDString).set({
            id: NewSectionID,
            order: NewSectionID,
            saved: true,
            reference: 7
          })
          
          this.getSavedBlocks()
        }
        // If no sections exist
        else {
          let NewSectionID = 0;
          let NewSectionIDString = String(NewSectionID)
          // Construct Saved Data
          pagesRef.doc(this.$router.app._route.params.id).collection("blocks").doc(NewSectionIDString).set({
            id: NewSectionID,
            order: NewSectionID,
            saved: true,
            reference: 7
          })
          this.getSavedBlocks()
        }
      },
      async getSavedBlocks() {
        let pageID = this.$router.app._route.params.id
        let blockRef = pagesRef.doc(pageID).collection("blocks").orderBy("order").where("saved", "==", true)
        let blocks = this.blocks
        blockRef.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(block) {
            if(block.exists) {
              // Get Data
              let defaultBlock = block.data()
              let SavedBlockRef = blocksRef.where("id", "==", defaultBlock.reference).limit(1)

              SavedBlockRef.get().then(function(subquerySnapshot) {
                subquerySnapshot.forEach(function(savedBlock) {
                  if(savedBlock.exists) {
                    // The data we got
                    // The data we will submit
                    let savedBlock_data = savedBlock.data()

                    let SavedBlockStructure = {
                      "id": defaultBlock.id,
                      "order": defaultBlock.order,
                      "saved": defaultBlock.saved,
                      "reference": defaultBlock.reference,
                      "title": savedBlock_data.title,
                      "bgcolor": savedBlock_data.bgcolor,
                      "bgimage": savedBlock_data.bgimage,
                      "blocktype": savedBlock_data.blocktype,
                      "container": savedBlock_data.container,
                      "elements": savedBlock_data.elements,
                      "published": savedBlock_data.published,
                      "showtitle": savedBlock_data.showtitle,
                      "textcolor": savedBlock_data.textcolor,
                      "title": savedBlock_data.title
                    }

                    blocks.push(SavedBlockStructure)
                  }
                })
              })
            }
          })
        })
      }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
        
        // Once have unsaved changes when we move an item, we should show the notification save box.
        this.unsavedChanges = true

        this.blocks.map(function(block, index) {
          block.order = index;
        })
      });
    }
  },
  firestore() {
    return {
      page: pagesRef.doc(this.$router.app._route.params.id),
      blocks: pagesRef.doc(this.$router.app._route.params.id).collection("blocks").orderBy("order").where("saved", "==", false)
    }
  },
  mounted() {
    this.getSavedBlocks();
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

    .blocks-view {
      flex-direction: column;
    }

    .pages-view h1 {
        text-align: left;
    }

    .v-table {
      margin-top: 30px;
    }

    .btn {
      border: 1px solid #000;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      font-weight: bold;
      background-color: #FFF;
    }

    section.disabled {
      opacity: 0.2;
    }

    .v-table .row {
      display: flex;
      justify-content: space-between;
      text-align: center;
      padding: 15px;
    }

    input[type="text"] {
      width: 100%;
    }

    .page-title {
      flex: 1 0 auto;
      text-align: left;
    }
    .select-all,
    .select,
    .page-slug,
    .page-publish,
    .page-published {
      text-align: left;
    }

    .section-toolbar {
      list-style: none;
    }

    .section-toolbar li {
      display: inline-block;
    }

    .section-toolbar li:not(:first-of-type) {
      margin-left: 30px;
    }

    .page-id {
      min-width: 2%;
    }

    .page-publish,
    .page-published {
      text-align: center;
      min-width: 10%;
    }

    .page-published span {
      width: 10px;
      height: 10px;
      background-color: black;
      border-radius: 100%;
      display: inline-block;
    }

    .page-published span.true {
      background-color: green;
    }

    .page-published span.false {
      background-color: red;
    }

    .move {
      cursor: move;
    }
    
    .select-all,
    .select {
      min-width: 8%;
    }

    .v-table .row:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    input.title {
        font-size: 40px;
        font-weight: bold;
    }

    .field {
        display: block;
        text-align: left;
        margin-bottom: 20px;
    }

    .field label {
        width: 100%;
        display: inline-block;
    }

    .all-blocks section {
        transition: 0.3s ease-in-out;
        padding: 30px;
        text-align: left;
        color: #FFF;
        width: 100%;
        float: left;
    }

    .block-tooltip {
        display: inline-block;
        float: left;
        background-color: #f8cb5d;
        color: #333;
        padding: 5px 10px;
    }

    .all-blocks .block {
      margin-bottom: 45px;
      float: left;
      width: 100%;
    }

    .fluid.container {
    min-height: 100%;
    overflow: hidden;
}

.btn + .btn {
  margin-left: 15px;
}

.notification {
    position: fixed;
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

.all-blocks {
  overflow: hidden;
}



    aside.section-settings {
        width: 300px;
        box-sizing: border-box;
        position: fixed;
        top: 0px;
        right: 0;
        height: 100%;
        overflow: hidden;
    }

    aside.section-settings input[type="text"] {
      max-width: 300px;
      -webkit-appearance: none;
      border: none;
      background-color: transparent;
    }

    aside.section-settings .settings-inner {
        background-color: #fff;
        height: 100%;
        position: relative;
        transform: translate(100%, 0);
        transition: 0.3s ease-in-out;
        
        padding-top: 30px;
    }

    .active aside.section-settings {
        z-index: 5;
    }

    .active aside.section-settings .settings-inner {
        transform: translate(0, 0);
    }



    aside.section-settings ul {
        list-style: none;
        text-align: left;
    }

    aside.section-settings ul li {
        padding: 15px 30px;
        color: #000;
        background-color: rgba(0,0,0,0.2);
    }

    aside.section-settings h2 {
        margin-bottom: 25px;
    }

    aside.section-settings ul li:nth-of-type(odd) {
        background-color: rgba(0,0,0,0.3);
    }

    .block.saved section {
      border: 5px solid #f8cb5d;
    }

    .new-elements {
      height: 51px;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 1);     
      transition: 0.3s ease-in-out;
        float: left;
      width: 100%;
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

    input.title {
      padding: 6px 12px;
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