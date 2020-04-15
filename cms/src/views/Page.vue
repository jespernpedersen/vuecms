<template>
  <div class="page">
    <header>
      <a href="/">Frontend Header</a>
    </header>
    <nav>
      <div class="container">
      <ul>
        <li v-for="item in menuitems">
          <a v-bind:href="item.url">{{ item.name }}</a>
        </li>
      </ul>
      </div>
    </nav>
    <main>
      <div class="container">
        <h1>{{ pages[0].title }}</h1>
        <p>{{ pages[0].content }}</p>
      </div>
    </main>
    <footer>
      Frontend Footer
    </footer>
  </div>
</template>

<script>
import { db, pagesRef, menusRef } from '../firebase/db.js'

// Get Menu Items
var menuItemsRef = db.collection("menus").doc("0").collection("items");

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
      // First we get the page from router
      let routeId = this.$router.app._route.params.page;

      // Then we filter through database for the menu item that is equal to our route page
      let menu = menusRef.doc("0").collection("items").where("url", "==", routeId)
      menu.limit(1).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
          if(doc.exists) {
            // Then we get the data from the menu
            let menu_data =  doc.data()

            // Then we sort through pages using the reference to page ids from menu to get the page content
            db.collection("pages").where("id", "==", menu_data.reference).get().then(function(subQuerySnapshot) {
              subQuerySnapshot.forEach(function(subdoc) {
                // We put the content of the page into the variable Array
                getPage.push(subdoc.data())
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
  },
  firestore() {
    return {
      menuitems: menuItemsRef
    }
  },
  mounted() {
    this.getPage();
  }
}
</script>

<style>
.page {
  min-height: calc(100vh - 35px);
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

.page nav ul {
  display: flex;
  color: #222;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.page nav ul li {
  
  border: 1px solid #000;
  padding: 15px;
}

.page {
  margin-top: 35px;
}

main {
  text-align: left;
  padding: 30px;
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
