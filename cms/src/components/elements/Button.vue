<template>
<div class="element-button">
    <div class="setting-text">
        <input v-model="text" class="button" input="text" />
    </div>                        
    <div class="setting-link expanded">
        <label>Link: </label>
        <input v-model="link" type="text" />
    </div>
</div>
</template>
<script>

export default {
  name: 'ElementButton',
  props: ['text', 'link']
}
</script>

<style>
    .element-button {
        border: 3px solid transparent;
        transition: 0.3s ease-in-out;
        overflow: hidden;
        margin-bottom: 30px;
        background-color: transparent;
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
    .element-button:hover {
        border-color: rgba(255, 255, 255, 0.7);
        background-color: #7b7b7b;
        
        padding: 15px;
    }
    .element-button .expanded {
        display: none;
    }
    .element-button.active .expanded,
    .element-button:hover .expanded {
        display: block;
    }
    .setting-link input[type="text"] {
        display: inline-block;
        width: auto;
        padding: 10px 25px;
        border-radius: 8px;
        border: none;
    }
</style>