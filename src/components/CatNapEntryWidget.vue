<template>
  <div class="grid gap-5 w-full" :class="{ 'grid-cols-2': entries.length > 0 }">
    <div v-if="userData.data">
      <h2 class="text-gradient text-3xl font-bold w-fit pb-3">Your Dream Diary</h2>
      <CatNapDreamEntries :dreams="entries" :short="true" :date="new Date().toISOString()" :disableHover="true" />
    </div>
    <div>
      <CatNapAddEntry :date="formattedDate" :onUpdateEntries="updateEntries" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore, type UserData } from '@/types/User'
import {  onMounted, ref } from 'vue'
import CatNapAddEntry from './CatNapAddEntry.vue'
import CatNapDreamEntries from './CatNapDreamEntries.vue'

const userData = ref<UserData>({} as UserData)

const userStore = useUserStore()
const user = userStore.username
const date = new Date()
const formattedDate = date.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const entries = ref<[string, { title: string; content: string; emotion: number }][]>([])

const updateEntries = async () => {
  const data = await userStore.getUserData(user)
  userData.value = data
  if (data.data) {
    entries.value = Object.entries(data.data)
  }
}

onMounted(async () => {
  try {
    updateEntries()
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped></style>
