<template>
  <div
    v-bind:class="
      settings
        ? 'w-full bg-[#3B32AB] border border-[#3E2FE9] rounded-xl p-2'
        : 'gradient-border-bottom w-full'
    "
  >
    <input
      autocomplete="on"
      :id="id"
      class="bg-transparent focus:outline-none pb-1"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  settings: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
