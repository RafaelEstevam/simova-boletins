<template>
  <div class="input">
    <input :required="required" :name="inputName" :id="inputName" :placeholder="placeholder" :value="value" :type="type"
      @input="$emit('update:modelValue', $event.target.value)" class="input__field"
      :class="showValidation && 'error-input'" />
  </div>

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

.input {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  width: 100%;
}

.input__field {
  border: 0px;
  border-radius: $spacing-md;
  padding: $spacing-md;
  background-color: $white-color;
  width: 100%;
}
</style>