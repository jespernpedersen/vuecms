<template>
  <div class="page">
    <header>
      Frontend Header
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
      <button @click="debug()">Debug</button>
    </footer>
  </div>
</template>

<script>
import { db } from '../firebase/db.js'


// Find frontpage page
var pageRef = db.collection("pages");


var query = pageRef.where("featured", "==", true);

// Get Menu Items

var menuItemsRef = db.collection("menus").doc("0").collection("items");

let pages = [];
let getPage = [];



// var menuItemsRef = 

// let testid = $router.app._route.params.page;

export default {
  name: 'Page',
  components: {
  },
  data () {
    return {
      pages: getPage,
      menus: [],
      menufilter: []
    }
  },
  methods: {
    debug(element) {
      console.log(element);
    },
    debugMenu(element) {
    },
    async getRoute() {
      // First we get the page from router
      let routeId = this.$router.app._route.params.page;

      // Then we filter through database for the menu item that is equal to our route page
      let menu = db.collection("menus").doc("0").collection("items").where("url", "==", routeId)


      menu.limit(1).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
          if(doc.exists) {
            let menu_data =  doc.data()

            console.log(menu_data.reference)

            db.collection("pages").where("id", "==", menu_data.reference).get().then(function(subQuerySnapshot) {
              subQuerySnapshot.forEach(function(subdoc) {
                let page_data = subdoc.data()

                getPage.push(page_data)
              })
            })
          }
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
    this.getRoute();
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
