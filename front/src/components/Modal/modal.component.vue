<template>
  <div class="modal">
    <div class="modal__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'modalComponent',
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .modal{
    top: 0;
    position: absolute;
    display: block;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $overlay-color;
    padding: $spacing-md;
  }

  .modal__wrapper{
    background-color: $light-color;
    padding: $spacing-md;
    border-radius: $spacing-md;
    min-width: 75%;
  }

</style>