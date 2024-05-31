<template>
  <div class="title">
    <h2 class="title__main dark">{{ title }}</h2>
    <h2 class="title__subtitle dark">{{ subtitle }}</h2>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'titleComponent',
    props: {
      title: {
        default: 'Title'
      },
      subtitle: {
        type: String
      }
    },
  });
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .title{
    color: $gray-color;
    font-weight: 500;
    display: flex;
    gap: $spacing-sm;
  }

  .title__main{
    font-size: $font-xl;
    @media(max-width: $screen-sm){
      font-size: $font-lg;
    }
  }

  .title__subtitle{
    font-size: $font-xl;
    font-weight: 900;
    @media(max-width: $screen-sm){
      font-size: $font-lg;
    }
  }

  .dark{
    color: $dark-color;
  }

</style>