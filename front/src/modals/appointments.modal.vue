<template>
  <div class="appointments__modal__content__wrapper">
    <div class="appointments__modal__content__sticky">
      <div class="appointments__modal__content__sticky__wrapper">
        <cardComponent :data="employee" />
        <buttonComponent :label="'Fechar'" @buttonAction="handleCloseModal"/>
      </div>
    </div>
    <div class="appointments__modal__content__wrapper col">
      <filterComponent>
        <appointmentsFilter @filterAction="handleFilter" />
      </filterComponent>
      <div class="appointments__modal__content__datatable">
        <datatableComponent>
          <datatableHeaderComponent :columns="columns" />
          <datatableContentComponent :list="appointments" :columns="columns" />
        </datatableComponent>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { useStore } from 'vuex';
import { defineComponent, computed } from 'vue';
import { getEmployees } from '@/services/employees.service';

import FilterComponent from '@/components/Filter/filter.component.vue';
import CardComponent from '@/components/Card/card.component.vue';
import DatatableComponent from '@/components/Datatable/datatable.component.vue';
import DatatableHeaderComponent from '@/components/Datatable/header.component.vue';
import DatatableContentComponent from '@/components/Datatable/content.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';

import AppointmentsFilter from '@/filters/appointments.filter.vue';

export default defineComponent({
  name: 'appointmentsModal',
  components: {
    FilterComponent,
    AppointmentsFilter,
    DatatableComponent,
    DatatableHeaderComponent,
    DatatableContentComponent,
    CardComponent,
    ButtonComponent
  },
  props: {
    data: {
      type: Object
    }
  },
  emits: ['closeModal'],
  setup() {
    const $store = useStore();
    const consolidatedAppointments = computed(() => $store.getters.getAppointments);
    return {
      consolidatedAppointments,
      $store
    }
  },
  data() {
    const modalDetails = this.data;
    const appointments = modalDetails.appointmentsList;
    const employee = {};

    const columns = [
      { label: 'Id', width: '10%', key: 'id' },
      { label: 'Cor', width: '10%', key: 'color', isElement: true, element: (e) => `<div class="appointments__modal__content__datatable__color" style="background: ${e}"></div>` },
      { label: 'Código', width: '10%', key: 'code' },
      { label: 'Descrição', width: '50%', key: 'description' },
      { label: 'Data', width: '20%', key: 'date', data: (d) => moment(new Date(d.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss') },
    ];

    return {
      columns,
      appointments,
      employee,
      modalDetails
    }
  },
  created() {
    this.$store.dispatch('handleFilterAppointments', this.data.appointmentsList);
  },
  methods: {
    handleCloseModal(){
      this.$emit('closeModal');
    }
  },
  mounted() {
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.appointments__modal__content__wrapper {
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

.appointments__modal__content__datatable {
  width: 100%;
}

.appointments__modal__content__datatable__color {
  width: $spacing-xl;
  height: $spacing-xl;
  border-radius: $spacing-md;
}

.appointments__modal__content__sticky {
  position: relative;

  .appointments__modal__content__sticky__wrapper {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(100vh - 195px);
    gap: $spacing-md;
  }
}
</style>