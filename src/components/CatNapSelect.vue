<template>
  <div>
    <select
      class="w-full bg-[#3B32AB] border-2 border-[#3E2FE9] rounded-xl p-2 "
      v-model="inputValue"
    >
    <option :value="null" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
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

}

select:focus {
  outline: 2px solid #705efc;
}

select option {
  background: #3b32ab;
  color: white;
}
</style>
