<template>
    <div class="element-text">    
        <ul class="settings">
            <li class="delete" @click="DeleteElement(blockid, elementid)">Delete</li>
        </ul>
        <input type="text"  placeholder="Start med at skrive ved at klikke her" v-model="text" @change="UpdateElement(text, blockid, elementid)">
    </div>
</template>
<script>

export default {
  name: 'ElementText',
  props: ['text', 'blockid', 'elementid'],
  methods: {
      UpdateElement(text, blockid, elementid) {
        // Get Parent
        let parent = this.$parent.$parent.$parent;  
        let blocks = parent.blocks
        let element = blocks[blockid].elements[elementid]
        // Update Element Text
        element.text = text;
        // Notify New Changes
        parent.notifyChanges()
      },
      DeleteElement(blockid, elementid) {
        // Get Parent
        let parent = this.$parent.$parent.$parent;
        // Get All Blocks
        let blocks = parent.blocks
        // Get the Specific Element
        let element = blocks[blockid].elements;
        // Delete
        element.splice(elementid)
        parent.notifyChanges()
      }
  }
}
</script>

<style>
    .element-text {
        margin-bottom: 10px;
    }
    .element-text input {
        white-space: pre-wrap;
        font-size: 16px;
        color: inherit;
        background-color: transparent;
        -webkit-appearance: none;
        border: none;
        background-image: none;
        transition: 0.3s ease-in-out;
        padding: 10px 0;
    }
    .settings {
        opacity: 0;
        transition: 0.3s ease-in-out;
        list-style: none;
        padding: 10px 0;
    }
    .settings .delete {
        cursor: pointer;
    }
    .element-text:hover .settings {
        opacity: 1;
    }
    .element-text input:focus {
        padding: 30px;
        outline: none;
        border-left: 3px solid rgba(255, 255, 255, 0.9)
    }
    .element-text input::-webkit-input-placeholder {
        color: inherit !important;
    }
    
    .element-text input:-moz-placeholder { /* Firefox 18- */
        color: inherit !important;  
    }
    
    .element-text input::-moz-placeholder {  /* Firefox 19+ */
        color: inherit !important;  
    }
    
    .element-text input:-ms-input-placeholder {  
        color: inherit !important;  
    }
</style>