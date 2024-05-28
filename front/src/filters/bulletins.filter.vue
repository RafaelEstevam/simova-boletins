<template>
  <div class="filter">
    <inputComponent v-if="!userId" :inputName="'employeeName'" :inputValue="employeeName" :placeholder="'Nome do funcionário'"
      :required="true" :readonly="readonly" v-model="employeeName" />
    <inputComponent :inputName="'totalHours'" :inputValue="totalHours" :placeholder="'Total de horas'" :required="true"
      v-model="totalHours" />
    <button type="button" @click="handleFilterBulletins">Filtrar</button>
  </div>
</template>

<script>

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import subscractHoursBetweenDates from '@/utils/substractHoursBetweenDates.js';

import { getBulletins } from '@/services/bulletins.service';
import { getAppointments } from '@/services/appointments.service';
import { getEmployees } from '@/services/employees.service';

import { defineComponent, computed } from 'vue';
import InputComponent from '@/components/Input/input.component.vue';
import ButtonComponent from '@/components/Button/button.component.vue';


export default defineComponent({
  name: 'bulletinsFilter',
  components: {
    InputComponent,
    ButtonComponent
  },
  setup() {
    const $route = useRoute();
    const $store = useStore();

    const userId = computed(() => $route.params.employeeId);
    const bulletins = computed(() => $store.state.bulletins);
    const consolidatedBulletins = computed(() => $store.state.consolidatedBulletins);
    const employee = computed(() => $store.state.employee);

    return {
      $store,
      bulletins,
      consolidatedBulletins,
      employee,
      userId,
    }
  },
  data() {

    const employeeId = this.employee.id || this.userId;
    const employeeName = '';
    const startDate = '';
    const endDate = '';
    const totalHours = '';
    const readonly = this.userId && true;

    return {
      employeeId,
      employeeName,
      startDate,
      endDate,
      totalHours,
      readonly
    }
  },

  watch: {
    userId(n, o) {
      if (n === undefined) {
        this.handleFilter();
        this.employeeId = '';
        this.employeeName = '';
        this.readonly = false;
        this.$store.dispatch('handleSetEmployee', {});
      }
      if (n) {
        this.handleFilterBulletins()
      }
    },
  },
  methods: {

    async handleFilter() {
      const data = {
        employeeId: this.userId || ''
      };
      await getAppointments({}, (response) => this.appointments = response);
      await getEmployees({}, (response) => this.employees = response);
      await getBulletins(data, (response) => this.handleConsolidateBulletins(response));
    },
    async handleDoDefaultFilter() {
      await this.handleFilter();
    },

    handleConsolidateAppointments(bulletin) {
      const newBulletins = bulletin.appointments.map((item) => {
        const appointment = this.appointments.find((subitem) => {
          return subitem.id == item.activityId
        });
        item.appointmentId = item.id;
        return { ...item, ...appointment }
      });
      return newBulletins;
    },

    handleConsolidateEmployee(bulletin) {
      const employee = this.employees.find((subitem) => {
        return subitem.id == bulletin.employeeId
      });
      return employee
    },

    handleConsolidateBulletins(bulletins) {
      const newBulletins = bulletins.map((item) => {
        item.totalHours = subscractHoursBetweenDates(item.startDate.replace(' ', 'T'), item.endDate.replace(' ', 'T'));
        item.appointmentsList = this.handleConsolidateAppointments(item);
        item.employee = this.handleConsolidateEmployee(item)
        delete item.appointments;
        return item;
      });

      this.$store.dispatch('handleFilterBulletins', newBulletins);
      this.$store.dispatch('handleSetConsolidatedBulletins', newBulletins);
    },
    handleFilterBulletins() {
      const data = {
        employeeName: this.employeeName,
        totalHours: this.totalHours,
      };

      // TODO IMPROVEMENTS
      if (data.employeeName !== '' && data.totalHours === '') {
        const newBulletins = this.consolidatedBulletins.filter((item) => {
          return item.employee.name == data.employeeName
        });
        this.$store.dispatch('handleFilterBulletins', newBulletins)
      } else if (data.totalHours !== '' && data.employeeName === '') {
        const newBulletins = this.consolidatedBulletins.filter((item) => {
          return item.totalHours == data.totalHours
        });
        this.$store.dispatch('handleFilterBulletins', newBulletins)
      } else if (data.employeeName !== '' && data.totalHours !== '') {
        const newBulletins = this.consolidatedBulletins.filter((item) => {
          return item.employee.name == data.employeeName && item.totalHours == data.totalHours
        });
        this.$store.dispatch('handleFilterBulletins', newBulletins)
      } else {
        this.$store.dispatch('handleSetEmployee', {});
        this.$store.dispatch('handleFilterBulletins', this.consolidatedBulletins)
      }
    }
  },
  async mounted() {
    this.handleDoDefaultFilter();
  },

})
</script>