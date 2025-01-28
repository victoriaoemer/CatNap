<template>
  <div class="flex items-center space-x-5">
    <div class="md:text-lg py-1 px-3 rounded-xl border-secondary border">
      {{ formattedDate }}
    </div>
    <div class="md:bg-secondary bg-purple p-2 rounded-full">
      <div v-if="userData?.settings">
        <img
          :src="imageMap[userData.settings.profilePicture || 1]"
          alt="Cat"
          class="cursor-pointer"
          @click="router.push('/settings/' + userData.username)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UserData } from '../types/User'
import { useUserStore } from '../types/User'

import MunchkinBlue from '@/assets/cat-profile/munchkin-blue.svg'
import MunchkinDefault from '@/assets/cat-profile/munchkin-default.svg'
import MunchkinGreen from '@/assets/cat-profile/munchkin-green.svg'
import MunchkinLucky from '@/assets/cat-profile/munchkin-lucky.svg'
import MunchkinRed from '@/assets/cat-profile/munchkin-red.svg'

const router = useRouter()

const userStore = useUserStore()
const userData = ref<UserData | null>(null)

const date = new Date()
const formattedDate = `${date.toLocaleDateString('en-GB', { weekday: 'long' })}, ${date.getDate()}. ${date.toLocaleDateString('en-GB', { month: 'long' })}`

const imageMap: Record<number, string> = {
  1: MunchkinDefault,
  2: MunchkinRed,
  3: MunchkinBlue,
  4: MunchkinLucky,
  5: MunchkinGreen,
}

onMounted(async () => {
  try {
    const data = await userStore.getUserData(userStore.username)
    userData.value = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<style></style>
