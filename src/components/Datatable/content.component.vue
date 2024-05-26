<template>
  <div class="datatable__content">
    <div class="datatable__column">
      <p>Content</p>
    </div>
    <div class="datatable__column">
      <p>Content</p>
    </div>
    <div class="datatable__column">
      <p>Content</p>
    </div>
    <div class="datatable__column">
      <p>Content</p>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'datatableContentComponent'
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .datatable__content{
    display: flex;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: $spacing-md;
  }
</style>