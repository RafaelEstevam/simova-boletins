<template>
  <div class="select">
    <p>{{ placeholder }}</p>
    <select :name="inputName" :id="inputName" :placeholder="placeholder" :value="value"
      @input="$emit('update:modelValue', $event.target.value)">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>

</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'selectComponent',
  props: {
    options: {
      type: Array
    },
    inputName: {
      type: String,
      required: true
    },
    inputValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
  },
  setup(props, { emit }) {
    const value = computed({
      get: () => props.inputValue,
      set: (newValue) => {
        emit('update:inputValue', newValue);
      },
    });

    return {
      value
    };
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.select{
  display: flex;
  align-items: center;
  gap: $spacing-md;
}
</style>