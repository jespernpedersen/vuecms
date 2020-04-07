<template>
  <div class="home">
    <header>
      Frontend Header
    </header>
    <main>
      <h1 class="title">{{ page[0].title }}</h1>
      <p v-if="page[0].content" class="description">{{ page[0].content }}</p>
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


var pageRef = db.collection("pages")

var query = pageRef.where("featured", "==", true);

// let query = db.collection("pages").doc("0")

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      page: [],
    }
  },
  firestore() {
    return {
      page: query,
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
button {
  background-color: green;
  color: #FFF;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
}

header, main, footer {
  width: 100%;
}

header {
  background-color: teal;
  padding: 30px 0;
  color: #FFF;
}

.title {
  text-align: center;
  background-color: #ccc;
  padding: 20px 0;
  color: #222;
}

.description {
  background-color: lightblue;
  padding: 20px 0;
}

main {
  background-color: #ebebeb;
  flex: 1 0 auto;
}

footer {
  background-color: #222;
  padding: 30px 0;
  color: #FFF;
}

</style>
