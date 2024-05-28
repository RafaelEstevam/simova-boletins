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
    background-color: $overlay-color;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal__wrapper{
    background-color: $white-color;
    padding: $spacing-md;
    border-radius: $spacing-md;
    min-width: 75%;
    min-height: 75%;
  }

</style>