<template>
  <div class="bulletins view">
    <defaultTemplate :title="'Boletins'" :subtitle="employee.name">
      <div class="content bulletins__content">
        <filterComponent>
          <bulletinsFilter />
        </filterComponent>
        <div class="bulletins__content__wrapper">
          <div v-if="employee && employee.id" class="bulletins__content__sticky">
            <div class="bulletins__content__sticky__wrapper">
              <cardComponent :data="employee" />
            </div>
          </div>
          <div class="bulletins__content__datatable">
            <datatableComponent :columns="columns" :list="bulletins">
            </datatableComponent>
          </div>
        </div>
      </div>
    </defaultTemplate>

    <modalComponent v-if="showModal">
      <appointmentsModal :modalData="modalData" @closeModal="handleCloseModal" />
    </modalComponent>

  </div>
</template>

<script>
import moment from 'moment';

import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

import DefaultTemplate from '@/templates/default.template.vue';
import FilterComponent from '@/components/Filter/filter.component.vue';
import CardComponent from '@/components/Card/card.component.vue';
import DatatableComponent from '@/components/Datatable/datatable.component.vue';
import ModalComponent from '@/components/Modal/modal.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';

import BulletinsFilter from '@/filters/bulletins.filter.vue';

import AppointmentsModal from '@/modals/appointments.modal.vue';

import { getEmployeeById } from '@/services/employees.service';

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

  setup() {
    const $router = useRouter();
    const $store = useStore();
    const $route = useRoute();
    const userId = computed(() => $route.params.employeeId);
    const bulletins = computed(() => $store.getters.getBulletins);
    const showModal = ref(false);

    return {
      $store,
      $router,
      bulletins,
      showModal,
      userId
    }
  },

  data() {
    const modalData = {};
    const employee = {};
    const employeeId = this.userId;
    const columns = [
      { label: 'Id', width: '10%', key: 'id' },
      { label: 'Id Funcionário', width: '10%', key: 'employeeId' },
      { label: 'Nome', width: '10%', key:'employee', data: (e) => e.name},
      { label: 'Início', width: '20%', key: 'startDate', data: (d) => moment(new Date(d.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss') },
      { label: 'Fim', width: '20%', key: 'endDate', data: (d) => moment(new Date(d.replace(' ', 'T'))).format('DD/MM/YYYY hh:mm:ss') },
      { label: 'Total em Horas', width: '20%', key: 'totalHours' },
      {
        label: 'Ver apontamentos', width: '20%', key: 'appointments', actions:
          [
            { label: 'Ver Apontamento', buttonAction: this.handleShowAppointmentsModal }
          ]
      },
    ];
    return {
      columns,
      employee,
      modalData,
      employeeId
    }
  },

  watch:{
    userId(n, o){
      if(n === undefined){
        this.employee = {};
      }
    },
  },

  methods: {
    handleGoToEmployees() {
      this.$router.push('/employees');
    },
    handleGoToBulletins() {
      this.$router.push('/bulletins');
    },
    handleShowAppointmentsModal(data) {
      this.handleOpenModal(data);
    },
    handleOpenModal(data) {
      this.modalData = data;
      this.showModal = true;
    },
    handleCloseModal() {
      this.modalData = {};
      this.showModal = false;
    },
    async handleGetEmployeeById(){
      const data = {
        id: this.employeeId
      };
      await getEmployeeById(data, (response) => this.employee = response);
    },
  },
  async mounted() {
    if(this.employeeId){
      await this.handleGetEmployeeById();
    }
  }
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
    height: 100%;
    max-height: calc(100vh - 195px);
    gap: $spacing-md;
  }

  @media(max-width: $screen-md){
    display: none;
  }
}
</style>
@/components/Datatable/Content/content.component.vue@/components/Datatable/Header/header.component.vue