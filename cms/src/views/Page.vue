<template>
  <div class="page">
    <header>
      Frontend Header
    </header>
    <nav>
      <div class="container">
      <ul>
        <li v-for="item in menuitems">
          <a v-bind:href="item.url" :title='"Read more about " + item.name'>
            {{ item.name }}
          </a>
        </li>
      </ul>
      </div>
    </nav>
    <main>
      <h1 v-for="page in pages">{{ page.title }}</h1>
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

let page = [];

// Get Menu Items
var menuItemsRef = db.collection("menus").doc("0").collection("items");

export default {
  name: 'Page',
  components: {
  },
  data () {
    return {
      pages: [],
      menus: [],
      route: this.$route.params.page
    }
  },
  methods: {
    debug() {
    }
  },
  firestore() {
    return {
      pages: pageRef.where("slug", "==", this.$route.params.page),
      menuitems: menuItemsRef
    }
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
