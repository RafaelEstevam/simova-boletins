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
				<datatableComponent :list="list">
					<datatableHeaderHeader />
					<datatableContentComponent />
				</datatableComponent>
			</div>
		</div>
	</div>
</template>

<script>
	import { computed, defineComponent } from 'vue';
  import { useStore } from 'vuex';

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
      const appointments = computed(() => $store.getters.appointments);
      return {
        $store,
        appointments
      }
    },

    data(){
      const list = [];
      return {
        list
      }
    },

    watch:{
      appointments(newItems, oldItems){
        this.list = JSON.parse(JSON.stringify(newItems));
      }
    },

    // data(){
    //   const list = [
    //     {id: "1"}
    //   ];
    //   return{
    //     list
    //   }
    // }
	})
</script>

<style lang="scss">
  @import '@/styles/tokens.scss';

  .appointments__modal__content__wrapper {
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