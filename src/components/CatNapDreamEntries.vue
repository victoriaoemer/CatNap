<template>
  <div v-if="safeDreams.length > 0">
    <div
      v-for="([date, details], index) in reversedDreams"
      :key="index"
      class="p-2 my-3 bg-gradient flex justify-between gap-5 items-center rounded-xl overflow-hidden"
    >
      <p class="title text-lg font-bold">{{ details.title }}</p>

      <div class="flex flex-col gap-2 items-end">
        <p :class="['rounded-full h-2 w-2', emotionConverter(details.emotion)]"></p>
        <p class="text-sm">{{ date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  dreams: [string, { title: string; content: string; emotion: number }][]
  short?: boolean
}>()

const safeDreams = props.dreams || []

const emotionConverter = (emotion: number) => {
  if (emotion) {
    const emotionMap = {
      1: 'bg-emotion-red',
      2: 'bg-emotion-orange',
      3: 'bg-emotion-green',
    }
    return emotionMap[emotion as keyof typeof emotionMap]
  }
  return
}

const reversedDreams = computed(() => {
  if (props.short) {
    return props.dreams.slice().reverse().slice(0, 5)
  }
  return props.dreams.slice().reverse()
})
</script>

<style scoped></style>
