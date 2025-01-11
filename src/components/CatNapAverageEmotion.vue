<template>
  <div
    v-if="averageEmotionPerMonth[month]"
    class="flex flex-col p-2 gap-3 justify-center items-center"
  >
    <p>Your dreamy month so far</p>

    <div class="w-full">
      <img
        :src="imageMap[averageEmotionPerMonth[month]]"
        alt="Cat Emotion"
        class="h-16"
        :class="[
          'pb-1',
          { 'place-self-center': averageEmotionPerMonth[month] === 2 },
          { 'place-self-end': averageEmotionPerMonth[month] === 3 },
        ]"
      />
      <div class="w-full h-5 bg-emotionGradient rounded-full"></div>
    </div>
  </div>
  <div v-else>
    <p>No entries for this month</p>
  </div>
</template>

<script setup lang="ts">
import type { UserData } from '@/types/User'
import { computed, ref } from 'vue'

const props = defineProps<{
  userData: UserData
}>()

import catPinHappy from '@/assets/cat-emotes/cat-pin-happy.svg'
import catPinMeh from '@/assets/cat-emotes/cat-pin-meh.svg'
import catPinSad from '@/assets/cat-emotes/cat-pin-sad.svg'

const imageMap: Record<number, string> = {
  1: catPinSad,
  2: catPinMeh,
  3: catPinHappy,
}

const month = ref<string>((new Date().getMonth() + 1).toString().padStart(2, '0'))

const emotionsPerMonth = computed(() => {
  if (!props.userData.data) {
    return {}
  }
  return Object.entries(props.userData.data).reduce<Record<string, number[]>>(
    (acc, [date, data]: [string, { emotion: number }]) => {
      const currentMonth = date.split('/')[1]
      if (!acc[currentMonth]) {
        acc[currentMonth] = []
      }
      acc[currentMonth].push(data.emotion)
      return acc
    },
    {},
  )
})

const averageEmotionPerMonth = computed(() => {
  return Object.fromEntries(
    Object.entries(emotionsPerMonth.value).map(([month, emotions]) => [
      month,
      Math.round(emotions.reduce((sum, emotion) => sum + emotion, 0) / emotions.length),
    ]),
  )
})
</script>
