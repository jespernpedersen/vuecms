<template>
    <div class="element-image"> 
        <span class="tooltip">Image</span>   
        <div class="element">
            <ul class="settings">
                <li class="delete" @click="DeleteElement(blockid, elementid)">Delete</li>
            </ul>
            <figure>
                <img v-bind:src="path" :title="name" />               
            </figure>
        </div>
    </div>
</template>
<script>

export default {
  name: 'ElementText',
  props: ['path', 'name', 'blockid', 'elementid'],
  methods: {
      DeleteElement(blockid, elementid) {
        // Get All Blocks
        if(this.$parent.$parent.$parent.blocks != undefined) {
            let blocks = this.$parent.$parent.$parent.blocks
            // Get the Specific Element
            let element = blocks[blockid].elements;
            // Delete
            element.splice(elementid, 1)
            this.$parent.$parent.$parent.notifyChanges()
        }
        else {
            console.log(this.$parent.block)
            this.$parent.block.elements.splice(elementid, 1)
            this.$parent.notifyChanges()
        }
      }
  }
}
</script>

<style>
    .element-image {
        margin-bottom: 10px;
        transition: 0.3s ease-in-out;
        color: inherit;
    }

    .element-image > .tooltip {
        opacity: 0;
        height: 0px;
        width: 0px;
        display: inline-block;
        transition: 0.3s ease-in-out;
        background-color: #FFF;
    }

    .element-image .element {
        padding: 0;
        transition: 0.3s ease-in-out;
    }

    .element-image:hover .element {
        border: 3px solid #FFF;
        padding: 15px;
    }

    .element-image:hover > .tooltip {
        width: auto;
        height: auto;
        opacity: 1;
        padding: 8px 20px;
        color: #000;
    }

    .settings {
        opacity: 0;
        transition: 0.3s ease-in-out;
        list-style: none;
        padding: 10px 0;
        height: 0;
    }

    .settings .delete {
        cursor: pointer;
    }
    .element-image:hover .settings {
        opacity: 1;
        height: auto;
    }
</style>