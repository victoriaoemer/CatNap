<template>
  <div v-if="dream" class="flex flex-col h-full w-full">
    <div class="flex justify-between">
      <p class="text-lg font-bold text-gradient">{{ dream.date }}</p>


      <CatNapButton class="w-fit" text="Close" type="outline" @click="$emit('close')" />
    </div>
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold">{{ dream.title }}</h1>
      <p class="text-lg"> Category: {{ emotionLabel(dream.emotion) }} Dream</p>
      <p class="text-lg">{{ dream.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CatNapButton from './CatNapButton.vue';

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
