<template>
  <div class="filter">
    <inputComponent :inputName="'employeeName'" :inputValue="employeeName" :placeholder="'Nome do funcionário'"
      :required="true" v-model="employeeName" />

    <selectComponent :inputName="'employeeActive'" :inputValue="employeeActive" v-model="employeeActive"
      :placeholder="'Status: '" :options="options" />

    <buttonComponent :id="'filter-employees'" @buttonAction="handleFilter" :color="'primary'" :variant="'filled'" :type="'button'"
      :label="'Filtrar'" />
  </div>
</template>

<script>
import { getEmployees } from '@/services/employees.service';

import { defineComponent } from 'vue';
import InputComponent from '@/components/Input/input.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';
import SelectComponent from '../components/Select/select.component.vue';

export default defineComponent({
  name: 'employeesFilter',
  components: {
    InputComponent,
    ButtonComponent,
    SelectComponent
  },
  setup() {
    const options = [
      { label: 'Selecione', value: '' },
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false }
    ];
    return {
      options
    }
  },
  data() {
    const employeeName = '';
    const employeeActive = null;
    return {
      employeeName,
      employeeActive
    }
  },
  methods: {
    async handleFilter(filter) {
      const data = {
        name: this.employeeName,
        active: this.employeeActive
      }

      try {
        this.$store.dispatch('handleShowLoading', true);
        await getEmployees(data, (response) => {
          this.$store.dispatch('handleFilterEmployees', response);
        })
      } catch (e){
        console.log(e);
      } finally{
        this.$store.dispatch('handleShowLoading', false);
      }

    },
    async handleDoDefaultFilter() {
      this.employeeName = '';
      this.employeeActive = null;
      this.$store.dispatch('handleFilterEmployees', []);
      await this.handleFilter('default')
    }
  },
  async mounted() {
    await this.handleDoDefaultFilter();
  }
})
</script>