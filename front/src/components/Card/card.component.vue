<template>
  <div class="card" @click="handleCardAction(data)">
    <div class="card__header">
      <p>{{ data?.id }}</p>
      <p>{{ data?.active ? 'Ativo' : 'Inativo' }}</p>
    </div>
    <div class="card__content">
      <img src="#" />
      <h2>{{ data?.name }}</h2>
      <p>Código: {{ data?.code }}</p>
    </div>

    <div v-if="data?.appointments" class="card__footer">
      <p>Atividade atual</p>
      <p>Almoço</p>
    </div>
    
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'cardComponent',
    props: {
      data:{
        type: Object
      }
    },
    emits: ['cardAction'],
    methods: {
      handleCardAction(data){
        this.$emit('cardAction', data)
      }
    }
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .card{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-md;
    border-radius: $spacing-md;
    border: 1px solid #ccc;
    max-width: 180px;
    cursor: pointer;

    .card__header{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .card__content{
      text-align: center;
    }

    .card__footer{
      text-align: center;
    }
  }

</style>