<template>
  <div class="filter__wrapper">
    <p>Filtrar por: </p>
    <slot></slot>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'filterComponent'
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .filter{
    display: flex;
    gap: $spacing-md;
  }

  .filter__wrapper{
    width: 100%;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    gap: $spacing-md;
    border-radius: $spacing-md;
    padding: $spacing-md;
  }

</style>