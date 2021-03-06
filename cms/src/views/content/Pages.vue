<template>
  <div class="pages-view" :class="{ active: sidemenu }">
    <Menu></Menu>
    <div class="content">
        <vue-headful :title="'Pages - Control Seat CMS'"/>
        <button class="add" @click="newPage()">Add New Page</button>
        <h1>Pages</h1>
        <div class="v-table">
          <div class="table-header">
            <div class="page-publish">
              Published
            </div>
            <div class="page-title">
              Page Title
            </div>
            <div class="page-featured">
              Frontpage
            </div>
            <div class="page-actions">
              Actions
            </div>
          </div>
          <section v-for="page in pages" :key="page['.key']" class="row">
              <div class="page-published">
                <input type="checkbox" v-model="page.published"  @click="togglePublish(page['.key'], page.published)" />
              </div>
              <div class="page-title">
                <strong class="disabled" v-if="!page.published">
                  {{ page.title }}
                </strong>
                <strong v-if="page.published">
                  {{ page.title }}
                </strong>
              </div>
              <div class="page-featured">
                <input type="checkbox" v-model="page.featured" @click="assignFrontpage(page['.key'])"></span>
              </div>
              <div class="page-edit">
                <a v-bind:href="'/management/content/pages/' + page.id">Edit</a>
                <button class="delete" @click="deletePage(page['.key'])">Delete</button>
              </div>
          </section>
        </div>
    </div>
    
    
  <div class="version">Control Seat Alpha 0.4.5</div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db, pagesRef } from '../../firebase/db.js'

export default {
  name: 'Management',
  components: {
    Menu
  },
  data () {
    return {
      pages: [],
      sidemenu: false
    }
  },
  methods: {
    async newPage() {
        // Get newest ID from firebase and increment by one
        pagesRef.orderBy("id", "desc").limit(1).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // New data

            // We need to set the id to be an integer as we get it as an string from firebase
            let newPageId = Number(doc.id) + 1;

            // However the id for ref still needs to be a string
            let newPageRef = String(newPageId);

            // Firebase Call
            pagesRef.doc(newPageRef).set({
              "id": newPageId,
              "content": "This is a placeholder",
              "featured": false,
              "published": false,
              "slug": "placeholder",
              "title": "Placeholder title"
            })
            // Create First Section
            pagesRef.doc(newPageRef).collection("blocks").doc("0").set({
              "id": 0,
              bgcolor: "#222",
              bgimage: "",
              blocktype: "content",
              columns: 1,
              container: true,
              published: false,
              textcolor: "#ffffff",
              title: "First Section"
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
    assignFrontpage(id) {
      // Remove all others as frontpage
      pagesRef.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // We don't include the current page to be removed
              if(doc.id != id) {
                var nonFrontpage = pagesRef.doc(doc.id);

                return nonFrontpage.update({
                    featured: false
                });
              }
          });
      });

      // Update current page to be featured
      pagesRef.doc(id).update({
        featured: true
      });
    },
    deletePage(id) {
      pagesRef.doc(id).delete();
      
    }
  },
  firestore() {
    return {
      pages: pagesRef.orderBy("id")
    }
  }
}
</script>

<style>
    .pages-view {
      min-height: calc(100vh);
      display: flex;
    }

    strong.disabled {
      opacity: 0.3;
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
    @media screen and (max-width: 1500px) {
      html .page-publish, 
      html .page-published {
        min-width: 15%;
      }
      html .page-featured {
        min-width: 30%;
      }
      html .page-actions, .page-edit {
        min-width: 11%;
      }
    }
    
    /* Laptop-sized */
    @media screen and (max-width: 1280px) {
      html .page-publish, html .page-published {
        min-width: 20%;
      }
      html .page-actions, .page-edit {
        min-width: 16%;
      }
      .container {
        max-width: 992px;
      }
    }

    /* Desktop to iPad size */
    @media screen and (max-width: 991px) {
        html .pages-view .content {
          padding-left: 160px;
        }
    }

    /* Mobile starts */
    @media screen and (max-width: 767px) {
        html .pages-view {
          position: relative;
        }

        h1 {
          padding-left: 15px;
        }

        button.add {
          margin-right: 15px;
        }
        

        html .page-publish, html .page-published,
        html .page-featured {
          display: none;
        }
    
        html .pages-view .content {
          padding-left: 0;
          padding-right: 0;
          margin-left: 0;
          transition: 0.3s ease-in-out;
          min-height: 100vh;
        }

        html .pages-view.active .content {
          margin-left: 250px;
        } 
    }

    /* Small Mobile */
    @media screen and (max-width: 540px) {

    }
</style>
