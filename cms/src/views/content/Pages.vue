<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
    
        <button>Add New Page</button>
        <h1>Pages</h1>
        <div class="v-table">
          <div class="table-header">
            <div class="select-all">
              
                <input type="checkbox" /> Select All
            </div>
            <div class="page-id">
              ID
            </div>
            <div class="page-publish">
              Published
            </div>
            <div class="page-title">
              Page Title
            </div>
            <div class="page-slug">
              Page Slug
            </div>
          </div>
          <section v-for="page in pages" :key="page['.key']" class="row">
              <div class="select">
                <input type="checkbox" />
              </div>
              <div class="page-id">
                {{ page.id }}
              </div>
              <div class="page-published">
                <span v-bind:class="page.published"></span>
              </div>
              <div class="page-title">
                {{ page.title }}
              </div>
              <div class="page-slug">
                {{ page.slug }}
              </div>
          </section>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'
import db from '../../firebase/db.js'

let pagesRef = db.ref('pages');


export default {
  name: 'Management',
  components: {
    Menu
  },
  data () {
    return {
      pages: [],
    }
  },
  firebase: {
    pages: pagesRef
  }
}
</script>

<style>
    .pages-view {
      
  min-height: calc(100vh - 35px);
  display: flex;
    }
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
      padding: 15px;
    }

    .page-title {
      flex: 1 0 auto;
      text-align: left;
    }
    .select-all,
    .select,
    .page-slug,
    .page-publish,
    .page-published {
      text-align: left;
    }

    .page-id {
      min-width: 2%;
    }

    .page-publish,
    .page-published {
      text-align: center;
      min-width: 10%;
    }

    .page-published span {
      width: 10px;
      height: 10px;
      background-color: black;
      border-radius: 100%;
      display: inline-block;
    }

    .page-published span.true {
      background-color: green;
    }

    .page-published span.false {
      background-color: red;
    }
    
    .select-all,
    .select {
      min-width: 8%;
    }

    .v-table .row:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>
