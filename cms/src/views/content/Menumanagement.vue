<template>
  <div class="menu-management-view">
    <Menu></Menu>
    <div class="content">
        <h1>Menu</h1>
        <p>This is where I will edit menu and change its order</p>
        <section v-for="menu in menus" :key="menu['.key']" class="menu">
          <h4 class="menu-name">{{ menu.name }}</h4>
          <ul v-for="item in menu.items">
            <li><span class="debug"><strong>ID: </strong>{{ item.id }}</span><strong>Name: </strong>{{ item.name }}</li>
          </ul>
        </section>
    </div>
    <aside class="page-include-view">
    <h3>Page List</h3>
      <ul>
        <li  v-for="page in pages" :key="page['.key']">{{ page.title }}</li>
      </ul>
    </aside>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'
import { db } from '../../firebase/db.js'


// Get Menu Data
let menuRef = db.collection("menus");
let getMenus = [];

// Get Page Data
let pagesRef = db.collection("pages");



// Function for querying all subcollections - this will be used to get every menu item inside multiple menus

// All our menus
menuRef.get().then(function(querySnapshot) {
  // Get Every First Level Documents (i.e. menus)
  querySnapshot.forEach(function(doc) {
    // Get data
    let menu = doc.data();
    // Main Collection

    let menuArray = {
      id: menu.id,
      name: menu.name,
      // We start with empty items, and later add them down
      items: []
    }

    // Add menu to object
    getMenus.push(menuArray);

    // Menu Items
    menuRef.doc(doc.id).collection("items").get().then(function(subquerySnapshot) {
      // Set ID of the menu's items we will sort by
      let this_menu = doc.id;

      // For every menu item, we push them to our object configured by our menu id
      subquerySnapshot.forEach(function(subdoc) {
        // Get item data
        let item = subdoc.data();

        // Construct data
        let itemsArray = {
          id: item.id,
          name: item.name
        }

        // Add menu items to object
        getMenus[doc.id]['items'].push(itemsArray);
      });
    });
  });
});

export default {
  name: 'Menu_Management',
  components: {
    Menu
  },
  data () {
    return {
      menus: getMenus,
      pages: []
    }
  },
  methods: {
    async debug(item) {
      console.log(item);
    },
    async newMenu() {
        // Get newest ID from firebase and increment by one
        menuRef.orderBy("id", "desc").limit(1).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // New data

            // We need to set the id to be an integer as we get it as an string from firebase
            let newMenuId = Number(doc.id) + 1;

            // However the id for ref still needs to be a string
            let newMenuRef = String(newMenuId);

            // Firebase Call
            menuRef.doc(newMenuRef).set({
              "id": newMenuId,
              "name": "PH",
              "menu-slug": "PH"
            })
          })
        });
    },
    async newMenuItem() {
      // 
    }
  },
  firestore() {    
    return {
      pages: pagesRef
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
    .menu-management-view{
      min-height: calc(100vh);
      display: flex;
    }
    .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
        min-height: 100%;
    }

    aside.page-include-view {
      width: 290px;
      padding-top: 32px;
      background-color: #333;
      color: #FFF;
      text-align: left;
    }

    aside.page-include-view h3 {
      padding: 15px 30px;
    }

    aside.page-include-view ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      display: inline-block;
    }

    aside.page-include-view ul li {
      width: 100%;
      background-color: rgba(255,255,255,0.2);
      padding: 15px 30px;
      display: inline-block;
    }

    aside.page-include-view ul li:nth-of-type(odd) {
      
      background-color: rgba(255,255,255,0.4);
    }

    .menu {
      margin: 30px 0;
      background-color: #CCC;
      text-align: left;
      padding: 30px;
    }

    .debug {
      padding: 3px;
      margin-right: 5px;
    }

    .menu ul {
      margin-left: 20px;
    }


    h1,
    h3,
    p {
        text-align: left;
    }
</style>
