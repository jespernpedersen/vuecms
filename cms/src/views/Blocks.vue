<template>
  <div class="home">
    <Menu></Menu>
    <div class="content">
        <h1>Blocks</h1>
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

    .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding: 15px 30px;
    }

    h1 {
        text-align: left;
    }

    .v-table {
      margin-top: 30px;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      font-weight: bold;
      background-color: #FFF;
    }

    .v-table .row {
      display: flex;
      justify-content: space-between;
      text-align: center;
      padding: 10px 15px;
    }

    .page-title {
      flex: 1 0 auto;
      text-align: left;
    }
    .select-all,
    .select,
    .page-id,
    .page-slug {
      min-width: 8%;
      text-align: left;
    }
    
    .select-all,
    .select {
      min-width: 8%;
    }
</style>
