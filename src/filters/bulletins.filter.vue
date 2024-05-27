<template>
  <div class="filter">
    <inputComponent :inputName="'employeeId'" :inputValue="employeeId" :placeholder="'ID do funcionário'" :required="true"
      v-model="employeeId" />
    <inputComponent :inputName="'startDate'" :inputValue="startDate" :placeholder="'Nome do funcionário'" :required="true"
      v-model="startDate" />
    <inputComponent :inputName="'endDate'" :inputValue="endDate" :placeholder="'Nome do funcionário'" :required="true"
      v-model="endDate" />
    <button type="button" @click="handleFilter">Filtrar</button>
  </div>
</template>

<script>

import { useStore } from 'vuex';
import { getBulletins } from '@/services/bulletins.service'
import { defineComponent } from 'vue';
import InputComponent from '@/components/Input/input.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';

export default defineComponent({
  name: 'bulletinsFilter',
  components: {
    InputComponent,
    ButtonComponent
  },
  setup() {
    const $store = useStore();
    return {
      $store
    }
  },
  data() {
    const employeeId = '';
    const startDate = '';
    const endDate = '';
    return {
      employeeId,
      startDate,
      endDate
    }
  },
  methods: {
    async handleFilter() {
      const data = {
        employeeId: this.employeeId,
        startDate: this.startDate,
        endDate: this.endDate
      }
      getBulletins(data, (response) => this.$store.dispatch('handleFilterBulletins', response))
    }
  }
})
</script>