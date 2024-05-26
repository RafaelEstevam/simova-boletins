<template>
  <div class="filter">
    <inputComponent />
    <inputComponent />
    <button type="button" @click="handleFilter">Filrar</button>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import api from '@/config/api';
import { defineComponent } from 'vue';
import InputComponent from '@/components/Input/input.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';

export default defineComponent({
  name: 'bulletinsFilter',
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
  methods: {
    async handleFilter() {
      const response = await api.get('/bulletins').then((response) => {
        this.$store.dispatch('handleFilterAppointments', response)
      }).catch((e) => {
        console.log(e);
      })
      console.log(response);
    }
  }
})
</script>