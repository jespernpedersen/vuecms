<template>
<div class="button-element">
    <a v-bind:href="'/' + link">{{ text }}</a>
</div>
</template>
<script>

export default {
  name: 'ButtonLink',
  props: ['text', 'link']
}
</script>

<style>
    .button-element a {
        border-radius: 20px;
        padding: 15px 25px;
        background-color: rgba(0,0,0, 0.8);
        color: #FFF;
        margin-bottom: 20px;
        background-image: none;
        border: none;
        outline: none;
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
    }
</style>