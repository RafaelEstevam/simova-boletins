<template>
  <div v-if="showLoading" class="loading fullscreen">
    <div class="load" :class="variant"></div>
  </div>
</template>

<script>
  import { computed, defineComponent } from 'vue';
  import { useStore } from "vuex";

  export default defineComponent({
    name: 'loadingComponent',
    props: {
      isFullScreen: {
        type: Boolean
      },
      size: {
        type: String
      },
      color: {
        type: String
      },
      show: {
        type: Boolean,
        default: false
      }
    },

    setup(){
      const store = useStore();
      const showLoading = computed(() => store.state.showLoading);
      return{
        showLoading
      }
    },

    computed:{
      variant(){
        return `${this.size} ${this.color}`
      }
    }
  });
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';
  .loading{
    &.fullscreen{
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      min-height: 100dvh;
      background-color: #00000060;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: $spacing-md;
    }
  }

  @keyframes loading {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .load{
    border: 2px solid $primary-color;
    width: 40px;
    height: 40px;
    display: block;
    border-radius: $spacing-sm;
    animation: loading 1s linear infinite;

    .sm{
      width: 20px;
      height: 20px;
    }

    .primary{
      border-color: $primary-color;
    }

    .white{
      border-color: $white-color;
    }
  }
</style>