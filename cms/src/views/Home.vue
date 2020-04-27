<template>
  <div class="home">
    <header v-if="header[0]" v-bind:style="{ backgroundColor: header[0].bgcolor }">
      <a href="/">Frontend Header</a>
    </header>
    <nav>
      <div class="container">
      <ul>
        <li v-for="item in menuitems" :key="item.order">
          <a v-bind:href="item.url">{{ item.name }}</a>
        </li>
      </ul>
      </div>
    </nav>
    <main v-for="page in pages">
      <div class="container">
        <h1>{{ page.title }}</h1>
        <p>{{ page.content }}</p>
      </div>
      <section v-for="block in blocks" :key="block.id" v-bind:style="{ backgroundColor: block.bgcolor }">
        <div v-if="block.container" class="container">
          <h3>{{ block.title }}</h3>
          <pre>
            {{ block }}
          </pre>
        </div>
        <div v-if="!block.container" class="fluid-container">
          <h3>{{ block.title }}</h3>  
          <pre>
            {{ block }}
          </pre>
        </div>
      </section>
    </main>
    <footer v-if="footer[0]" v-bind:style="{ backgroundColor: footer[0].bgcolor }">
      Frontend Footer
    </footer>
  </div>
</template>

<script>
import { db, blocksRef, pagesRef } from '../firebase/db.js'
// Get Menu Items
var menuItemsRef = db.collection("menus").doc("0").collection("items");

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      pages: [],
      menus: [],
      blocks: []
    }
  },
  methods: {
    debug() {
    }
  },
  firestore() {
    return {
      pages: pagesRef.where("featured", "==", true),
      menuitems: menuItemsRef,
      blocks: blocksRef.where("blocktype", "==", "content"),
      header: blocksRef.where("blocktype", "==", "header"),
      footer: blocksRef.where("blocktype", "==", "footer")
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
  padding: 30px 0;
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


/* temp */
.home section {
    min-height: 150px;
    background-color: #FFF;
    padding: 15px;
    text-align: left;
    color: #FFF;
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
