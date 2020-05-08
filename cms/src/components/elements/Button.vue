<template>
<div class="element-button">
    <div class="button-setting">
        <label>Button Text: </label>
        <input v-model="text" />
    </div>                        
    <div class="button-setting">
        <label>Button Link: </label>
        <input v-model="link" />
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
</style>