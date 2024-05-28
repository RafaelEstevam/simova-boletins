<template>
  <div class="filter">
    <inputComponent v-if="!userId" :inputName="'employeeName'" :inputValue="employeeName" :placeholder="'Nome do funcionário'"
      :required="true" :readonly="readonly" v-model="employeeName" />
    <inputComponent :inputName="'totalHours'" :inputValue="totalHours" :placeholder="'Total de horas'" :required="true"
      v-model="totalHours" />
    <button type="button" @click="handleFilter">Filtrar</button>
  </div>
</template>

<script>

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getBulletins } from '@/services/bulletins.service';

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
    const employee = computed(() => $store.state.employee);

    return {
      $store,
      bulletins,
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
        this.handleFilter()
      }
    },
  },
  methods: {
    async handleFilter() {
      const data = {
        name: this.employeeName,
        totalHours: this.totalHours
      }
      getBulletins(data, (response) => this.$store.dispatch('handleFilterBulletins', response))
    },
    async handleDoDefaultFilter() {
      await this.handleFilter();
    },
  },
  async mounted() {
    this.handleDoDefaultFilter();
  },

})
</script>