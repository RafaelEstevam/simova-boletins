<template>
  <div class="content__slot">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'contentComponent'
})
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .content{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: $spacing-md;
    @media(max-width: $screen-md){
      height: 100%;
    }
  }

  .content__slot{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: $spacing-md;
    border-radius: $spacing-md 0 0 $spacing-md;
    background-color: $white-color;
    padding: $spacing-md;
    max-height: calc(100vh - 96px);
    overflow-y: scroll;
    @media(max-width: $screen-sm){
      height: 100%;
      border-radius: $spacing-md ;
      order: 0;
      max-height: calc(100vh - 170px);
    }
  }
</style>