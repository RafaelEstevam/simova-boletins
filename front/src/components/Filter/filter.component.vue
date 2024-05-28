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

    @media(max-width: $screen-sm){
      flex-direction: column;
      width: 100%;
    }
  }

  .filter__wrapper{
    width: 100%;
    display: flex;
    align-items: center;
    gap: $spacing-md;
    border-radius: $spacing-md;
    padding: $spacing-md;
    background-color: $primary-color-light;
    @media(max-width: $screen-sm){
      flex-direction: column;
    }
  }

</style>