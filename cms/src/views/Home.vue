<template>
  <div class="home">
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
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { db } from '../firebase/db.js'


// Find frontpage page
var pageRef = db.collection("pages")
var query = pageRef.where("featured", "==", true);

let page = [];

// Get Menu Items
var menuItemsRef = db.collection("menus").doc("0").collection("items");



export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      pages: [],
      menus: []
    }
  },
  firestore() {
    return {
      pages: query,
      menuitems: menuItemsRef
    }
  }
}
</script>

<style>
.home {
  min-height: calc(100vh - 35px);
  display: flex;
  flex-direction: column;
}

.home header, main, footer {
  width: 100%;
}

.home header {
  background-color: teal;
  padding: 30px 0;
  color: #FFF;
}

.home .title {
  text-align: center;
  background-color: #ccc;
  padding: 20px 0;
  color: #222;
}

.home .description {
  background-color: lightblue;
  padding: 20px 0;
}

.home main {
  background-color: #ebebeb;
  flex: 1 0 auto;
}

.home nav {
  padding: 20px 0;
}

.home nav ul {
  display: flex;
  color: #222;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.home nav ul li {
  
  border: 1px solid #000;
  padding: 15px;
}

.home {
  margin-top: 35px;
}

.home nav ul li:not(:last-of-type) {
  margin-right: 20px;
}

.home footer {
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
