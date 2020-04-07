<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
    
        <button @click="newPage()">Add New Page</button>
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
              <div class="page-published">
                <span v-if="page.published === false" class="false"></span>
                <span v-if="page.published === true" class="true"></span>
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
              </div>
          </section>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db } from '../../firebase/db.js'

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
    newPage() {
        // Get newest ID from firebase
        let ref = db.collection("pages").orderBy("id", "desc").limit(1);
        console.log(ref['.key']);

        // Create new entry in Firebase with template data

        // Redirect user to new page
    },
    async assignFrontpage(id) {
      // Get ID
      console.log(id);

      // Remove all others as frontpage
      db.collection("pages").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // We don't include the current page to be removed
              if(doc.id != id) {
                var pagesRef = db.collection("pages").doc(doc.id);

                return pagesRef.update({
                    featured: false
                });
              }
          });
      });

      // Update current page to be featured
      db.collection("pages").doc(id).update({
        featured: true
      });
    }
  },
  firestore() {
    return {
      pages: db.collection("pages")
    }
  }
}
/*
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'
import db from '../../firebase/db.js'

let pagesRef = db.collection('pages').doc("0");


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
  firebase: {
    pages: pagesRef
  }
}
*/
</script>

<style>
    .pages-view {
      min-height: calc(100vh - 35px);
      display: flex;
    }
    .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding: 15px 30px;
    }

    h1 {
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
</style>
