<template>
  <div class="pages-view" :class="{ active: sidemenu }">
    <vue-headful :title="'Blocks- Control Seat CMS'"/>
    <Menu></Menu>
    <div class="content">
    
        <button class="add" @click="newBlock()">Add New Block</button>
        <h1>Featured Blocks</h1>
        
        <div class="v-table">
        
          <div class="table-header">
            <div class="page-publish">
              Type
            </div>
            <div class="page-title">
              Block Title
            </div>
            <div class="page-actions">
              Actions
            </div>
          </div>
          <section class="row" v-if="header[0]">
              <div class="page-published">
                  <strong>Header Block</strong>
              </div>
              <div class="page-title">
                {{ header[0].title }}
              </div>
              <div class="page-edit">
                <a v-bind:href="'/management/content/blocks/' + header[0].id">Edit</a>
              </div>
          </section>
          
          <section class="row" v-if="footer[0]">
              <div class="page-published">
                  <strong>Footer Block</strong>
              </div>
              <div class="page-title">
                {{ footer[0].title }}
              </div>
              <div class="page-edit">
                <a v-bind:href="'/management/content/blocks/' + footer[0].id">Edit</a>
              </div>
          </section>
        </div>
        
        <h2 style="text-align: left">Content Blocks</h2>
        <div class="v-table">
          <div class="table-header">
            <div class="page-publish">
              Published
            </div>
            <div class="page-title">
              Block Title
            </div>
            <div class="page-actions">
              Actions
            </div>
          </div>
          <div v-for="block in blocks" :key="block['.key']">
          <section class="row">
              <div class="page-published">
                <input type="checkbox" v-model="block.published" @click="togglePublish(block['.key'], block.published)">
              </div>
              <div class="page-title">
                {{ block.title }}
              </div>
              <div class="page-edit">
                <a v-bind:href="'/management/content/blocks/' + block.id">Edit</a>
              </div>
          </section>
          </div>
        </div>
    </div>
    
    
  <div class="version">Control Seat Alpha 0.4.5</div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db, blocksRef } from '../../firebase/db.js'

export default {
  name: 'Management',
  components: {
    Menu
  },
  data () {
    return {
      blocks: [],
      header: [],
      footer: [],
      sidemenu: false
    }
  },
  methods: {
    async newBlock() {
        // Get newest ID from firebase and increment by one
        blocksRef.orderBy("id", "desc").limit(1).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // New data

            // We need to set the id to be an integer as we get it as an string from firebase
            let newBlockId = Number(doc.id) + 1;

            // However the id for ref still needs to be a string
            let newBlockRef = String(newBlockId);

            // Firebase Call
            blocksRef.doc(newBlockRef).set({
              "id": newBlockId,
              "blocktype": 'content',
              "bgimage": '',
              "bgcolor": '#ccc',
              "published": false,
              "showtitle": false,
              "title": "A New Block",
              "container": true,
              "textcolor": "#fff",
              "elements": []
            })
          })
        });
    },
    togglePublish(id, state) {
      if(state == false) {
        pagesRef.doc(id).update({
          published: true
        })
      }
      else if(state == true) {
        pagesRef.doc(id).update({
          published: false
        })
      }
      else {
        alert("Something went wrong. Could not read published state of page");
      }
    },
  },
  firestore() {
    return {
      blocks: blocksRef.where("blocktype", "==", "content"),
      header: blocksRef.where("blocktype", "==", "header"),
      footer: blocksRef.where("blocktype", "==", "footer"),
    }
  }
}
</script>

<style>
    .pages-view {
      min-height: calc(100vh);
      display: flex;
    }
    
    .pages-view button.add {
      background-color: #f8cb5d;
      color: #333;
      border: none;
      padding: 12px 20px;
      cursor: pointer;
      float: right;
      margin-top: 10px;
      font-weight: 600;
    }
    .pages-view .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
        min-height: 100%;
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

    .page-actions,
    .page-edit {
      min-width: 5%;
    }

    .page-id {
      min-width: 2%;
    }

    .page-publish,
    .page-published {
      text-align: center;
      min-width: 10%;
    }

    .v-table span {
      width: 10px;
      height: 10px;
      background-color: black;
      border-radius: 100%;
      display: inline-block;
    }

    .page-featured {
      min-width: 10%;
    }

    span.true {
      background-color: green;
    }

    span.false {
      background-color: red;
    }
    
    .select-all,
    .select {
      min-width: 8%;
    }

    .v-table .row:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }


    .page-edit {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 5px;
    }

    .page-edit a, 
    .page-edit button {
      color: inherit;
      text-decoration: none;
      background-image: none;
      border: none;
      font-size: 14px;
      border: 1px solid #000;
      padding: 5px;
      display: inline-block;
      background-color: #FFF;
    }

    
    /* High resolution */
    @media screen and (max-width: 1300px) {
      html .page-publish, 
      html .page-published {
        min-width: 15%;
      }
      html .page-featured {
        min-width: 30%;
      }
      html .page-actions, .page-edit {
        min-width: 5%;
      }
      .two-third-layout {
        grid-template-columns: 1fr;
      }
    }
    
    /* Laptop-sized */
    @media screen and (max-width: 1280px) {
      html .page-publish, html .page-published {
        min-width: 25%;
      }
      .container {
        max-width: 992px;
      }
    }

    /* Desktop to iPad size */
    @media screen and (max-width: 991px) {
      .pages-view .content {
        padding-left: 160px;
      }
    }

    /* Mobile starts */
    @media screen and (max-width: 767px) {
        html .pages-view {
          position: relative;
          min-height: 100vh;
          overflow: scroll;
        }

        html h1 {
          padding-left: 15px;
          width: 100%;
          padding-right: 15px;
          box-sizing: border-box;
          float: left;
          margin-bottom: 15px;
        }

        html h2 {
          padding-left: 15px;
          width: 100%;
          padding-right: 15px;
          margin-bottom: 0;
        }

        html .v-table {
          margin-top: 10px;
        }

        html .pages-view button.add {
          float: none;
        }

        button.add {
          margin-right: 15px;
          margin-bottom: 20px;
        }
        

        html .page-publish, html .page-published,
        html .page-featured {
          display: none;
        }
    
        html .pages-view .content {
          padding-left: 0;
          padding-right: 0;
          min-height: 100vh;
          max-width: 100%;
          margin-left: 0;
          transition: 0.3s ease-in-out;
        }

        html .pages-view.active  .content {
          margin-left: 250px;
        }
    }

    /* Small Mobile */
    @media screen and (max-width: 540px) {

    }
</style>
