<template>
  <div class="checkbox">
    <input type="checkbox" :name="inputName" :id="inputName" v-model="checkbox" :checked="checked" />
    <p class="checkbox__label">{{ label }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'checkboxComponent',
  props: {
    label: {
      type: String,
      required: true,
    },
    inputName: {
      type: String,
      required: true
    },
    inputValue: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checkbox: false,
    }
  },

  emits: ['updateCheckBox'],

  watch: {
    checkbox(n) {
      this.$emit('updateCheckBox', n);
    },
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.checkbox {
  display: flex;
  gap: $spacing-sm;
  align-items: center;
  justify-content: center;
}

.checkbox__label {
  font-size: $font-md;
}

input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 100%;
  outline: none;
  cursor: pointer;
}

input[type="checkbox"]:focus {
  border-color: $secondary-color;
}

input[type="checkbox"]:checked {
  background-color: $primary-color;
  border-color: $primary-color;
}

input[type="checkbox"]:checked::before {
  content: "\2713";
  display: block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  font-size: $font-md;
}
</style>