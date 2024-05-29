<template>
  <button class="button" :id="id" :type="type" :class="variantColor" @click="$emit('buttonAction')">{{
    label }}</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'buttonComponent',
  emits: ['buttonAction'],
  computed: {
    variantColor(){
      return `${this.variant} ${this.color} ${this.size} ${this.fullwidth && 'fullWidth'}`
    }
  },
  props: {
    id: {
      type: String,
    },
    size: {
      type: String,
      default: 'md',
    },
    label: {
      type: String,
    },
    variant: {
      type: String,
    },
    color: {
      type: String,
    },
    fullwidth: {
      type: Boolean,
    },
    type: {
      type: String
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/tokens.scss';

.button {
  border: 0px;
  padding: 14px $spacing-md;
  color: $white-color;
  font-weight: bold;
  border-radius: $spacing-md;
  opacity: 0.8;
  cursor: pointer;
  transition: linear all 0.1s;
  font-size: $font-md;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.98);
  }

  &.filled {
    &.primary {
      background-color: $primary-color;
    }

    &.secondary {
      background-color: $secondary-color;
    }

    &.danger {
      background-color: $danger-color;
    }

    &.dark {
      background-color: $dark-color;
    }
  }

  &.outlined {
    border: 2px solid;
    background: transparent;
    padding: 12px $spacing-md;

    &.primary {
      border-color: $primary-color;
      color: $primary-color;
    }

    &.secondary {
      border-color: $secondary-color;
      color: $secondary-color;
    }

    &.danger {
      border-color: $danger-color;
      color: $danger-color;
    }

    &.dark {
      border-color: $dark-color;
      color: $dark-color;
    }

    &.white {
      border-color: $white-color;
      color: $white-color;
    }
  }

  &.sm {
    padding: $spacing-sm;
    font-size: $font-sm;
  }

  &.fullWidth {
    width: 100%;
  }

  &[disabled] {
    background-color: $light-color !important;
    cursor: not-allowed;
  }

}
</style>