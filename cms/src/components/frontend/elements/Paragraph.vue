<template class="text-element">
    <div >
        <p>{{ text }} </p>
    </div>
</template>
<script>

export default {
  name: 'Paragraph',
  props: ['text'],
  methods: {
  }
}
</script>

<style>
    p {
        color: inherit;
        font-size: 16px;
    }
</style>