<template>
  <div class="home">
    <header>
      Frontend Header
    </header>
    <main>
    </main>
    <footer>
      Frontend Footer
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      page: [],
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

main {
  background-color: #ebebeb;
  padding: 30px 0;
  flex: 1 0 auto;
}

footer {
  background-color: #222;
  padding: 30px 0;
  color: #FFF;
}

</style>
