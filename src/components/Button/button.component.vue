<template>
  <button type="button" @click="$emit('buttonAction')">Label</button>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'buttonComponent',
    emits: ['buttonAction'],
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';
</style>