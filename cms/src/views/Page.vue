<template>
  <div class="page">
    <div class="banner" v-bind:class="{ active: status[0].published}" v-bind:style="{ backgroundColor: status[0].bgcolor, color: status[0].textcolor }">
      <div v-if="status[0].published">
        {{ status[0].title }}
      </div>
    </div>
    <header>
      <a href="/">Frontend Header</a>
    </header>
    <nav>
      <div class="container">
      <ul>
        <transition-group type="transition" :name="'flip-list'">
          <li v-for="item in menuitems" :key="item.order">
            <a v-bind:href="item.url">{{ item.name }}</a>
          </li>
        </transition-group>
      </ul>
      </div>
    </nav>
    <main>
      <section v-for="block in pages[0].blocks" :key="block.id" v-bind:style="{ backgroundColor: block.bgcolor, color: block.textcolor }">
        <div v-bind:class="{ container: block.container}">
          <h2 v-if="block.showtitle">{{ block.title }}</h2>
          <p v-if="block.textcontent">{{ block.textcontent }}</p>
        </div>
      </section>
    </main>
    <footer>
      Frontend Footer
    </footer>
  </div>
</template>

<script>
import { db, pagesRef, menusRef, blocksRef } from '../firebase/db.js'

// Get Menu Items
var menuItemsRef = menusRef.doc("0").collection("items");

// Pages
let pages = [];
let getPage = [];

export default {
  name: 'Page',
  components: {
  },
  data () {
    return {
      pages: getPage,
      menus: []
    }
  },
  methods: {
    async getPage() {
      // UNDERPAGES
      // First we get the page from router
      if(this.$router.app._route.params.page != undefined) {
        console.log(this.$router.app._route.params.page)
        let routeId = this.$router.app._route.params.page;
        // Then we filter through database for the menu item that is equal to our route page
        let menu = menusRef.doc("0").collection("items").where("url", "==", routeId)
        menu.limit(1).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            if(doc.exists) {
              // Then we get the data from the menu
              let menu_data = doc.data()
              // Then we sort through pages using the reference to page ids from menu to get the page content

              // Page Meta Data
              pagesRef.doc(String(menu_data.reference)).get().then(function(document) {
                let docData = document.data();

                // Only output information we need
                let DocumentData = {
                  "id": docData.id,
                  "title": docData.title,
                  // This is our blocks
                  "blocks": []
                }
                // Push to our object
                getPage.push(DocumentData)
                
              
                // Page Block Data
                pagesRef.doc(String(docData.id)).collection("blocks").get().then(function(blocks) {
                  // For every block
                  // If we have already inserted data, don't do this again
                  if(getPage[0].blocks == '') {
                    blocks.forEach(function(block) {
                      let blockData = block.data()
                      if(blockData.published != false) {
                        getPage[0].blocks.push(blockData)
                      }
                    })
                  }
                })
              })
            }
            // If document doesn't exist, it will return this error
            else {
              alert("Document doesn't exist")
            }
          })
        })
      }
      // FRONTPAGE
      else {
        let routeId = 0;
        // Page Meta Data
        pagesRef.where("featured", "==", true).limit(1).get().then(function(query) {
          query.forEach(function(document) {
            let docData = document.data();

            let DocumentData = {
              "id": docData.id,
              "title": docData.title,
              // This is our blocks
              "blocks": []
            }
            let PageID = docData.id
            getPage.push(DocumentData)
           // Page Block Data
            pagesRef.doc(String(PageID)).collection("blocks").get().then(function(blocks) {
              // For every block
              // If we have already inserted data, don't do this again
              if(getPage[0].blocks == '') {
                blocks.forEach(function(block) {
                  let blockData = block.data()
                  if(blockData.published != false) {
                    getPage[0].blocks.push(blockData)
                  }
                })
              }
            })
          })
        })
      }
    }
  },
  firestore() {
    return {
      menuitems: menuItemsRef.orderBy("order"),
      status: blocksRef.where("blocktype", "==", "banner"),
    }
  },
  mounted() {
    this.getPage();
  }
}
</script>

<style>
.page {
  min-height: calc(100vh - 34px);
  display: flex;
  flex-direction: column;
}

.page header, main, footer {
  width: 100%;
}

.page header {
  background-color: teal;
  padding: 30px 0;
  color: #FFF;
}

.banner {
  height: 0px;
  transition: 0.3s ease-in-out;
  margin-top: -34px;
  padding: 15px 0;
}

.banner.active {
  height: auto;
  margin-top: 0;
}


.page .title {
  text-align: center;
  background-color: #ccc;
  padding: 20px 0;
  color: #222;
}

.page .description {
  background-color: lightblue;
  padding: 20px 0;
}

.page main {
  background-color: #ebebeb;
  flex: 1 0 auto;
}

.page nav {
  padding: 20px 0;
}

.page nav ul span {
  display: flex;
  color: #222;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.page nav ul li a {
  
  border: 1px solid #000;
  padding: 15px;
}

.page {
  margin-top: 34px;
}

main {
  text-align: left;
}

section {
  padding-top: 60px;
  padding-bottom: 60px;
}

.page nav ul li:not(:last-of-type) {
  margin-right: 20px;
}

.page footer {
  background-color: #222;
  padding: 30px 0;
  color: #FFF;
}

.container {
  max-width: 1199px;
  margin-left: auto;
  margin-right: auto;
}

</style>
