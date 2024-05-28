<template>
  <div class="filter">
    <inputComponent :inputName="'code'" :inputValue="code" :placeholder="'Código da atividade'"
      :required="true" v-model="code"/>
    <buttonComponent @buttonAction="handleFilter" :color="'primary'" :variant="'filled'" :type="'button'" :label="'Filtrar'"/>
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

  props: {
    filterData:{
      type: Object
    }
  },

  setup(){  
    const $store = useStore();
    const appointments = computed(() => $store.state.getAppointments);
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
      if(data.code !== ''){
        const newAppointmentsList = this.filterData.appointmentsList.filter((appointment) => appointment.activity.code == data.code);
        this.$store.dispatch('handleFilterAppointments', newAppointmentsList);
      }else{
        this.$store.dispatch('handleFilterAppointments', this.filterData.appointmentsList);
      }
    },
  },

  mounted(){
    console.log(this.filterData)
  }
})
</script>