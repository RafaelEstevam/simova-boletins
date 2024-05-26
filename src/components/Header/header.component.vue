<template>
  <header class="header">
    <h1>Simova Boletins</h1>
    <!-- <filterComponent /> -->
    <h2>Acesso administrativo</h2>
  </header>
</template>

<script>
  import { defineComponent } from 'vue';
  import FilterComponent from '../Filter/filter.component.vue';

  export default defineComponent({
    name: 'headerComponent',
    components: {
      FilterComponent
    }
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .header{
    width: 100%;
    padding: $spacing-md;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>