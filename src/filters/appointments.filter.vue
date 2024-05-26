<template>
  <div class="filter">
    <inputComponent />
    <inputComponent />
    <!-- <buttonComponent @buttonAction="handleSubmit" /> -->
    <button type="button" @click="handleSubmit">teste</button>
  </div>
</template>

<script>
  import api from '@/config/api';
  import { defineComponent } from 'vue';
  import InputComponent from '@/components/Input/input.component.vue';
  import ButtonComponent from '@/components/Button/button.component.vue';

  export default defineComponent({
    name: 'appointmentsFilter',
    components: {
      InputComponent,
      ButtonComponent
    },

    methods: {
      async handleSubmit() {
        const response = await api.get('/appointments').then((response) => {
          return response
        }).catch((e) => {
          console.log(e);
        })
        console.log(response);
      }
    }
  })
</script>