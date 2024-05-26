<template>
  <div class="filter">
    <inputComponent />
    <inputComponent />
    <button type="button" @click="handleFilter">Filrar</button>
  </div>
</template>

<script>
  import api from '@/config/api';
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
    },

    methods: {
      async handleFilter() {
        const response = await api.get('/appointments').then((response) => {
          this.$store.dispatch('handleFilterAppointments', response.data)
        }).catch((e) => {
          console.log(e);
        })
      }
    }
  })
</script>