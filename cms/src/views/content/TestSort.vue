<template>
  <div class="fluid container">
    <div class="form-group form-group-lg panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Sortable control</h3>
      </div>
      <div class="panel-body">
        <div class="checkbox">
          <label><input type="checkbox" v-model="editable">Enable drag and drop</label>
        </div>
        <button type="button" class="btn btn-default" @click="SaveMenu(menus, defaultMenus)">Save Menus</button>

      </div>
    </div>
    
    
    <nav v-for="menu in menus" :key="menu['.key']" class="menu">
        <div class="col-md-3">
        {{ menu.name }}
        <draggable class="list-group" tag="ul" v-model="menu.items" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="item in menu.items" :key="item.order">
                {{ item.name }}
                <span class="number"> {{item.order }} </span>
            </li>
            </transition-group>
        </draggable>
        </div>
    </nav>

    <div class="list-group col-md-6">
      <pre>{{ menus[0] }}</pre>
    </div>
    <div class="list-group col-md-6">
      <pre>{{ menus[1] }}</pre>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { db, menusRef, pagesRef } from '../../firebase/db.js'

// Get Menu Data
let getMenus = [];
let getDefaultMenus = [];

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];


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
    draggable
  },
  data() {
    return {
      menus: getMenus,
      defaultMenus: getDefaultMenus,
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
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

        if(hasDeleted == true) {
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

      /*
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
              let slug = page.title.replace(/\s+/g, '-').toLowerCase()

              // Update Database
              menuItemRef.doc(newMenuItemRef).set({
                "id": newMenuItemId,
                "name": page.title,
                "url": slug,
                "reference": page.id
              })
              // Vuefire doesn't allow for dynamic adding of subcollections without page reload, so we will force it here
              menu.items.push({
                  "id": newMenuItemId,
                  "name": page.title,
                  "url": slug,
                  "reference": page.id
              })

            })
          }
          else {
              let slug = page.title.replace(/\s+/g, '-').toLowerCase()
              // Update Database
              menuItemRef.doc("0").set({
                "id": newMenuItemRef,
                "name": page.title,
                "url": slug,
                "reference": page.id
              })     
          }
        })
    */
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
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
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
</style>