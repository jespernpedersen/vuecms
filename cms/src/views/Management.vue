<template>
  <div class="home">
    <Menu></Menu>
    <div class="content">
        <h1>Pages</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'

export default {
  name: 'Management Dashboard',
  components: {
    Menu
  }
}
</script>

<style>
    .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding: 20px 0;
        padding-left: 275px;
    }

    h1 {
        text-align: left;
    }
</style>
