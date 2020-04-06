<template>
  <div class="pages-view">
    <Menu></Menu>
    <div class="content">
    <div class="field">
        <input 
        v-model="page.title"
        @keydown.enter="editField('title')"
        /> 
        
        <h1>{{ page.title }}</h1>
        <p style="text-align: left">{{ page.slug }}</p>
    </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db } from '../../firebase/db.js'
let pageID = null;



export default {
  name: 'Page',
  components: {
    Menu
  },
  data () {
    return {
      pages: []
    }
  },
  methods: {
      editField(field) {
        db.collection("pages").doc("0").update({
            field: this.page.title
        })
      }
  },
  firestore() {
    return {
      page: db.collection("pages").doc(this.$router.app._route.params.id)
    }
  }
}


/*
// @ is an alias to /src
import Menu from '@/components/management/Menu.vue'
import db from '../../firebase/db.js'

// Set page id to null before initializing it later down at created
let pageID = null;


export default {
  name: 'Page',
  components: {
    Menu
  },
  data () {
    return {
      page: [],
    }
  },
  methods: {
      async editField(id) {
        const editText = this.page[0].title.trim();
  		await db.collection('pages').doc(id).set({
			title: editText
		})      
      }
  },
  created() {
    pageID = this.$router.app._route.params.id;
    console.log(pageID);
  },
  firebase: {
    page: db.ref('pages')
  }
}^
*/
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

    input {
        display: block;
        margin: 20px 0;
        font-size: 40px;
        font-weight: bold;
        padding: 10px;
    }
</style>
