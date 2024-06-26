<template>
  <div class="filter">
    <inputComponent v-if="!userId" :inputName="'employeeName'" :inputValue="employeeName"
      :placeholder="'Nome do funcionário'" :required="true" :readonly="readonly" v-model="employeeName" />
    <inputComponent :inputName="'totalHours'" :inputValue="totalHours" :placeholder="'Total de horas'" :required="true"
      v-model="totalHours" />
    <buttonComponent :id="'filter-bulletins'" @buttonAction="handleDoDefaultFilter" :color="'primary'" :variant="'filled'"
      :type="'button'" :label="'Filtrar'" />
  </div>
</template>

<script>

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getBulletins, getBulletinsByEmployeeId } from '@/services/bulletins.service';

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

    const employeeName = '';
    const totalHours = '';
    const employeeBulletins = [];

    return {
      employeeName,
      totalHours,
      employeeBulletins
    }
  },

  watch: {
    userId(n, o) {
      this.handleDoDefaultFilter()
    },
  },

  methods: {
    async handleFilterBullets() {
      const data = {
        name: this.employeeName,
        totalHours: this.totalHours
      }
      try {
        this.$store.dispatch('handleShowLoading', true);
        await getBulletins(data, (response) => {
        this.$store.dispatch('handleFilterBulletins', response);
      });
      } catch (e){
        console.log(e);
      } finally{
        this.$store.dispatch('handleShowLoading', false);
      }
      
    },
    async handleFilterBulletinsByEmployeeId() {
      const data = {
        id: this.userId
      }
      
      try {
        this.$store.dispatch('handleShowLoading', true);
        await getBulletinsByEmployeeId(data, (response) => {
          this.employeeBulletins = response;
        });
      } catch (e){
        console.log(e);
      } finally{
        this.$store.dispatch('handleShowLoading', false);
      }
      
      this.handleSetBulletsOnStore();
    },
    async handleDoDefaultFilter() {
      this.$store.dispatch('handleFilterBulletins', []);
      if (this.userId) {
        this.handleFilterBulletinsByEmployeeId()
      } else {
        this.handleFilterBullets();
      }
    },
    handleSetBulletsOnStore() {
      if (this.totalHours !== '') {
        const newBulletins = this.employeeBulletins.filter((employeeBulletin) => employeeBulletin.totalHours == this.totalHours);
        this.$store.dispatch('handleFilterBulletins', newBulletins)
      } else {
        this.$store.dispatch('handleFilterBulletins', this.employeeBulletins)
      }
    }
  },
  async mounted() {
    await this.handleDoDefaultFilter()
  },

})
</script>