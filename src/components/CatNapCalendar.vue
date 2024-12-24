<template>
  <div class="flex flex-col gap-1 p-4 rounded-2xl text-white w-max">
    <div class="grid grid-cols-7 gap-1 font-black text-md text-center">
      <div
        v-for="(day, index) in weekDays"
        :key="day"
        :class="['p-1 rounded', { 'bg-purple text-white': index === currentDay }]"
      >
        {{ day }}
      </div>
    </div>
    <div class="grid grid-cols-7 gap-1 justify-items-center">
      <div
        v-for="empty in startEmptyDays"
        :key="'empty-' + empty"
        class="calendar-cell empty"
      ></div>

      <div class="calendar-cell" v-for="day in daysInMonthCount" :key="'day-' + day">
        <div
          :class="['rounded-full', emotionColorForDay(day) === '#6c6c80' ? 'w-1 h-1' : 'w-2 h-2']"
          :style="{ backgroundColor: emotionColorForDay(day) }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emotionColors = {
  1: '#FF6B6B',
  2: '#FFD93D',
  3: '#4ECDC4',
}

const props = defineProps({
  userData: {
    type: Object,
    required: true,
    default: () => ({ data: {} }),
  },
})

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const today = new Date()
const currentDay = (today.getDay() + 6) % 7 // Montag = 0, Sonntag = 6

const currentMonth = today.getMonth()
const currentYear = today.getFullYear()

const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
const startDayIndex = (firstDayOfMonth + 6) % 7
const daysInMonthCount = new Date(currentYear, currentMonth + 1, 0).getDate()
const startEmptyDays = Array.from({ length: startDayIndex }, (_, i) => i + 1)

const emotionColorForDay = (day: number) => {
  const dateKey = `${String(day).padStart(2, '0')}/${String(currentMonth + 1).padStart(2, '0')}/${currentYear}`
  const dayData = props.userData.data[dateKey]
  console.log(dateKey, dayData)
  if (dayData && dayData.emotion) {
    const emotion = dayData.emotion as keyof typeof emotionColors
    const color = emotionColors[emotion]
    return color
  }
  return '#6c6c80'
}
</script>

<style scoped>
.calendar-cell {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-cell.empty {
  background-color: transparent;
}
</style>
