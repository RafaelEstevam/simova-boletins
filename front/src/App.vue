<template>
  <loadingComponent :isFullScreen="true" />
  <RouterView />
</template>

<script>
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import LoadingComponent from '@/components/Loading/loading.component.vue';

export default defineComponent({
  name: 'app',
  components: {
    LoadingComponent
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

body {
  background-color: $light-color;
}

.view {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>