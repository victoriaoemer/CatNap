<template>
  <div v-if="safeDreams.length > 0">
    <div v-for="([date, details], index) in reversedDreams"
      :key="index"
      :class="[
        'p-2 my-3 flex border bg-gradient border-secondary justify-between gap-5 items-center rounded-xl overflow-hidden transition-all duration-300 ease-in-out',
        (!disableHover || selectedDream === details) && 'hover:border-violet-500 hover:shadow-xl hover:bg-opacity-80 hover:brightness-125',
        selectedDream === details && 'border-violet-500 shadow-xl bg-opacity-80 brightness-125',
      ]"
      @click="selectDream(details, date)">
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
  date: string
  short?: boolean
  selectedDream: { title: string; content: string; emotion: number } | null
  disableHover?: boolean
}>()

const emit = defineEmits(['dreamSelected'])
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

const selectDream = (dream: { title: string; content: string; emotion: number }, date: string) => {
  emit('dreamSelected', { dream, date })
}
</script>
