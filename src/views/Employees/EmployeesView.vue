<template>
  <div class="employees view">
    <defaultTemplate title="Funcionários">
      <div class="content employees__content">
        <filterComponent>
          <employeesFilter />
        </filterComponent>
        <div class="employees__cards">
          <cardComponent v-for="employee in employees" :data="employee" :key="employee.id"/>
        </div>
      </div>
    </defaultTemplate>
  </div>
</template>

<script>
  import { useStore} from 'vuex';
  import { defineComponent, computed } from 'vue';

  import DefaultTemplate from '@/templates/default.template.vue';
  import FilterComponent from '@/components/Filter/filter.component.vue';
  import CardComponent from '@/components/Card/card.component.vue';

  import EmployeesFilter from '@/filters/employees.filter.vue';

  export default defineComponent({
    name: 'employees',
    components: {
      DefaultTemplate,
      FilterComponent,
      CardComponent,
      EmployeesFilter
    },
    setup(){
      const $store = useStore();
      const employees = computed(() => $store.state.employees);
      return {
        employees
      }
    },
    mounted() {
    },
  })
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.employees__cards {
  width: 100%;
  display: flex;
  gap: $spacing-md;
  flex-wrap: wrap;
}
</style>
