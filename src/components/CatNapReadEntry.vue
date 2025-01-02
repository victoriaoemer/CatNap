<template>
  <div v-if="dream" class="flex flex-col h-full">
    <div class="flex gap-4 pb-5">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold">{{ dream.date }}</h1>
        <h1 class="text-3xl font-bold">{{ dream.title }}</h1>
        <p class="text-lg">{{ emotionLabel(dream.emotion) }}</p>
        <p class="text-lg">{{ dream.content }}</p>
      </div>
      <button @click="$emit('close')" class="mt-4 p-2 bg-red-500 text-white rounded-md">
        Back to Add Entry
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  dream: { date: string; title: string; content: string; emotion: number } | null
}>()

const emotionLabel = (emotion: number) => {
  const emotions: { [key: number]: string } = {
    1: 'Sad',
    2: 'Neutral',
    3: 'Happy',
  }
  return emotions[emotion] || 'Unknown'
}
</script>

<style scoped></style>
