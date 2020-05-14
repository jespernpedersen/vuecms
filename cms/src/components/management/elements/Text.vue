<template>
    <div class="element-text"> 
        <span class="tooltip">Text</span>   
        <div class="element">
            <ul class="settings">
                <li class="delete" @click="DeleteElement(blockid, elementid)">Delete</li>
            </ul>
            <textarea type="text"  placeholder="Start med at skrive ved at klikke her" v-model="text" @change="UpdateElement(text, blockid, elementid)">
            </textarea>
        </div>
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
        element.splice(elementid, 1)
        parent.notifyChanges()
      }
  }
}
</script>

<style>
    .element-text {
        margin-bottom: 10px;
        transition: 0.3s ease-in-out;
        color: inherit;
    }

    .element-text > .tooltip {
        opacity: 0;
        height: 0px;
        width: 0px;
        display: inline-block;
        transition: 0.3s ease-in-out;
        background-color: #FFF;
    }

    .element-text .element {
        padding: 0;
        transition: 0.3s ease-in-out;
    }

    .element-text:hover .element {
        border: 3px solid #FFF;
        padding: 15px;
    }

    .element-text:hover > .tooltip {
        width: auto;
        height: auto;
        opacity: 1;
        padding: 8px 20px;
        color: #000;
    }

    .element-text textarea {
        white-space: pre-wrap;
        font-size: 16px;
        color: inherit;
        background-color: transparent;
        -webkit-appearance: none;
        border: none;
        background-image: none;
        transition: 0.3s ease-in-out;
        padding: 10px 0;
        height: auto;
        -webkit-appearance: none;
  
        font-family: inherit;
        outline: none;      
        width: 100%;
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
    .element-text textarea:focus {
        padding: 30px;
        outline: none;
        border-left: 3px solid rgba(255, 255, 255, 0.9)
    }
    .element-text textarea::-webkit-textarea-placeholder {
        color: inherit !important;
    }
    
    .element-text textarea:-moz-placeholder { /* Firefox 18- */
        color: inherit !important;  
    }
    
    .element-text textarea::-moz-placeholder {  /* Firefox 19+ */
        color: inherit !important;  
    }
    
    .element-text textarea:-ms-textarea-placeholder {  
        color: inherit !important;  
    }
</style>