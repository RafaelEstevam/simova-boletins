<template>
	<div class="filter">
		<inputComponent />
		<inputComponent />
		<buttonComponent />
	</div>
</template>

<script>
	import { defineComponent } from 'vue';
	import InputComponent from '@/components/Input/input.component.vue';
	import ButtonComponent from '@/components/Button/button.component.vue';

	export default defineComponent({
		name: 'bulletinsFilter',
		components: {
			InputComponent,
			ButtonComponent
		}
	})
</script>