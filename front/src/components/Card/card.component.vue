<template>
  <div class="card" :id="`${data?.id}-card-click`" @click="handleCardAction(data)" :class="{
    'card--active': data?.active
  }">
    <div class="card__header">
      <p>{{ data?.id }}</p>
      <p>{{ data?.active ? 'Ativo' : 'Inativo' }}</p>
    </div>

    <div class="card__img">
      <img :src="data.image" />
    </div>

    <div class="card__content">
      <h2 class="card__content__text">{{ data?.name }}</h2>
    </div>

    <div class="card__footer">
      <p class="card__footer__text">Código: {{ data?.code }}</p>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'cardComponent',
  props: {
    data: {
      type: Object
    }
  },
  emits: ['cardAction'],
  methods: {
    handleCardAction(data) {
      this.$emit('cardAction', data)
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-md;
  padding: $spacing-md;
  border-radius: $spacing-md;
  max-width: 200px;
  min-width: 200px;
  cursor: pointer;
  background: $light-color;

  .card__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: $white-color;

    p {
      color: $gray-color;
      font-weight: bold;
    }

    p:nth-child(2) {
      background: $gray-color;
      padding: $spacing-xs $spacing-sm;
      border-radius: $spacing-md;
      color: $white-color
    }
  }

  .card__img {
    width: 100px;
    height: 100px;
    border-radius: $spacing-md;
    overflow: hidden;
    box-shadow: 0px 4px 0px #00000030;

    img {
      transform: scale(1.1);
      width: 100%;
    }
  }

  .card__content {
    text-align: center;
    background-color: #ffffff80;
    border-radius: $spacing-sm;
    padding: $spacing-xs $spacing-md;
    width: 100%;
  }

  .card__content__text {
    font-size: $font-md;
    color: $dark-color;
    font-weight: 600;
  }

  .card__footer {
    text-align: center;
  }

  .card__footer__text {
    background: $gray-color;
    padding: $spacing-xs $spacing-sm;
    border-radius: $spacing-md;
    color: $white-color;
    font-size: $font-sm;
  }

  &.card--active {
    background: $secondary-color-light;

    .card__header {
      p:nth-child(2) {
        background: $secondary-color;
      }
    }

    .card__img {
      box-shadow: 0px 4px 0px $secondary-color;
    }

    .card__footer__text {
      background: $secondary-color;
    }
  }

  &:hover{
    transition: linear all 0.1s;
    transform: scale(1.01);
    box-shadow: 0px 10px 10px $light-color
  }
}
</style>