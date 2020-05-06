<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
      <div class="fluid container">
          <div class="field">
              <label>Title</label>
              <input type="text" class="title"
              v-model="page.title"
              @keydown.enter="editField('title', this)"
              />
          </div>
          <!-- Block System -->
          <div class="all-blocks blocks-view"  style="text-align: left" v-for="block in blocks">
              <div class="section-toolbar">
                Visibility State: <input v-model="block.published" type="checkbox" @change="notifyChanges()"><span v-if="block.published">Published</span><span v-if="!block.published">Unpublished</span>
              </div>
              <section v-bind:style="{ backgroundColor: block.bgcolor, color: block.textcolor }">
                  <h1>
                      {{ block.title }}
                  </h1>
                  <textarea v-model="block.textcontent" placeholder="Type here the contents of the block" :style="{'--placeholder-color': block.textcolor }" @change="notifyChanges()">
                  </textarea>
              </section>
          </div>
          <div v-bind:class="{ active: unsavedChanges}">
              <div class="notification">
                  <h3 style="text-align: center;">You've unsaved changes!</h3>
                  <button type="button" class="btn btn-default" @click="SavePage(blocks)">Save Page</button>
              </div>
          </div>
          <pre>
            {{ blocks }}
          </pre>
          <button class="btn" @click="AddSection(blocks, blocks[blocks.length - 1].id)">Add New Section</button>
        </div>
    </div>
    
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db, pagesRef } from '../../firebase/db.js'

export default {
  name: 'Page',
  components: {
    Menu
  },
  data () {
    return {
      pages: [],
      blocks: [],
      unsavedChanges: false
    }
  },
  methods: {
      SavePage(blocks) {
        let pageID = this.$router.app._route.params.id;
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
             container: block.container,
             textcolor: block.textcolor,
             textcontent: block.textcontent            
          })
        })
      },
      notifyChanges() {
          this.unsavedChanges = true
      },
      editField(fieldType, field) {
        if(fieldType == "title") {
          pagesRef.doc(this.$router.app._route.params.id).update({
            title: this.page.title
          })
        }
        else if(fieldType == "content") {
          pagesRef.doc(this.$router.app._route.params.id).update({
            content: this.page.content
          })
        }
        else {
            alert("Error. Could not find field");
        }
      },
      AddSection(blocks, lastkey) {
        

          console.log(this.$router.app._route.params.id)
        /*
        pagesRef.doc(this.$router.app._route.params.id).collection("blocks").doc("2").set({
          id: 2,
          bgcolor: "#222",
          bgimage: "",
          blocktype: "content",
          columns: 1,
          container: true,
          published: true,
          textcolor: "#ffffff",
          title: "New Section"
        })
        */
      }
  },
  firestore() {
    return {
      page: pagesRef.doc(this.$router.app._route.params.id),
      blocks: pagesRef.doc(this.$router.app._route.params.id).collection("blocks")
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

    .blocks-view section {
        height: 200px;
        padding: 30px;
        text-align: left;
        color: #FFF;
    }

    .blocks-view section {
      margin-bottom: 15px;
    }

    .blocks-view textarea {
        width: 100%;
        background-color: transparent;
        border: none;
          --placeholder-color: #f0f;
        color: var(--placeholder-color);
        font-size: 16px;
        font-family: inherit;
        outline: none;
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
</style>
