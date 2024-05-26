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
					<datatableHeaderHeader />
					<datatableContentComponent :list="list" />
				</datatableComponent>
			</div>
		</div>
	</div>
</template>

<script>
	import { defineComponent } from 'vue';

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
    data(){
      const list = [];
      return{
        list
      }
    }
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