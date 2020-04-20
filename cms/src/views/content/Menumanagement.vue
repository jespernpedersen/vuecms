<template>
  <div class="menu-management-view">
    <Menu></Menu>
    <div class="content">
        <div class="fluid container">
            <nav class="col-md-4">
                <h2 style="text-align: left">Pages</h2>
                <draggable class="list-group" tag="ul" v-model="pages" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                    <li class="list-group-item" v-for="page in pages" :key="page.order">
                        {{ page.name }}
                        <span class="number"> {{ page.order }} </span>
                    </li>
                    </transition-group>
                </draggable>
                <!-- <pre style="text-align: left">{{ pages }}</pre> -->
            </nav>
            
            <nav v-for="menu in menus" :key="menu['.key']" class="col-md-4">
                <h2 style="text-align: left">{{ menu.name }}</h2>
                <draggable class="list-group" tag="ul" v-model="menu.items" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                    <li class="list-group-item" v-for="item in menu.items" :key="item.order">
                        {{ item.name }}
                        <span class="number"> {{item.order }} </span>
                    </li>
                    </transition-group>
                </draggable>
                <!-- <pre style="text-align: left">{{ menu }}</pre> -->
            </nav>
            <div v-bind:class="{ active: unsavedChanges}">
            <div class="notification">
                <h3 style="text-align: center;">You've unsaved changes!</h3>
                <button type="button" class="btn btn-default" @click="SaveMenu(menus, defaultMenus)">Save Menus</button>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import draggable from "vuedraggable";
import { db, menusRef, pagesRef } from '../../firebase/db.js'

// Get Menu Data
let getMenus = [];
let getDefaultMenus = [];
let getpageMenu = [];

let visiblePagesRef = pagesRef.where("published", "==", true);


pagesRef.onSnapshot({ includeMetadataChanges: true },function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        let pageData = doc.data();
        // console.log(pageData)

        let slug = pageData.title.replace(/\s+/g, '-').toLowerCase()

        // Construct data
        let pagesArray = {
          id: pageData.id, // id
          name: pageData.title, // title
          url: slug, // title to slug
          order: pageData.id // id
        }

        // Add menu items to object
        getpageMenu.push(pagesArray);
    })
})

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
          url: item.url,
          order: item.order
        }

        // Add menu items to object
        getMenus[doc.id]['items'].push(itemsArray);
      });
    });
  });
});

// All our old menus
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
    getDefaultMenus.push(menuArray);

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
          url: item.url,
          order: item.order
        }

        // Add menu items to object
        getDefaultMenus[doc.id]['items'].push(itemsArray);
      });
    });
  });
});

export default {
  name: "hello",
  components: {
    Menu, draggable
  },
  data() {
    return {
      menus: getMenus,
      defaultMenus: getDefaultMenus,
      pages: getpageMenu,
      editable: true,
      isDragging: false,
      delayedDragging: false,
      unsavedChanges: false
    };
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    async SaveMenu(menus, defaultMenus) {
        // menus = current object
        // oldmenus = old object

        let hasDeleted = false;

        // Because of incompatiblity between menus, we will start by deleting the old way of things and then insert it
        // We have to delete per document, instead of collection per Firestore
        defaultMenus.forEach(function(defaultMenu) {
            // Delete
            let menu = defaultMenu['items']
            let menuid = defaultMenu.id
            menu.forEach(function(item) {
                menusRef.doc(String(menuid)).collection("items").doc(String(item.id)).delete()
                hasDeleted = true
            })
        })
        // If the menus have been deleted
        if(hasDeleted == true) {
            // Then we add in all the menu items
            menus.forEach(function(menu) {
                menu.items.forEach(function(item) {
                    let menuID = String(menu.id)
                    menu.items.forEach(function(item) {
                        let itemID = String(item.id)
                        menusRef.doc(menuID).collection("items").doc(itemID).set({
                            "id": item.id,
                            "name": item.name,
                            "order": item.order,
                            "url": item.url
                        })
                        hasDeleted = false
                    })
                })
            })
        }
        else {
            alert("Nothing to save")
        }
        this.unsavedChanges = false
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
        
        this.unsavedChanges = true
      });
    }
  },
};
</script>

<style>
.fluid.container {
    padding-top: 50px;
}

.col-md-3 {
    width: 25%;
    float: left;
    padding-right: 15px;
    padding-left: 15px;
}

.col-md-4 {
    width: 33%;
    float: left;
    padding-right: 15px;
    padding-left: 15px;
}

.col-md-6 {
    width: 50%;
    float: left;
    padding-right: 15px;
    padding-left: 15px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.number {
    background-color: #222;
    color: white;
    float: right;
    border-radius: 100%;
    padding: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.form-group.form-group-lg.panel.panel-default {
    float: left;
    width: 100%;
}

.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}

pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 30px;
}

.btn-default {
    color: #333;
    background-color: #fff;
    border-color: #ccc;
}

.radio, .checkbox {
    position: relative;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
}

.panel-body {
    padding: 15px;
}

.panel-default > .panel-heading {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
}

.list-group {
  min-height: 20px;
  list-style: none;
  text-align: left;
}

.list-group-item {
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
    color: #222;
}

.list-group-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.list-group-item {
    cursor: move;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
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
.menu-management-view form {
      text-align: left;
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
      color: #FFF;
      text-align: left;
      max-width: 290px;
      color: #222;
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
.menu-management-view button.add {
        background-color: green;
        color: #FFF;
        border: none;
        padding: 12px 20px;
        cursor: pointer;
        margin-top: 10px;
        display: inline-block;
}

/* Unsaved Changes */

.fluid.container {
    min-height: 100%;
    position: relative;
    overflow: hidden;
}

.notification {
    position: absolute;
    max-width: 900px;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: -15%;
    transition: 0.3s ease-in-out;
    background-color: rgba(0,0,0,0.4);
    padding: 15px;
    border-radius: 8px;
    color: #FFF;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification .btn {
    background-color: #42b853;
    border-color: #42b853;
    padding: 5px 20px;
    font-size: 16px;
    color:  #FFF;
}

.active .notification {
    bottom: 2%;
}



</style>