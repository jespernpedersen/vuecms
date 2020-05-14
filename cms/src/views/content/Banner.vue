<template>
  <div class="banner">
    <Menu></Menu>
    <div class="content">
        <h1>Banner</h1>
        This is where I will create a banner functionality that can be toggled off and on and have a preview here, with various functionality
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
    
    
  <div class="version">Control Seat Alpha 0.4.5</div>
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
</style>
