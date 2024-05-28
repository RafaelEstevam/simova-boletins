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
    mounted() {
      console.log(this.$props)
      console.log('mounted')
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
  }

  .title__subtitle{
    font-size: $font-xl;
    font-weight: 900;
  }

  .dark{
    color: $dark-color;
  }

</style>