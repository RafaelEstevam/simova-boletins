<template>
  <div class="logo" :class="{
    'horizontal': horizontal,
    'vertical': !horizontal
  }">
    <div class="logo__wrapper" :class="{
    'horizontal': horizontal,
    'vertical': !horizontal
  }">
      <h2 class="logo__wrapper__text logo__wrapper__text--bold" :class="{ 'white': white, 'dark': !white }">Simova</h2>
      <h2 class="logo__wrapper__text" :class="{ 'white': white, 'primary': !white }">Boletins</h2>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'logoComponent',
  props: {
    horizontal: {
      type: Boolean
    },
    white: {
      type: Boolean
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/tokens.scss';

.logo {
  display: flex;
  gap: $spacing-md;
  justify-content: center;
  align-items: center;
}

.vertical {
  flex-direction: column;
}

.logo__wrapper {
  display: flex;
  gap: $spacing-xs;
  justify-content: center;
  align-items: center;
  @media(max-width: $screen-sm){
    flex-direction: column;
  }
}

.logo__wrapper__text {
  font-size: $font-xxl;
  line-height: $font-xxl;
  font-weight: 100;
  @media(max-width: $screen-sm){
    font-size: $font-xl;
    line-height: $font-xl;
  }
}

.white {
  color: $white-color;
  text-shadow: 0 1px 0 #eee, 0 2px 0 #ddd, 0 3px 0 #ccc, 0 4px 0 #bbb, 0 5px 0 #aaa;
}

.dark {
  color: $dark-color;
}

.primary {
  color: $primary-color;
}

.logo__wrapper__text--bold {
  font-weight: 900;
}
</style>