<template>
  <input :name="inputName" :id="inputName" :placeholder="placeholder" :value="value" :required="required" :readonly="readonly"
    @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'InputComponent',
  props: {
    type: {
      type: String,
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
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
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
</style>