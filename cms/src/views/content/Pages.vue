<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
    
        <button class="add" @click="newPage()">Add New Page</button>
        <h1>Pages</h1>
        <div class="v-table">
          <div class="table-header">
            <div class="select-all">
              
                <input type="checkbox" /> Select All
            </div>
            <div class="page-id">
              ID
            </div>
            <div class="page-publish">
              Published
            </div>
            <div class="page-title">
              Page Title
            </div>
            <div class="page-slug">
              Page Slug
            </div>
            <div class="page-featured">
              Frontpage
            </div>
            <div class="page-actions">
              Actions
            </div>
          </div>
          <section v-for="page in pages" :key="page['.key']" class="row">
              <div class="select">
                <input type="checkbox" />
              </div>
              <div class="page-id">
                {{ page.id }}
              </div>
              <div class="page-published" v-if="page.published === false" @click="togglePublish(page['.key'], page.published)">
                <span class="false"></span>
              </div>
              <div class="page-published" v-if="page.published === true" @click="togglePublish(page['.key'], page.published)">
                <span class="true"></span>
              </div>
              <div class="page-title">
                {{ page.title }}
              </div>
              <div class="page-slug">
                {{ page.slug }}
              </div>
              <div class="page-featured">
                <span v-if="page.featured === false" class="false"  @click="assignFrontpage(page['.key'])"></span>
                <span v-if="page.featured === true" class="true"></span>
              </div>
              <div class="page-edit">
                <a v-bind:href="'/management/content/pages/' + page.id">Edit</a>
                <button class="delete" @click="deletePage(page['.key'])">Delete</button>
              </div>
          </section>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db } from '../../firebase/db.js'

let pageRef = db.collection("pages");

export default {
  name: 'Management',
  components: {
    Menu
  },
  data () {
    return {
      pages: [],
    }
  },
  methods: {
    async newPage() {
        // Get newest ID from firebase and increment by one
        pageRef.orderBy("id", "desc").limit(1).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // New data

            // We need to set the id to be an integer as we get it as an string from firebase
            let newPageId = Number(doc.id) + 1;

            // However the id for ref still needs to be a string
            let newPageRef = String(newPageId);

            // Firebase Call
            pageRef.doc(newPageRef).set({
              "id": newPageId,
              "content": "This is a placeholder",
              "featured": false,
              "published": false,
              "slug": "placeholder",
              "title": "Placeholder title"
            })
          })
        });
    },
    togglePublish(id, state) {
      if(state == false) {
        pageRef.doc(id).update({
          published: true
        })
      }
      else if(state == true) {
        pageRef.doc(id).update({
          published: false
        })
      }
      else {
        alert("Something went wrong. Could not read published state of page");
      }
    },
    assignFrontpage(id) {
      // Remove all others as frontpage
      pageRef.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // We don't include the current page to be removed
              if(doc.id != id) {
                var nonFrontpage = pageRef.doc(doc.id);

                return nonFrontpage.update({
                    featured: false
                });
              }
          });
      });

      // Update current page to be featured
      pageRef.doc(id).update({
        featured: true
      });
    },
    deletePage(id) {
      pageRef.doc(id).delete();
    }
  },
  firestore() {
    return {
      pages: pageRef
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
      background-color: green;
      color: #FFF;
      border: none;
      padding: 12px 20px;
      cursor: pointer;
      float: right;
      margin-top: 10px;
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
</style>
