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
