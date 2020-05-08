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
                    <div class="section-toolbar">
                      <li>Visibility State: <input v-model="block.published" type="checkbox" @change="notifyChanges()"><span v-if="block.published">Published</span><span v-if="!block.published">Unpublished</span></li>
                      <li @click="EditSettings(i)">Edit Section Settings</li>
                      <li class="move">Move</li>
                      <li>Order: {{ block.order }}</li>
                    </div>
                    <section v-bind:class="{ disabled: !block.published }" v-bind:style="{ backgroundColor: block.bgcolor, color: block.textcolor }">
                        <h2 v-if="block.showtitle">{{ block.title }}</h2>
                        <textarea v-model="block.textcontent" placeholder="Type here the contents of the block" :style="{'--placeholder-color': block.textcolor }" @change="notifyChanges()">
                        </textarea>
                    </section>  
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
                </transition-group>
            </draggable>
          </div>
          
          <button class="btn" @click="AddSection(blocks)">Add New Section</button>

          
          <div v-bind:class="{ active: unsavedChanges}">
              <div class="notification">
                  <h3 style="text-align: center;">You've unsaved changes!</h3>
                  <button type="button" class="btn btn-default" @click="SavePage(blocks)">Save Page</button>
              </div>
          </div>
        </div>
      </div>
      
    
  <div class="version">Control Seat Alpha 0.4.1</div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import draggable from "vuedraggable"
import { db, pagesRef } from '../../firebase/db.js'

export default {
  name: 'Page',
  components: {
    Menu, draggable
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
    }
  },
  methods: {
      onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
      },
      async EditSettings (i) {
        this.activeSection = i;
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
          let blockID = String(block.id);

          // Construct Data to Update
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
             order: block.order        
          })
        })  
        // Hide notification once we have saved
        this.unsavedChanges = false
        // Hide Settings once we have saved
        this.activeSection = null
      },
      notifyChanges() {
          this.unsavedChanges = true
      },
      AddSection(blocks) {
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
            order: NewSectionID
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
            order: 0
            })
        }



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
      blocks: pagesRef.doc(this.$router.app._route.params.id).collection("blocks").orderBy("order")
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
        height: 200px;
        padding: 30px;
        text-align: left;
        color: #FFF;
    }

    .all-blocks section {
      margin-bottom: 15px;
    }

    .all-blocks textarea {
        width: 100%;
        background-color: transparent;
        border: none;
          --placeholder-color: #f0f;
        color: var(--placeholder-color);
        font-size: 16px;
        font-family: inherit;
        outline: none;
    }

    .all-blocks textarea::-webkit-input-placeholder {
        color: inherit !important;
    }
    
    .all-blocks textarea:-moz-placeholder { /* Firefox 18- */
        color: inherit !important;  
    }
    
    .all-blocks textarea::-moz-placeholder {  /* Firefox 19+ */
        color: inherit !important;  
    }
    
    .all-blocks textarea:-ms-input-placeholder {  
        color: inherit !important;  
    }

    .fluid.container {
    min-height: 100%;
    overflow: hidden;
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
</style>