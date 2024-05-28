<template>
  <header class="header">
    <div class="header__button">
      <buttonComponent @buttonAction="handleShowMenu" :color="'primary'" :variant="'filled'" :type="'button'"
      :label="'Menu'"/>
    </div>
    <logoComponent :horizontal="true" :white="false" />
    <h2 class="header__text">Acesso administrativo</h2>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import LogoComponent from '@/components/Logo/logo.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';

export default defineComponent({
  name: 'headerComponent',
  components: {
    LogoComponent,
    ButtonComponent
  },
  methods: {
    handleShowMenu(){

    }
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.header {
  width: 100%;
  padding: $spacing-md;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media(max-width: $screen-sm){
    justify-content: center;
  }
}

.header__button{
  display: none;
  @media(max-width: $screen-sm){
    display: block;
    position: absolute;
    left: $spacing-md;
    top: $spacing-md;
  }
}

.header__text {
  color: $dark-color;
  @media(max-width: $screen-sm){
    display: none;
  }
}
</style>