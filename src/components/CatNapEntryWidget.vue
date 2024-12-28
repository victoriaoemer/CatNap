<template>
  <div class="grid gap-5 w-full" :class="{ 'grid-cols-2': entries.length > 0 }">
    <div v-if="userData.data">
      <h2 class="text-gradient text-3xl font-bold w-fit pb-3">Your Dream Diary</h2>
      <CatNapDreamEntries :dreams="entries" :short="true" />
    </div>
    <div>
      <CatNapAddEntry />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserData } from '@/types/User'
import { computed } from 'vue'
import CatNapAddEntry from './CatNapAddEntry.vue'
import CatNapDreamEntries from './CatNapDreamEntries.vue'

const props = defineProps<{
  userData: UserData
}>()

const entries = computed(() => {
  return props.userData.data ? Object.entries(props.userData.data) : []
})
</script>

<style scoped></style>
