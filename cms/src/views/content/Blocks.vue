<template>
  <div class="home">
    <Menu></Menu>
    <div class="content">
    
        <button>Add New Block</button>
        <h1>Blocks</h1>
        This page is for building modular pages
        <div class="v-table">
          <div class="table-header">
            <div class="select-all">
              
                <input type="checkbox" /> Select All
            </div>
            <div class="page-id">
              ID
            </div>
            <div class="page-title">
              Block Name
            </div>
            <div class="page-slug">
              Page Slug
            </div>
          </div>
          <section v-for="block in blocks" :key="block['.key']" class="block-list">
            <div class="row">
              <div class="select">
                <input type="checkbox" />
              </div>
              <div class="page-id">
                {{ block.id }}
              </div>
              <div class="page-title">
                {{ block.title }}
              </div>
              <div class="page-slug">
                {{ block.slug }}
              </div>
            </div>
          </section>
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
  },
  data () {
    return {
      blocks: [
        { id: 1, slug: 'example-slug', title: 'Example Block'},
        { id: 2, slug: 'example-slug-2', title: 'Example 2 Block'}
      ],
    }
  },
}
</script>

<style>
</style>
