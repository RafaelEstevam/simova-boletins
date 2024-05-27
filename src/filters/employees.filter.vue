<template>
  <div class="filter">
    <inputComponent :inputName="'employeeName'" :inputValue="employeeName" :placeholder="'Nome do funcionário'"
      :required="true" v-model="employeeName" />
    <checkboxComponent :checked="true" :inputName="'employeeActive'" :label="'Funcionário ativo'" v-model="employeeActive"
      @updateCheckBox="updateCheckBox" />
    <button type="button" @click="handleFilter">Filtrar</button>
    <button type="button" @click="handleDoDefaultFilter">Recarregar</button>
  </div>
</template>

<script>
import { getEmployees } from '@/services/employees.service';

import { defineComponent } from 'vue';
import InputComponent from '@/components/Input/input.component.vue';
import CheckboxComponent from '@/components/Checkbox/checkbox.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';

export default defineComponent({
  name: 'employeesFilter',
  components: {
    InputComponent,
    ButtonComponent,
    CheckboxComponent
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
    updateCheckBox(value) {
      this.employeeActive = value;
    },
    async handleFilter(filter) {
      const data = {
        name: this.employeeName,
        active: filter === 'default' ? '' : this.employeeActive
      }
      getEmployees(data, (response) => this.$store.dispatch('handleFilterEmployees', response))
    },
    handleDoDefaultFilter(filter){
      this.employeeName = '';
      this.employeeActive = null;
      this.handleFilter('default')
    }
  },
  mounted(){
    this.handleDoDefaultFilter('all');
  }
})
</script>