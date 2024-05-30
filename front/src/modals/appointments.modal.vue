<template>
  <div class="appointments__modal__content__wrapper">
    <div class="appointments__modal__content__sticky">
      <div class="appointments__modal__content__sticky__wrapper">
        <cardComponent :data="employee" />
        <buttonComponent :id="'close-modal'" :label="'Fechar'" @buttonAction="handleCloseModal" :color="'danger'" :variant="'filled'"
          :type="'button'" />
      </div>
    </div>
    <div class="appointments__modal__content__wrapper appointments__modal__content">
      <titleComponent :title="'Apontamentos'"/>
      <filterComponent>
        <appointmentsFilter :filterData="modalData" />
      </filterComponent>
      <div class="appointments__modal__content__datatable">
        <datatableComponent :columns="columns" :list="appointments">
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
import ButtonComponent from '@/components/Button/button.component.vue';

import TitleComponent from '@/components/Title/title.component.vue';

import AppointmentsFilter from '@/filters/appointments.filter.vue';

export default defineComponent({
  name: 'appointmentsModal',
  components: {
    FilterComponent,
    AppointmentsFilter,
    DatatableComponent,
    CardComponent,
    ButtonComponent,
    TitleComponent
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
    async handleGetEmployeeById() {
      const data = {
        id: this.modalData.employeeId
      };

      try {
        this.$store.dispatch('handleShowLoading', true);
        await getEmployeeById(data, (response) => this.employee = response);
      } catch (e){
        console.log(e);
      } finally{
        this.$store.dispatch('handleShowLoading', false);
      }
      
    },
    handleCloseModal() {
      this.employee = {};
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
  height: 100%;

  &.appointments__modal__content {
    flex-direction: column;
    width: 100%;
    max-height: 75vh;
    overflow-y: auto;
    background: $white-color;
    padding: $spacing-md;
    border-radius: $spacing-md;
    box-shadow: 0px 4px 0px #c5c5cc;
  }

  @media(max-width: $screen-sm) {
    flex-direction: column-reverse;
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
  width: fit-content;

  .appointments__modal__content__sticky__wrapper {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    max-height: calc(100vh - 195px);
    gap: $spacing-md;

    .card {
      @media(max-width: $screen-sm) {
        display: none;
      }
    }


  }
}
</style>@/components/Datatable/Content/content.component.vue@/components/Datatable/Header/header.component.vue