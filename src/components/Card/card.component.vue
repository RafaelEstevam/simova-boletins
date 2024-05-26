<template>
  <div class="card">
    <div class="card__header">
      <p>ID</p>
      <p>Status</p>
    </div>
    <div class="card__content">
      <img src="#" />
      <h2>Nome do funcionário</h2>
      <p>Código</p>
    </div>
    <div class="card__footer">
      <p>Atividade atual</p>
      <p>Almoço</p>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'cardComponent'
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
    max-width: 190px;

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