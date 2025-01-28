<template>
  <div class="flex flex-col gap-1 h-max p-2 rounded-2xl text-white w-max">
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
          :class="[
            'rounded-full',
            emotionClassForDay(day) === 'bg-gray-400' ? 'w-1 h-1' : 'w-2 h-2',
            emotionClassForDay(day),
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const today = new Date()
const currentDay = (today.getDay() + 6) % 7 // monday = 0, sunday = 6

const currentMonth = today.getMonth()
const currentYear = today.getFullYear()

const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
const startDayIndex = (firstDayOfMonth + 6) % 7
const daysInMonthCount = new Date(currentYear, currentMonth + 1, 0).getDate()
const startEmptyDays = Array.from({ length: startDayIndex }, (_, i) => i + 1)

const emotionClassForDay = (day: number) => {
  if (props.userData.data === undefined) {
    return 'bg-gray-400'
  }

  const dateKey = `${String(day).padStart(2, '0')}/${String(currentMonth + 1).padStart(2, '0')}/${currentYear}`
  const dayData = props.userData.data[dateKey]

  if (dayData && dayData.emotion) {
    const emotionMap = {
      1: 'bg-emotion-red',
      2: 'bg-emotion-orange',
      3: 'bg-emotion-green',
    }
    return emotionMap[dayData.emotion as keyof typeof emotionMap] || 'bg-gray-400'
  }
  return 'bg-gray-400'
}

const props = defineProps({
  userData: {
    type: Object,
    required: true,
    default: () => ({ data: {} }),
  },
})
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
