<template>
  <div class="default">
    <headerComponent/>
    <div class="default__template__wrapper">
      <sideBarComponent />
      <contentComponent>
        <titleComponent :title="title" :subtitle="subtitle"/>
        <div>
          <slot></slot>
        </div>
      </contentComponent>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  
  import HeaderComponent from '@/components/Header/header.component.vue';
  import SideBarComponent from '@/components/Sidebar/sidebar.component.vue';
  import ContentComponent from '@/components/Content/content.component.vue';
  import FilterComponent from '@/components/Filter/filter.component.vue';
  import TitleComponent from '@/components/Title/title.component.vue';

  export default defineComponent({
    name: 'defaultTemplate',
    components: {
      HeaderComponent,
      SideBarComponent,
      ContentComponent,
      FilterComponent,
      TitleComponent
    },
    props: {
      title:{
        default: 'teste',
        type: String
      },
      subtitle: {
        type: String
      }
    },
    mounted() {
      console.log(this.$props)
      console.log('mounted')
    },
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .default{
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .default__template__wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    padding-bottom: $spacing-md;
    @media(max-width: $screen-sm){
      flex-direction: column;
      padding: $spacing-md;
    }
  }
</style>
