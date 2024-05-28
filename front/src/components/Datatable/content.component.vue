<template>
  <div class="datatable__content">
    <div class="datatable__content__no__data" v-if="list.length === 0">
      <p class="datatable__content__no__data__text">Sem dados para exibir</p>
    </div>
    <div class="datatable__content__rows" v-if="list.length > 0" v-for="item in list" :key="itens?.id">
      <div v-for="(column, index) in columns" :key="column.label" class="datatable__column" :style="`width:
      ${column.width}`">
        <p class="datatable__content__rows__header">{{ column.label }}: </p>
        <p v-if="!column.actions && !column.isElement && !column.data">{{ item[column.key] }}</p>
        <p v-if="column.data">{{ column.data(item[column.key]) }}</p>
        <div v-if="column?.actions && column?.actions.length > 0">
          <buttonComponent v-for="action in column.actions" :label="action.label" :color="'secondary'"
            :variant="'filled'" :type="'button'" :size="'sm'" @buttonAction="action.buttonAction(item)" />
        </div>
        <div v-if="column?.isElement" v-html="column.element(item[column.key])"></div>
      </div>
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
  },
  mounted() {
    console.log(this.$props.list)
  },
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.datatable__content__no__data{
  display: flex;
  justify-content: center;
  background: $danger-color-light;
  border-radius: $spacing-md;
  padding: $spacing-md;
}

.datatable__content__no__data__text{
  color: $gray-color;
  font-weight: 600; 
}

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
</style>