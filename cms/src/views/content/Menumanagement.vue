<template>
  <div class="home">
    <Menu></Menu>
    <div class="content">
        <h1>Menu</h1>
        This is where I will edit menu and change its order
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'

export default {
  name: 'Menu_Management',
  components: {
    Menu
  }
}
</script>

<style>
    .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding: 15px 30px;
        text-align: left;
    }

    h1,
    h3 {
        text-align: left;
    }
</style>
