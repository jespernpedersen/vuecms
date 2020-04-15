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
              <li v-if="menu.id == 0">
                <div class="menu-item-content">
                  <strong>Frontpage [Default]</strong>
                </div>
              </li>
              <li v-for="item in menu.items" @click="selected = String(menu.id) + String(item.id)" :class="{expanded:selected == String(menu.id) + String(item.id)}">
                <div class="menu-item-content">
                <strong>Item Name: </strong><span class="menu-name">{{ item.name }}</span>
                </div>
                <unicon name="angle-down" v-if="selected != String(menu.id) + String(item.id)" />
                <unicon name="angle-up" v-if="selected == String(menu.id) + String(item.id)" />
                <div class="expanded-item">
                  <div class="menu-option">
                    <label>Menu Title</label>
                    <input v-model="item.name" placeholder="Name of the menu item" @keydown.enter="editMenuItem(menu.id, item.id, 'name', item.name)"/>
                  </div>
                  <div class="menu-option">
                    <label>URL-shortlink</label>
                    <input v-model="item.url" placeholder="This is the link that will be shown in the address bar"  @keydown.enter="editMenuItem(menu.id, item.id, 'url', item.url)" />
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
import { db, menusRef, pagesRef } from '../../firebase/db.js'


// Get Menu Data
let getMenus = [];

// Get Page Data
let visiblePagesRef = pagesRef.where("published", "==", true);



// Function for querying all subcollections - this will be used to get every menu item inside multiple menus

// All our menus
menusRef.onSnapshot({ includeMetadataChanges: true },function(querySnapshot) {
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
    menusRef.doc(doc.id).collection("items").get().then(function(subquerySnapshot) {
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
    async addMenuItem(page, menu) {
      // Disclaimer: Placeholder that the menu chosen is first menu
      let menuItemRef = menusRef.doc("0").collection("items");

      // Get Last Menu ID and increment
      menuItemRef.orderBy("id", "desc").limit(1).get().then(function(querySnapshot) {
        // If there are no menu items, we cannot increment it, so if the menu is empty, we will start at 0
        if(querySnapshot.size != 0 ) {
          querySnapshot.forEach(function(doc) {
            // Convert to integer so we can increment it
            let newMenuItemId = Number(doc.id) + 1;
            // Convert it to string so we can use it in Firebase
            let newMenuItemRef = String(newMenuItemId);

            // Create our slug based on page.tite as lowercase and replacing spaces with dashes
            slug = page.title.replace(/\s+/g, '-').toLowerCase()

            // Update Database
            menuItemRef.doc(newMenuItemRef).set({
              "id": newMenuItemId,
              "name": page.title,
              "url": slug,
              "reference": page.id
            })
          })
        }
        else {
            slug = page.title.replace(/\s+/g, '-').toLowerCase()
            // Update Database
            menuItemRef.doc("0").set({
              "id": newMenuItemRef,
              "name": page.title,
              "url": slug,
              "reference": page.id
            })     
        }
      })
    },
    async editMenuItem(menuid, itemid, fieldtype, fieldvalue) {
      // Convert ids of menus to strings for usage in Firebase
      let menu_id = String(menuid)
      let item_id = String(itemid)

      // Only allow these field types, this avoids people manipulating our database
      if(fieldtype == "name") {
        menusRef.doc(menu_id).collection("items").doc(item_id).update({
          name: fieldvalue
        })
      }
      else if(fieldtype == "url") {
        menusRef.doc(menu_id).collection("items").doc(item_id).update({
          url: fieldvalue
        })
      }
    },
    async debug(item) {
      console.log(item);
    },
    async newMenu(newMenuText) {
        // Get newest ID from firebase and increment by one
        menusRef.orderBy("id", "desc").limit(1).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // We need to set the id to be an integer as we get it as an string from firebase
            let newMenuId = Number(doc.id) + 1;

            // However the id for ref still needs to be a string
            let newmenusRef = String(newMenuId);

            // Firebase Call
            menusRef.doc(newmenusRef).set({
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
      pages: visiblePagesRef
    }
  },
  watch: {
    // Subscribe to changes made to menu
  }
}
</script>

<style>

* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}
.menu-management-view{
      min-height: calc(100vh);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
}
.menu-management-view .content {
        -webkit-box-flex: 1;
            -ms-flex: 1 auto;
                flex: 1 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
        min-height: 100%;
}
.menu-management-view  .all-menu {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30px;
      width: 100%;
}
.menu-management-view .menu {
      margin: 30px 0;
      background-color: #CCC;
      text-align: left;
}
.menu-management-view .menu h4 {
      width: 100%;
      background-color: rgba(255, 255, 255, 0.3);
      padding: 20px;
}
.menu-management-view .menu ul {
      padding: 15px;
      list-style: none;
}
.menu-management-view input {
      padding: 10px;
      margin-right: 10px;
      width: 250px;
}
.menu-management-view form {
      text-align: left;
}
.menu-management-view .menu ul li {
      background-color: rgba(255, 255, 255, 0.5);
      border: 1px solid #CCC;
      width: 100%;
      display: inline-block;
      position: relative;
      overflow: hidden;
      -webkit-transition: 0.3s ease-in-out;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      padding: 0;
}
.menu-management-view strong {
      margin-right: 5px;
}
.menu-management-view .menu ul li .menu-option:not(:first-child) {
      margin-top: 10px;
}
.menu-management-view .menu ul li.expanded {
      padding-bottom: 170px;
      -webkit-transition: 0.3s ease-in-out;
      transition: 0.3s ease-in-out;
}
.menu-management-view .menu label {
      font-style: italic;
      font-size: 14px;
      margin-bottom: 5px;
      display: inline-block;
      width: 100%;
}
.menu-management-view .menu ul li input {
      width: 100%;
}
.menu-management-view .expanded-item {
      width: 100%;
      position: absolute;
      top: 40px;
      left: 0;
      padding: 10px;
}
.menu-management-view .menu-item-content {
      float: left;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      
      padding: 10px;
}
.menu-management-view .menu ul li .unicon {
      position: absolute;
      right: 5px;
      top: 7px;
}
.menu-management-view .debug {
      padding: 3px;
      margin-right: 5px;
}
.menu-management-view h1,
    .menu-management-view h3,
    .menu-management-view p {
        text-align: left;
}

    /* Page List, should maybe its own component */
aside.page-include-view {
      min-width: 290px;
      padding-top: 32px;
      background-color: #333;
      color: #FFF;
      text-align: left;
      max-width: 290px;
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
.menu-management-view button.add {
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
