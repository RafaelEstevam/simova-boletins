<template>
  <div class="datatable__content" v-for="item in list" :key="itens?.id">
    <div
      v-for="(column, index) in columns"
      :key="column.label"
      class="datatable__column"
      :style="`width:
      ${column.width}`">
        <p>{{ item[column.key]}}</p>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'datatableContentComponent',
    props:{
      list:{
        type: Array,
        default: []
      },
      columns:{
        type: Array,
        default: []
      }
    },
    // watch:{
    //   list(newv, old){
    //     console.log(newv);
    //     console.log(old);
    //   }
    // }
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .datatable__content{
    display: flex;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: $spacing-md;
  }
</style>