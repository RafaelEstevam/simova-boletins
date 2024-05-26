<template>
  <div class="filter">
    <inputComponent />
    <inputComponent />
    <button type="button" @click="handleFilter">Filtrar</button>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import InputComponent from '@/components/Input/input.component.vue';
  import ButtonComponent from '@/components/Button/button.component.vue';

  export default defineComponent({
    name: 'appointmentsFilter',
    components: {
      InputComponent,
      ButtonComponent
    },

    emits:['filterAction'],

    methods: {
      handleFilter(){
        this.$emit('filterAction', {teste: 123})
      }
    }
  })
</script>