<template>
  <aside class="aside">
    <nav class="aside__nav" :class="{
      'showMenu': showMenu
    }">
      <div class="aside__nav__button">
        <buttonComponent :id="'header-hide-menu'" @buttonAction="handleHideMenu" :color="'primary'" :variant="'outlined'" :type="'button'"
          :label="'Fechar'" />
      </div>
      <ul class="aside__nav__menu">
        <li class="aside__nav__menu__item">
          <buttonComponent :id="'go-to-employees'" @buttonAction="handleGoToLink('/employees')" :fullwidth="true" :color="'primary'"
            :variant="'filled'" :type="'button'" :label="'Funcionários'" />
        </li>
        <li class="aside__nav__menu__item">
          <buttonComponent :id="'go-to-bulletins'" @buttonAction="handleGoToLink('/bulletins')" :fullwidth="true" :color="'primary'"
            :variant="'filled'" :type="'button'" :label="'Boletins'" />
        </li>
      </ul>
    </nav>
    <buttonComponent @buttonAction="handleGoToLink('/')" :color="'danger'" :variant="'outlined'" :type="'button'"
      :fullwidth="true" :label="'Logout'" />
  </aside>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { defineComponent, computed } from 'vue';

import ButtonComponent from '../Button/button.component.vue';

export default defineComponent({
  name: 'sideBarComponent',
  components: {
    ButtonComponent
  },

  setup() {
    const $router = useRouter();
    const $store = useStore();
    const showMenu = computed(() => $store.state.showMenu);

    return {
      $router,
      showMenu
    }
  },
  methods: {
    handleGoToLink(link) {
      this.$router.push(`${link}`)
    },
    handleHideMenu() {
      this.$store.dispatch('handleShowMenu', false)
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.aside {
  height: 100%;
  padding: $spacing-md;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media(max-width: $screen-sm) {
    height: 8%;
    order: 1;
  }


  .aside__nav {
    @media(max-width: $screen-sm) {
      display: none;

      &.showMenu {
        display: flex;
        flex-direction: column;
        gap: $spacing-md;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $overlay-color; 
        padding: $spacing-md;
        backdrop-filter: blur(1px);
        border-right: 5px solid $gray-color-light;
        z-index: 1;
        &::before{
          width: calc(50% + $spacing-md);
          height: 100%;
          pedding-right: $spacing-md;
          background: $light-color;
          content: ' ';
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }

  .aside__nav__button {
    @media(min-width: $screen-sm) {
      display: none !important;
    }
  }

  .aside__nav__menu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    width: 100%;
    position: relative;
    z-index: 2;
    @media(max-width: $screen-sm){
      width: 50%;
    }
  }

  .aside__nav__menu__item {
    width: 100%;
  }
}
</style>