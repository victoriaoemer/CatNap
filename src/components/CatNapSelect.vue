<template>
  <div>
    <select
      class="w-full bg-[#3B32AB] border-2 border-[#3E2FE9] rounded-xl p-2 "
      v-model="inputValue"
    >
      <option value="art">Art</option>
      <option value="beauty">Beauty</option>
      <option value="change">Change</option>
      <option value="communication">Communication</option>
      <option value="cool">Cool</option>
      <option value="courage">Courage</option>
      <option value="dreams">Dreams</option>
      <option value="faith">Faith</option>
      <option value="family">Family</option>
      <option value="freedom">Freedom</option>
      <option value="friendship">Friendship</option>
      <option value="funny">Funny</option>
      <option value="future">Future</option>
      <option value="good">Good</option>
      <option value="graduation">Graduation</option>
      <option value="great">Great</option>
      <option value="happiness">Happiness</option>
      <option value="health">Health</option>
      <option value="history">History</option>
      <option value="home">Home</option>
      <option value="hope">Hope</option>
      <option value="humor">Humor</option>
      <option value="imagination">Imagination</option>
      <option value="inspirational">Inspirational</option>
      <option value="intelligence">Intelligence</option>
      <option value="life">Life</option>
      <option value="love">Love</option>
      <option value="movies">Movies</option>
      <option value="success">Success</option>
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
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
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
