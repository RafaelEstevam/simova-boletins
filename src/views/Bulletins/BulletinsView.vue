<template>
  <div class="bulletins view">
    <defaultTemplate title="Boletins">
      <div class="content bulletins__content">
        <filterComponent>
          <bulletinsFilter />
        </filterComponent>
        <div class="bulletins__content__wrapper">
          <div class="bulletins__content__sticky">
            <div class="bulletins__content__sticky__wrapper">
              <cardComponent />
            </div>
          </div>
          <div class="bulletins__content__datatable">
            <datatableComponent>
              <datatableComponentHeader />
              <datatableComponentContent />
            </datatableComponent>
          </div>
        </div>
      </div>
    </defaultTemplate>

    <modalComponent>
      <appointmentsModal />
    </modalComponent>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  import DefaultTemplate from '@/templates/default.template.vue';
  import FilterComponent from '@/components/Filter/filter.component.vue';
  import CardComponent from '@/components/Card/card.component.vue';
  import DatatableComponent from '@/components/Datatable/datatable.component.vue';
  import ModalComponent from '@/components/Modal/modal.component.vue';
  import ButtonComponent from '@/components/Button/button.component.vue';

  import BulletinsFilter from '@/filters/bulletins.filter.vue';

  import AppointmentsModal from '@/modals/appointments.modal.vue';

  export default defineComponent({
    name: 'bulletins',
    components: {
      DefaultTemplate,
      FilterComponent,
      CardComponent,
      DatatableComponent,
      ModalComponent,
      ButtonComponent,
      BulletinsFilter,
      AppointmentsModal
    },
    mounted() {
      console.log('mounted')
    },
  })
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .bulletins__content__wrapper {
    display: flex;
    gap: $spacing-md;
    position: relative;

    &.col{
      flex-direction: column;
      width: 100%;
      max-height: calc(100vh - 200px);
      overflow-y: scroll;
      padding: 0 $spacing-md 0 0 ;
    }
  }

  .bulletins__content__datatable {
    width: 100%;
  }

  .bulletins__content__sticky {
    position: relative;

    .bulletins__content__sticky__wrapper {
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      max-height: calc(100vh - 195px);
      gap: $spacing-md;

    }
  }
</style>
