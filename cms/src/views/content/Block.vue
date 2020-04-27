<template>
  <div class="blocks-view">
    <Menu></Menu>
    <div class="content">

        <div class="fluid container">
            <section v-bind:style="{ backgroundColor: block.bgcolor }">
                <h1>
                    {{ block.title }}
                </h1>
                <div v-for="index in block.columns">
                    Column
                </div>
            </section>
            <pre>
                {{ block }}
            </pre>
        
            <div v-bind:class="{ active: unsavedChanges}">
                <div class="notification">
                    <h3 style="text-align: center;">You've unsaved changes!</h3>
                    <button type="button" class="btn btn-default" @click="SaveBlock(menus, defaultMenus)">Save Menus</button>
                </div>
            </div>
        </div>
    </div>
    <aside class="global-settings">
        <h2>Global Settings</h2>
        <ul>
            <li>Internal Title: {{ block.title }}</li>
            <li>Visibility State: <span v-if="block.published">Published</span><span v-if="!block.published">Unpublished</span></li>
            <li>Background Color: {{ block.bgcolor }} <input v-model="block.bgcolor" type="color" /></li>
        </ul>
    </aside>
  </div>
</template>

<script>
import Menu from '@/components/management/Menu.vue'
import { db, blocksRef } from '../../firebase/db.js'

export default {
  name: 'Block',
  components: {
    Menu
  },
  data () {
    return {
      block: [],
      unsavedChanges: false
    }
  },
  methods: {
      /*
      editField(fieldType, field) {
        if(fieldType == "title") {
          blocksRef.doc(this.$router.app._route.params.id).update({
            title: this.page.title
          })
        }
        else if(fieldType == "content") {
          blocksRef.doc(this.$router.app._route.params.id).update({
            content: this.page.content
          })
        }
        else {
            alert("Error. Could not find field");
        }
      }
      */
  },
  firestore() {
    return {
      block: blocksRef.doc(this.$router.app._route.params.id),
    }
  },
  computed: {
      sectionStyle() {
          return {
              "background-color": '#222'
          }
      }
  }
}
</script>

<style>
    .blocks-view {
      min-height: calc(100vh - 35px);
      display: flex;
    }
    .blocks-view .content {
        flex: 1 0 auto;
        background-color: #ebebeb;
        padding-left: 350px;
        padding-top: 50px;
        padding-right: 30px;
    }
    

    .blocks-view section {
        height: 200px;
        padding: 30px;
        text-align: left;
        color: #FFF;
    }

    aside.global-settings {
        min-width: 300px;
        padding-top: 50px;
        box-sizing: border-box;
    }

    aside.global-settings ul {
        list-style: none;
        text-align: left;
    }

    aside.global-settings ul li {
        padding: 15px 30px;
        color: #000;
        
        background-color: rgba(0,0,0,0.2);
    }

    aside.global-settings h2 {
        margin-bottom: 25px;
    }

    aside.global-settings ul li:nth-of-type(odd) {
        background-color: rgba(0,0,0,0.3);
    }


.fluid.container {
    min-height: 100%;
    position: relative;
    overflow: hidden;
}
.notification {
    position: absolute;
    max-width: 900px;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: -15%;
    transition: 0.3s ease-in-out;
    background-color: rgba(0,0,0,0.4);
    padding: 15px;
    border-radius: 8px;
    color: #FFF;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification .btn {
    background-color: #42b853;
    border-color: #42b853;
    padding: 5px 20px;
    font-size: 16px;
    color:  #FFF;
}

.active .notification {
    bottom: 2%;
}
</style>
