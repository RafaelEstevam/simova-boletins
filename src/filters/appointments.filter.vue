<template>
  <div class="filter">
    <inputComponent :inputName="'code'" :inputValue="code" :placeholder="'Código da atividade'"
      :required="true" v-model="code"/>
    <button type="button" @click="handleFilter">Filtrar</button>
  </div>
</template>

<script>
import { getAppointments } from '@/services/appointments.service'
import { useStore } from 'vuex';
import { defineComponent } from 'vue';
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
    return {
      $store
    }
  },
  data(){
    const code = '';
    return {
      code,
    }
  },

  methods: {
    async handleFilter() {
      const data = {
        code: this.code,
      }
      getAppointments(data, (response) => this.$store.dispatch('handleFilterAppointments', response))

      // console.log(data);

      // const response = await api.get('/appointments').then((response) => {
      //   this.$store.dispatch('handleFilterAppointments', response.data)
      // }).catch((e) => {
      //   console.log(e);
      // })
    }
  }
})
</script>