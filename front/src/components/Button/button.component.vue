<template>
  <button type="button" @click="$emit('buttonAction')">{{ label }}</button>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'buttonComponent',
    emits: ['buttonAction'],
    props: {
      label: {
        type: String
      }
    }
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';
</style>