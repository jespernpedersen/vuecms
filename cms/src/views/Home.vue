<template>
  <div class="home">
    <header>
      Frontend Header
    </header>

    <main>
      Frontend Main
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
  }
}
</script>

<style>
.home {
  min-height: 100vh;
  display: flex;
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
</style>
