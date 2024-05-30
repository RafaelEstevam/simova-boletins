<template>
  <div class="datatable__content__no__data">
    <p class="datatable__content__no__data__text">Sem dados para exibir</p>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'errorDatatableComponent'
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .datatable__content__no__data {
    width:100%;
    display: flex;
    justify-content: center;
    background: $danger-color-light;
    border-radius: $spacing-md;
    padding: $spacing-md;
  }

  .datatable__content__no__data__text {
    color: $gray-color;
    font-weight: 600;
  }
</style>