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
    <main v-for="page in pages">
      <div class="container">
        <h1>{{ page.title }}</h1>
        <p>{{ page.content }}</p>
      </div>
    </main>
    <footer>
      Frontend Footer
    </footer>
  </div>
</template>

<script>
import { db } from '../firebase/db.js'
// Get Menu Items
var menuItemsRef = db.collection("menus").doc("0").collection("items");

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      pages: [],
      menus: []
    }
  },
  methods: {
    debug() {
    }
  },
  firestore() {
    return {
      pages: db.collection("pages").where("featured", "==", true),
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  color: #222;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.home nav ul li {
  border: 1px solid #000;
  padding: 15px;
  width: 100%;
}

.home nav ul li a {
  color: inherit;
  text-decoration: none;
}

.home {
  margin-top: 34px;
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

.home main {
  padding: 30px;
}

.home h1 {
  text-align: left;
}

.home main p {
  text-align: left;
  margin-top: 10px;
  font-size: 18px;
}

</style>
