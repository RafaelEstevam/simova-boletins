<template>
  <RouterView />
</template>

<script setup>
  import { RouterView } from 'vue-router'
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';
  
  body{
    background-color: $light-color;
  }

  .view{
    width: 100%;
    height: 100vh;
  }

</style>