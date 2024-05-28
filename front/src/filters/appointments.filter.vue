<template>
  <div class="filter">
    <inputComponent :inputName="'code'" :inputValue="code" :placeholder="'Código da atividade'"
      :required="true" v-model="code"/>
    <button type="button" @click="handleFilter">Filtrar</button>
  </div>
</template>

<script>

import { useStore } from 'vuex';
import { defineComponent, computed } from 'vue';
import InputComponent from '@/components/Input/input.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';

export default defineComponent({
  name: 'appointmentsFilter',
  components: {
    InputComponent,
    ButtonComponent
  },
  setup(){  
    const $store = useStore();
    const appointments = computed(() => $store.getters.getAppointments)
    return {
      $store,
      appointments
    }
  },
  data(){
    const code = '';
    return {
      code
    }
  },

  methods: {
    handleFilter() {
      const data = {
        code: this.code
      };
    },
  },
  mounted() {
    // console.log(this.appointments);
    // this.handleDoDefaultFilter();
  },
})
</script>