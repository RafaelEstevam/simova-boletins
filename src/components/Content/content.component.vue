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
  }
</style>