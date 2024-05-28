<template>
  <aside class="aside">
    <nav class="aside__nav">
      <ul class="aside__nav__menu">
        <li class="aside__nav__menu__item">
          <buttonComponent @buttonAction="handleGoToLink('/employees')" :fullwidth="true" :color="'primary'" :variant="'filled'" :type="'button'" :label="'Funcionários'"/>
        </li>
        <li class="aside__nav__menu__item">
          <buttonComponent @buttonAction="handleGoToLink('/bulletins')" :fullwidth="true" :color="'primary'" :variant="'filled'" :type="'button'" :label="'Boletins'"/>
        </li>
      </ul>
    </nav>
    <buttonComponent @buttonAction="handleGoToLink('/')" :color="'danger'" :variant="'outlined'" :type="'button'"
      :label="'Logout'" />
  </aside>
</template>

<script>
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

import ButtonComponent from '../Button/button.component.vue';

export default defineComponent({
  name: 'sideBarComponent',
  components: {
    ButtonComponent
  },
  setup() {
    const $router = useRouter();
    return {
      $router
    }
  },
  methods: {
    handleGoToLink(link) {
      this.$router.push(`${link}` )
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
    order: 1
  }

  .aside__nav {
    @media(max-width: $screen-sm){
      display: none;
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
  }

  .aside__nav__menu__item{
    width: 100%;
  }
}
</style>