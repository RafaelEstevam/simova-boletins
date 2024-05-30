<template>
  <div class="datatable">
    <datatableHeaderComponent :columns="columns" />
    <datatableContentComponent :list="list" :columns="columns" />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  import DatatableHeaderComponent from './Header/header.component.vue';
  import DatatableContentComponent from './Content/content.component.vue';

  export default defineComponent({
    name: 'datatableComponent',
    components: {
      DatatableHeaderComponent,
      DatatableContentComponent
    },
    props: {
      columns: {
        type: Array
      },
      list: {
        type: Array
      }
    }

  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .datatable{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;

    .datatable__column{
      width: 100%;
      padding: $spacing-md;
      display: flex;
      align-items: center;
    }
  }

</style>./Content/content.component.vue./Header/header.component.vue