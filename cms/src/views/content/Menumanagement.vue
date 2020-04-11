<template>
  <div class="menu-management-view">
    <Menu></Menu>
    <div class="content">
        <h1>Menu</h1>
        <p>This is where I will edit menu and change its order</p>
        <section v-for="menu in menus" :key="menu['.key']" class="menu">
          <div class="menu-id">{{ menu.id }}</div>
          <div class="menu-name">{{ menu.name }}</div>
          <ul v-for="item in singleMenu" class="menu-items">
              <li> {{ item.name }} </li>
              
          </ul>
          
          
        <button @click="debug(menu)">Debug</button>
        </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'
import { db } from '../../firebase/db.js'

let pageRef = db.collection("pages");
let menuRef = db.collection("menus");
let singleMenuRef = db.collection("menus").doc("0").collection("items");

let menus = [];

// Function for querying all subcollections - this will be used to get every menu item inside multiple menus
// Get Collection
menuRef.orderBy("id", "asc").get().then(function(querySnapshot) {
  // Get Every First Level Documents (i.e. menus)
  querySnapshot.forEach(function(doc) {
    // Main Collection
    menus.push(doc);
    // console.log(menus);
    
    // Sub Collections
    menuRef.doc(doc.id).collection("items").get().then(function(subquerySnapshot) {
      let this_menu = doc.id;
      subquerySnapshot.forEach(function(subdoc) {
          // menus.this_menu.push(subdoc);
          console.log(this_menu);
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
      pages: [],
      menus: [],
      singleMenu: []
    }
  },
  methods: {
    async debug(item) {
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
      pages: pageRef,
      menus: menuRef,
      singleMenu: singleMenuRef
    }
  }
}
</script>

<style>
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

    .menu {
      margin: 30px 0;
      background-color: #CCC;
      text-align: left;
      padding: 30px;
    }

    .menu ul {
      margin-left: 30px;
    }


    h1,
    h3,
    p {
        text-align: left;
    }
</style>
