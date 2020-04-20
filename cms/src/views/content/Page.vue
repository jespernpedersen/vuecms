<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
        <div class="field">
            <label>Title</label>
            <input class="title"
            v-model="page.title"
            @keydown.enter="editField('title', this)"
            />
        </div>
        <div class="field">
            <label>Content</label>
            <textarea
                v-model="page.content"
                @keydown.enter="editField('content')"
            ></textarea>
        </div>
        
    </div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db, pagesRef } from '../../firebase/db.js'

export default {
  name: 'Page',
  components: {
    Menu
  },
  data () {
    return {
      pages: [],
    }
  },
  methods: {
      editField(fieldType, field) {
        if(fieldType == "title") {
          pagesRef.doc(this.$router.app._route.params.id).update({
            title: this.page.title
          })
        }
        else if(fieldType == "content") {
          pagesRef.doc(this.$router.app._route.params.id).update({
            content: this.page.content
          })
        }
        else {
            alert("Error. Could not find field");
        }
      }
  },
  firestore() {
    return {
      page: pagesRef.doc(this.$router.app._route.params.id),
    }
  }
}
</script>

<style>
    .pages-view {
      min-height: calc(100vh - 35px);
      display: flex;
    }
    .pages-view .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
    }

    .pages-view h1 {
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

    input,
    textarea {
        display: inline-block;
        margin: 5px 0;
        padding: 10px;
        vertical-align: middle;
        width: 50%;
    }

    textarea {
        min-height: 900px;
    }

    input.title {
        font-size: 40px;
        font-weight: bold;
    }

    .field {
        display: block;
        text-align: left;
        margin-bottom: 20px;
    }

    .field label {
        width: 100%;
        display: inline-block;
    }
</style>
