<template>
  <div class="login view">
    <div class="login__img">
      <ImageComponent />
    </div>
    <div class="login__wrapper">
      <div class="login__wrapper__login">
        <logoComponent :horizontal="true" />
        <div class="login__wrapper__access">
          <h2 class="login__wrapper__access__text">Acesso administrativo</h2>
          <buttonComponent
            :id="'login'"
            @buttonAction="handleGoToEmployees"
            :label="'Acessar painel'"
            :color="'primary'"
            :variant="'outlined'"
            :type="'button'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import ButtonComponent from '@/components/Button/button.component.vue';
import LogoComponent from '@/components/Logo/logo.component.vue';
import ImageComponent from '@/components/Image/image.component.vue';
import banner1 from '@/assets/banner-1.jpg';
import banner2 from '@/assets/banner-2.png';

export default defineComponent({
  name: 'login',
  components: {
    ButtonComponent,
    LogoComponent,
    ImageComponent
  },
  setup() {
    const $router = useRouter();
    return {
      $router
    }
  },
  data() {
    const img1 = banner1;
    const img2 = banner2;
    return {
      img1,
      img2
    }
  },

  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage: `url(${this.img1})`
      };
    }
  },

  methods: {
    handleGoToEmployees() {
      this.$router.push('/employees')
    }
  }
})

</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.login {
  width: 100%;
  display: flex;
}

.login__img {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: right; 
  background-color: $light-color;
  @media(max-width: $screen-sm){
    display: none;
  }
}

.login__wrapper {
  width: 40%;
  background-color: $primary-color;
  padding: $spacing-md;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 4px solid $danger-color;
  // box-shadow: 0px 0px 100px $danger-color inset;

  @media(max-width: $screen-sm){
    width: 100%;
  }
}

.login__wrapper__login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-lg;
  background: $light-color;
  border-radius: $spacing-md;
  padding: $spacing-xl;
  box-shadow: 0px 4px 0px #ccc;
}

.login__wrapper__access{
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.login__wrapper__access__text{
  color: $dark-color;
  font-weight: 800;
}
</style>
