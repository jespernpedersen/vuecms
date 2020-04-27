<template>
  <div class="blocks-view">
    <Menu></Menu>
    <div class="content">

        <div class="fluid container">
            <section v-bind:style="{ backgroundColor: block.bgcolor, color: block.textcolor }">
                <h1>
                    {{ block.title }}
                </h1>
                <textarea v-model="block.textcontent" placeholder="Type here the contents of the block" :style="{'--placeholder-color': block.textcolor }" @change="notifyChanges()">
                </textarea>
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
                    <button type="button" class="btn btn-default" @click="SaveBlock(block)">Save Menus</button>
                </div>
            </div>
        </div>
    </div>
    <aside class="global-settings">
        <h2>Global Settings</h2>
        <ul>
            <li>Block Title: {{ block.title }}</li>
            <li>Visibility State: <input v-model="block.published" type="checkbox" @change="notifyChanges()"><span v-if="block.published">Published</span><span v-if="!block.published">Unpublished</span></li>
            <li>Background Color: {{ block.bgcolor }} <input v-model="block.bgcolor" type="color" @change="notifyChanges()"/></li>
            <li>Container: <input v-model="block.container" type="checkbox" @change="notifyChanges()"></li>
            <li>Text Color: {{ block.textcolor }} <input v-model="block.textcolor" type="color" @change="notifyChanges()"/></li>
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
      notifyChanges() {
          this.unsavedChanges = true
      },
      async SaveBlock(block) {
        // Firebase wants document ref always to be a string, so we will need to convert it
        let blockId = String(block.id)

        // Construct what we want to be able to change/update
        blocksRef.doc(blockId).update({
             bgcolor: block.bgcolor,
             bgimage: block.bgimage,
             columns: block.columns,
             published: block.published,
             title: block.title,
             container: block.container,
             textcolor: block.textcolor,
             textcontent: block.textcontent
        })
        // We want to hide the notification of unsaved changes when we have saved to database
        this.unsavedChanges = false
      }
  },
  firestore() {
    return {
      block: blocksRef.doc(this.$router.app._route.params.id),
    }
  },
}
</script>

<style>
    .blocks-view {
        min-height: 100vh;
        display: flex;
        padding-top: 34px;
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

    .blocks-view textarea {
        width: 100%;
        background-color: transparent;
        border: none;
          --placeholder-color: #f0f;
        color: var(--placeholder-color);
        font-size: 16px;
        font-family: inherit;
        outline: none;
    }

    .blocks-view textarea::-webkit-input-placeholder {
        color: inherit !important;
    }
    
    .blocks-view textarea:-moz-placeholder { /* Firefox 18- */
        color: inherit !important;  
    }
    
    .blocks-view textarea::-moz-placeholder {  /* Firefox 19+ */
        color: inherit !important;  
    }
    
    .blocks-view textarea:-ms-input-placeholder {  
        color: inherit !important;  
    }

    aside.global-settings {
        min-width: 300px;
        padding-top: 30px;
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
