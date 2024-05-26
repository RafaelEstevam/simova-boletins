<template>
  <div class="filter">
    <inputComponent />
    <inputComponent />
    <button type="button" @click="handleFilter">Filrar</button>
  </div>
</template>

<script>
import api from '@/config/api';

import { defineComponent } from 'vue';
import InputComponent from '@/components/Input/input.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';

export default defineComponent({
  name: 'employeesFilter',
  components: {
    InputComponent,
    ButtonComponent
  },
  methods: {
    async handleFilter() {
      const response = await api.get('/employees').then((response) => {
        return response.data
      }).catch((e) => {
        console.log(e);
      })
      console.log(response);
    }
  }
})
</script>