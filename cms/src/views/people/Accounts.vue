<template>
  <div class="home">
    <Menu></Menu>
    <div class="content">
        <h1>Accounts</h1>
        This will be a list of accounts that can log into this website
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'

export default {
  name: 'Accounts',
  components: {
    Menu
  }
}
</script>

<style>
</style>
