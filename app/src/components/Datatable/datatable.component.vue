<template>
  <div class="datatable">
    <slot></slot>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  import DatatableHeaderComponent from './header.component.vue';
  import DatatableContentComponent from './content.component.vue';

  export default defineComponent({
    name: 'datatableComponent',
    components: {
      DatatableHeaderComponent,
      DatatableContentComponent
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
      padding: $spacing-md;
    }
  }

</style>