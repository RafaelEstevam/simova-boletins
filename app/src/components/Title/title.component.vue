<template>
  <h2>{{ title }}</h2>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'titleComponent',
    props: {
      title: {
        default: 'Title'
      }
    },
  });
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';
</style>