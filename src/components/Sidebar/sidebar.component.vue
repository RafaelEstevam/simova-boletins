<template>
  <aside class="aside">
    <nav class="aside__nav">
      <ul class="aside__nav__menu">
        <li><a href="/employees">Funcionários</a></li>
        <li><a href="/bulletins">Boletins</a></li>
      </ul>
    </nav>
    <buttonComponent @buttonAction="handleGoToLogin" :label="'Logout'"/>
  </aside>
</template>

<script>
  import {useRouter} from 'vue-router';
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
    methods:{
      handleGoToLogin(){
        this.$router.push('/')
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
  }

  .aside__nav__menu{
    list-style: none;
    margin: 0;
    padding: 0;
  }

</style>