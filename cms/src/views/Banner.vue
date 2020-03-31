<template>
  <div class="home">
    <Menu></Menu>
    <div class="content">
        <h1>Banner</h1>
        <div class="enable-banner">
        <form>
            <label>Enable Banner</label><input type="checkbox">
        </form>
        </div>
        <h3>Preview: </h3>
        <div class="preview-banner">
            <div class="banner">

            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'

export default {
  name: 'Blocks',
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
