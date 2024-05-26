<template>
  <div class="login view">
    <div class="login__img">
      <img src="#" />
    </div>
    <div class="login__wrapper">
      <div class="login__wrapper__login">
        <h1>Simova Boletins</h1>
        <p>Área administrativa</p>
        <buttonComponent />
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue';
import ButtonComponent from '@/components/Button/button.component.vue';

export default defineComponent({
  name: 'login',
  components: {
    ButtonComponent
  }
})

</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.login {
  display: flex;
}

.login__img {
  width: 100%;
}

.login__wrapper {
  width: 40%;
  background-color: $primary-color;
  padding: $spacing-md;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__wrapper__login {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-md;
}
</style>
