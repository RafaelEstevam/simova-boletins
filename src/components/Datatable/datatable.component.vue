<template>
  <div class="datatable">
    <datatableHeaderComponent />
    <datatableContentComponent :for="item in list" :key="item?.id" />
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
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data(){
    const datatableList = [];
    return {
      datatableList
    }
  },
  watch: {
    list(newItems){
      this.datatableList = JSON.parse(JSON.stringify(newItems));
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.datatable {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  .datatable__column {
    padding: $spacing-md;
  }
}
</style>