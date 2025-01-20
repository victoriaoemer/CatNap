<template>
  <div class="relative w-full">
    <div class="flex items-center bg-[#3B32AB] border border-[#3E2FE9] rounded-xl p-2">
      <select
        class="flex-1 bg-transparent text-white appearance-none focus:outline-none"
        v-model="inputValue"
      >
        <option :value="null" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <div class="flex flex-col justify-center items-center ml-2 pointer-events-none">
        <!-- arrow up -->
        <svg class="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M14.78 11.28a.75.75 0 0 1-1.06 0L10 7.56l-3.72 3.72a.75.75 0 1 1-1.06-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06Z"
            clip-rule="evenodd"
          />
        </svg>
        <!-- arrow down -->
        <svg class="w-3 h-3 text-gray-400 -mt-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M5.22 8.72a.75.75 0 0 1 1.06 0L10 12.44l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array as () => string[],
    required: true,
  }
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

<style scoped>
select {


  appearance: none;
  padding-right: 2.5rem; /* Platz für das SVG */

}

select:focus {
  outline: 2px solid #705efc;
}

select option {
  background: #3b32ab;
  color: white;
}
</style>
