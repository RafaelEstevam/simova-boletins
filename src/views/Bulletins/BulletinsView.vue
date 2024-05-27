<template>
  <div class="bulletins view">
    <defaultTemplate title="Boletins">
      <div class="content bulletins__content">
        <filterComponent>
          <bulletinsFilter />
        </filterComponent>
        <div class="bulletins__content__wrapper">
          <div v-if="employee" class="bulletins__content__sticky">
            <div class="bulletins__content__sticky__wrapper">
              <cardComponent :data="employee" />
            </div>
          </div>
          <div class="bulletins__content__datatable">
            <datatableComponent>
              <datatableHeaderComponent :columns="columns" />
              <datatableContentComponent :list="bulletins" :columns="columns" />
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
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

import DefaultTemplate from '@/templates/default.template.vue';
import FilterComponent from '@/components/Filter/filter.component.vue';
import CardComponent from '@/components/Card/card.component.vue';
import DatatableComponent from '@/components/Datatable/datatable.component.vue';
import DatatableHeaderComponent from '@/components/Datatable/header.component.vue';
import DatatableContentComponent from '@/components/Datatable/content.component.vue';
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
    DatatableHeaderComponent,
    DatatableContentComponent,
    ModalComponent,
    ButtonComponent,
    BulletinsFilter,
    AppointmentsModal
  },

  setup() {
    const $store = useStore();
    const bulletins = computed(() => $store.state.bulletins);
    return {
      $store,
      bulletins
    }
  },

  data() {
    const employee = {};
    const columns = [
      { label: 'Id', width: '10%', key: 'id' },
      { label: 'Id Funcionário', width: '10%', key: 'employeeId' },
      { label: 'Início', width: '20%', key: 'startDate' },
      { label: 'Fim', width: '20%', key: 'endDate' },
      { label: 'Apontamentos', width: '20%', key: 'appointments' },
    ];
    return {
      columns
    }
  },

  mounted() {
    // console.log('mounted')
  },
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.bulletins__content__wrapper {
  display: flex;
  gap: $spacing-md;
  position: relative;

  &.col {
    flex-direction: column;
    width: 100%;
    max-height: calc(100vh - 200px);
    overflow-y: scroll;
    padding: 0 $spacing-md 0 0;
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
