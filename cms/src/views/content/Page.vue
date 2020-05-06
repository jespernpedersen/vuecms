<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
        <div class="field">
            <label>Title</label>
            <input class="title"
            v-model="page.title"
            @keydown.enter="editField('title', this)"
            />
        </div>
        <!-- Block System -->
        <div class="all-blocks"  style="text-align: left" v-for="block in blocks">
        
            <section v-bind:style="{ backgroundColor: block.bgcolor, color: block.textcolor }">
                <h1>
                    {{ block.title }}
                </h1>
                <textarea v-model="block.textcontent" placeholder="Type here the contents of the block" :style="{'--placeholder-color': block.textcolor }" @change="notifyChanges()">
                </textarea>
                <div v-for="index in block.columns">
                </div>
            </section>
        </div>
        
          <pre>
            {{ blocks }}
          </pre>
          <button class="btn" @click="AddSection(blocks, blocks[blocks.length - 1].id)">Add New Section</button>
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
      blocks: []
    }
  },
  methods: {
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
        console.log(lastkey)
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
</style>
