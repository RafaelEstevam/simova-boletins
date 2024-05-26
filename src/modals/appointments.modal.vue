<template>
  <div class="appointments__modal__content__wrapper">
    <div class="appointments__modal__content__sticky">
      <div class="appointments__modal__content__sticky__wrapper">
        <cardComponent />
        <buttonComponent />
      </div>
    </div>
    <div class="appointments__modal__content__wrapper col">
      <filterComponent>
        <appointmentsFilter />
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
// import api from '@/config/api';
import {useStore} from 'vuex';
import { defineComponent, computed } from 'vue';

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
  setup(){
    const $store = useStore();
    const appointments = computed(() => $store.state.appointments);
    return{
      appointments
    }
  },
  data() {
    const columns = [
      { label: 'Id', width: '10%', key:'id' },
      { label: 'Código', width: '10%', key:'code' },
      { label: 'Descrição', width: '60%', key:'description' },
      { label: 'Cor', width: '20%', key:'color' },
    ];
    return {
      columns
    }
  },
  methods: {
    // async handleFilter(body) {
    //   const response = await api.get('/appointments').then((response) => {
    //     this.list = response.data;
    //   }).catch((e) => {
    //     console.log(e);
    //   })
    // }
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

.appointments__modal__content__sticky {
  position: relative;

  .appointments__modal__content__sticky__wrapper {
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