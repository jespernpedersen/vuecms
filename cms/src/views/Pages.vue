<template>
  <div class="home">
    <Menu></Menu>
    <div class="content">
        <h1>Pages</h1>
        <div class="v-table">
          <div class="table-header">
            <div class="select-all">
              Select All
            </div>
            <div class="page-id">
              ID
            </div>
            <div class="page-title">
              Title
            </div>
            <div class="page-slug">
              Page Slug
            </div>
          </div>
          <section v-for="page in pages" :key="page['.key']" class="page-list">
            <div class="row">
              <div class="select">
                Select
              </div>
              <div class="page-id">
                {{ page.id }}
              </div>
              <div class="page-title">
                {{ page.title }}
              </div>
              <div class="page-slug">
                {{ page.slug }}
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
  name: 'Management',
  components: {
    Menu
  },
  data () {
    return {
      pages: [
        { id: 1, slug: 'example-slug', title: 'Example Page'}
      ],
    }
  },
}
</script>

<style>
    .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 275px;
        padding-right: 30px;
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
      min-width: 10%;
      text-align: left;
    }
</style>
