<template>
  <div class="datatable__header">
    <div v-for="(column, index) in columns" :key="column.label" class="datatable__column" :style="`width: ${column.width}`">
      <b>{{ column.label }}</b>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'datatableHeaderComponent',
    props:{
      columns:{
        type: Array
      },
    }
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .datatable__header{
    width: 100%;
    display: flex;
    // background: $light-color;
    // border-radius: $spacing-md;
    b{
      color: $gray-color;
      font-weight: bold;
    }

    @media(max-width: $screen-sm){
      display: none;
    }
  }
</style>