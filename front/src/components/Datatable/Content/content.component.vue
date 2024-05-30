<template>
  <div class="datatable__content">
    <datatableErrorComponent v-if="list.length === 0"/>
    <div class="datatable__content__rows" v-if="list.length > 0" v-for="item in list" :key="item?.id">
      <div v-for="(column, index) in columns" :key="column.label" class="datatable__column" :style="`width:
      ${column.width}`">
        <p class="datatable__content__rows__header">{{ column.label }}: </p>
        <p v-if="!column.actions && !column.isElement && !column.data">{{ item[column.key] }}</p>
        <p v-if="column.data">{{ column.data(item[column.key]) }}</p>
        <div v-if="column?.actions && column?.actions.length > 0">
          <buttonComponent :id="`${item.id}-${column.key}-action`" v-for="action in column.actions" :label="action.label" :color="'secondary'"
            :variant="'filled'" :type="'button'" :size="'sm'" @buttonAction="action.buttonAction(item)" />
        </div>
        <div v-if="column?.isElement" v-html="column.element(item[column.key])"></div>
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue';
import ButtonComponent from '@/components/Button/button.component.vue';
import DatatableErrorComponent from '@/components/Datatable/Error/error.component.vue';

export default defineComponent({
  name: 'datatableContentComponent',
  components: { ButtonComponent, DatatableErrorComponent, DatatableErrorComponent },
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

.datatable__content{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.datatable__content__rows {
  display: flex;
  width: 100%;
  background: $light-color;
  border-radius: $spacing-md;
  box-shadow: 0px 4px 0px $gray-color-light;

  @media(max-width: $screen-sm){
    display: block;
    .datatable__column{
      width: 100% !important;
    }
  }

}

.datatable__content__rows__header{
  display: none;
  font-weight: bold;
  color: $gray-color;
  margin-right: $spacing-md;
  @media(max-width: $screen-sm){
    display: block
  }
}
</style>@/components/Datatable/Error/error.component.vue