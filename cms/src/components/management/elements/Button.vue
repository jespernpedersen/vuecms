<template>
<div class="element-button">
    <span class="tooltip">Button</span>   
    <div class="button-wrapper">
        <ul class="settings">
            <li class="delete" @click="DeleteElement(blockid, elementid)">Delete</li>
        </ul>
        <div class="setting-text">
            <input v-model="text" class="button" input="text"  @change="UpdateElement(text, blockid, elementid, 'text')" />
        </div>                        
        <div class="setting-link expanded">
            <label>Link: </label>
            <input v-model="link" type="text" @change="UpdateElement(link, blockid, elementid, 'link')" />
        </div>
    </div>
</div>
</template>
<script>

export default {
  name: 'ElementButton',
  props: ['text', 'link', 'blockid', 'elementid'],
  methods: {
      UpdateElement(value, blockid, elementid, setting) {
        // Get Parent
        let parent = this.$parent.$parent.$parent;  
        let blocks = parent.blocks
        let element = blocks[blockid].elements[elementid]
        // Update Element Text
        if(setting == "text") {
            element.button_text = value;
        }
        else if(setting == "link") {
            element.button_link = value;
        }
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
    .element-button .button-wrapper {
        border: 3px solid transparent;
        transition: 0.3s ease-in-out;
        overflow: hidden;
        margin-bottom: 30px;
        background-color: transparent;
    }
    .element-button > .tooltip {
        opacity: 0;
        height: 0px;
        width: 0px;
        display: inline-block;
        transition: 0.3s ease-in-out;
        background-color: #FFF;
    }
    .element-button:hover > .tooltip {
        width: auto;
        height: auto;
        opacity: 1;
        padding: 8px 20px;
        color: #000;
    }
    .element-button .button {
        border-radius: 20px;
        padding: 15px 25px;
        background-color: rgba(0,0,0, 0.8);
        -webkit-appearance: none;
        color: #FFF;
        margin-bottom: 20px;
        background-image: none;
        border: none;
        outline: none;
    }
    .element-button label {
        width: 100%;
        display: block;
        margin-bottom: 10px;
    }
    .element-button .button-wrapper:hover {
        border-color: rgba(255, 255, 255, 0.7);
        background-color: #7b7b7b;
        padding: 15px;
    }
    .setting-link input[type="text"] {
        display: inline-block;
        width: auto;
        padding: 10px 25px;
        border-radius: 8px;
        border: none;
    }
    /* Expansion Styling */
    .element-button .expanded {
        display: none;
    }
    .element-button.active .expanded,
    .element-button:hover .expanded {
        display: block;
    }
    /* Settings Toolbar */
    .settings {
        opacity: 0;
        transition: 0.3s ease-in-out;
        list-style: none;
        padding: 10px 0;
        color: #FFF;
    }
    .settings .delete {
        cursor: pointer;
    }
    
    .element-button:hover .settings {
        opacity: 1;
        height: auto;
    }
    .element-button:hover .settings {
        opacity: 1;
    }
</style>