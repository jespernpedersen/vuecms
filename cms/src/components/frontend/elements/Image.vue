<template>
    <figure>
        <img v-bind:src="path" :title="name" />     
    </figure>
</template>
<script>

export default {
  name: 'Image',
  props: ['path', 'name'],
  methods: {
  }
}
</script>

<style>
    figure img {
        max-width: 100%;
    }
</style>