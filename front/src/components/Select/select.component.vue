<template>
  <div class="select">
    <p>{{ placeholder }}</p>
    <select :required="required" :name="inputName" :id="inputName" :value="value"
      @input="$emit('update:modelValue', $event.target.value)" class="select__field">
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

.select {
  display: flex;
  gap: $spacing-sm;
  align-items: center;
  width: 100%;
}

.select__field {
  border: 0px;
  border-radius: $spacing-md;
  padding: 14px $spacing-md;
  background-color: $white-color;
  width: 100%;
}
</style>