<script setup lang="ts">
defineProps({
  text: String,
  type: String,
})
</script>

<template>
  <div>
    <button v-if="type === 'filled'" class="gradient-bg hover:bg-gradient">{{ text }}</button>
    <button v-if="type === 'outline'" class="border rounded-xl border-secondary hover:bg-gradient">{{ text }}</button>
  </div>
</template>

<style scoped>
button {
  width: 100%;
  text-align: center;
  padding: 0.5rem 1.25rem 0.5rem 1.25rem;
  font-weight: 600;
}
</style>
