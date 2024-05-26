<template>
  <div class="datatable__header">
    <div class="datatable__column">
      <b>Header</b>
    </div>
    <div class="datatable__column">
      <b>Header</b>
    </div>
    <div class="datatable__column">
      <b>Header</b>
    </div>
    <div class="datatable__column">
      <b>Header</b>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'datatableHeaderComponent'
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .datatable__header{
    width: 100%;
    display: flex;
  }
</style>