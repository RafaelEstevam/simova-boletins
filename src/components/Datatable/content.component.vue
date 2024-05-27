<template>
  <div class="datatable__content" v-for="item in list" :key="itens?.id">
    <div v-for="(column, index) in columns" :key="column.label" class="datatable__column" :style="`width:
      ${column.width}`">
      <p v-if="!column.actions && !column.isElement && !column.data">{{ item[column.key] }}</p>
      <p v-if="column.data">{{ column.data(item[column.key]) }}</p>
      <div v-if="column?.actions && column?.actions.length > 0">
        <buttonComponent v-for="action in column.actions" :label="action.label"
          @buttonAction="action.buttonAction(item)" />
      </div>
      <div v-if="column?.isElement" v-html="column.element(item[column.key])"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonComponent from '../Button/button.component.vue';

export default defineComponent({
  name: 'datatableContentComponent',
  components: { ButtonComponent },
  props: {
    list: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: []
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.datatable__content {
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: $spacing-md;
}
</style>