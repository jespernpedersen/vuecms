<template>
  <div class="menu-management-view">
    <Menu></Menu>
    <div class="content">
        <h1>Menu</h1>
        <p>This is where I will edit menu and change its order</p>
        <form v-on:submit.prevent="newMenu(newMenuText)">
          <input v-model="newMenuText" placeholder="Type in the name for your new menu" /> 
          <button class="add"> Add New Menu</button>
        </form>
        <nav class="all-menu">
          <nav v-for="menu in menus" :key="menu['.key']" class="menu">
            <h4 class="menu-name">{{ menu.name }}</h4>
            <ul>
              <li v-for="item in menu.items" @click="selected = String(menu.id) + String(item.id)" :class="{expanded:selected == String(menu.id) + String(item.id)}">
                <div class="menu-item-content">
                <strong>Name: </strong><span class="menu-name">{{ item.name }}</span>
                </div>
                <unicon name="angle-down" v-if="selected != String(menu.id) + String(item.id)" />
                <unicon name="angle-up" v-if="selected == String(menu.id) + String(item.id)" />
                <div class="expanded-item">
                  <div class="menu-option">
                    <label>Menu Title</label>
                    <input v-model="item.name" placeholder="Name of the menu item" />
                  </div>
                  <div class="menu-option">
                    <label>URL-shortlink</label>
                    <input v-model="item.url" placeholder="This is the link that will be shown in the address bar" />
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </nav>
    </div>
    <aside class="page-include-view">
    <h3>Pages</h3>
      <ul>
        <li v-for="page in pages" :key="page['.key']" @click="addMenuItem(page, menus[0])">{{ page.title }}</li>
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
let pagesRef = db.collection("pages").where("published", "==", true);



// Function for querying all subcollections - this will be used to get every menu item inside multiple menus

// All our menus
menuRef.onSnapshot({ includeMetadataChanges: true },function(querySnapshot) {
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
          name: item.name,
          url: item.url
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
      pages: [],
      newMenuText: null,
      selected: undefined
    }
  },
  methods: {
    async expandMenuItem(item) {
      console.log(item);
    },
    async addMenuItem(page, menu) {
      // Disclaimer: Placeholder that the menu chosen is first menu
      let menuItemRef = menuRef.doc("0").collection("items");

      // Get Last Menu ID and increment
      menuItemRef.orderBy("id", "desc").limit(1).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // Convert to integer so we can increment it
          let newMenuItemId = Number(doc.id) + 1;
          // Convert it to string so we can use it in Firebase
          let newMenuItemRef = String(newMenuItemId);

            // Update Database
            menuItemRef.doc(newMenuItemRef).set({
              "id": newMenuItemId,
              "name": page.title,
              "url": page.slug
            })
        })
      })

    },
    async debug(item) {
      console.log(item);
    },
    async newMenu(newMenuText) {
        console.log(newMenuText);
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
              "name": newMenuText,
              "items": []
            })
          })
        });
    },
  },
  firestore() {    
    return {
      pages: pagesRef
    }
  },
  watch: {
    // Subscribe to changes made to menu
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
        flex: 1 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
        min-height: 100%;
    }

    .all-menu {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }

    .menu {
      margin: 30px 0;
      background-color: #CCC;
      text-align: left;
      width: calc(33% - 10px);
    }

    .menu:not(:first-child) {
      margin-left: 23px;
    }
 
    .menu h4 {
      width: 100%;
      background-color: rgba(255, 255, 255, 0.3);
      padding: 20px;
    }

    .menu ul {
      padding: 15px;
      list-style: none;
    }

    input {
      padding: 10px;
      margin-right: 10px;
      min-width: 250px;
    }
    form {
      text-align: left;
    }

    .menu ul li {
      background-color: rgba(255, 255, 255, 0.5);
      border: 1px solid #CCC;
      width: 100%;
      display: inline-block;
      position: relative;
      overflow: hidden;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      padding: 0;
    }

    strong {
      margin-right: 5px;
    }

    .menu ul li .menu-option:not(:first-child) {
      margin-top: 10px;
    }

    .menu ul li.expanded {
      padding-bottom: 170px;
      transition: 0.3s ease-in-out;
    }

    .menu label {
      font-style: italic;
      font-size: 14px;
      margin-bottom: 5px;
      display: inline-block;
      width: 100%;
    }

    .menu ul li input {
      width: 100%;
    }

    .expanded-item {
      width: 100%;
      position: absolute;
      top: 40px;
      left: 0;
      padding: 10px;
    }

    .menu-item-content {
      float: left;
      display: flex;
      align-items: center;
      
      padding: 10px;
    }

    .menu ul li .unicon {
      position: absolute;
      right: 5px;
      top: 7px;
    }

    .debug {
      padding: 3px;
      margin-right: 5px;
    }

    .menu ul {
    }


    h1,
    h3,
    p {
        text-align: left;
    }

    /* Page List, should maybe its own component */
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
    
      button.add {
        background-color: green;
        color: #FFF;
        border: none;
        padding: 12px 20px;
        cursor: pointer;
        margin-top: 10px;
        display: inline-block;
      }

    aside.page-include-view ul li:nth-of-type(odd) {
      background-color: rgba(255,255,255,0.4);
    }
</style>
