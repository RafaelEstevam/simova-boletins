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
        <appointmentsFilter :filterData="modalData" />
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
import { getEmployeeById } from '@/services/employees.service';

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
    modalData: {
      type: Object
    }
  },
  
  emits: ['closeModal'],

  setup() {
    const $store = useStore();
    const appointments = computed(() => $store.state.appointments);
    return {
      appointments,
      $store
    }
  },

  data() {
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
      employee,
    }
  },
  
  methods: {
    async handleGetEmployeeById(){
      const data = {
        id: this.modalData.employeeId
      };
      await getEmployeeById(data, (response) => this.employee = response);
    },
    handleCloseModal(){
      this.$emit('closeModal');
    }
  },
  async mounted() {
    await this.handleGetEmployeeById()
    this.$store.dispatch('handleFilterAppointments', this.modalData.appointmentsList)
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