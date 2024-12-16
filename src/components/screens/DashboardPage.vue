<script setup lang="ts">
import { getUserData } from '@/api'
import type { UserData } from '@/types/User'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CatNapSidebar from '../CatNapSidebar.vue'

const router = useRouter()
const user = router.currentRoute.value.params.username.toString()

const userData = ref<UserData>({} as UserData)

const date = new Date()
const formattedDate = date.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

onMounted(async () => {
  try {
    const data = await getUserData(user)
    userData.value = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="h-screen w-full flex p-8">
    <CatNapSidebar :user="user" />

    <div class="w-full flex flex-col pl-24">
      <div class="flex justify-end space-x-5">
        <div class="text-lg py-1 px-3 rounded-xl border border-secondary">
          {{ formattedDate }}
        </div>
        <div class="bg-secondary p-2 rounded-full">
          <img src="@/assets/cat-profile/munchkin-default.svg" alt="Cat" />
        </div>
      </div>

      <div class="mb-5">
        <h2 class="text-xl font-semibold">Home</h2>
        <h1 class="text-2xl font-bold">Dashboard</h1>
      </div>

      <!-- Dashboard -->
      <div class="flex flex-col h-2/3 pb-3">
        <div class="flex gap-8 w-full">
          <div class="bg-gradient shadow-2xl rounded-xl p-3 w-1/2">
            <div class="flex justify-between">
              <div>
                <p class="mb-3 font-bold text-3xl">Hello, Minicat!</p>
                <p>What are we doing today?</p>
              </div>
              <img src="@/assets/cat-images/cat-home1.svg" alt="Cat" class="h-48" />
            </div>
          </div>

          <div class="w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl p-3">
            <p class="text-xl">How are you feeling?</p>
          </div>

          <div class="w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl">
            <div class="p-5 flex flex-col h-full">
              <input
                type="text"
                placeholder="Title"
                class="w-full mb-3 p-2 border bg-inputBlue border-purple rounded"
              />
              <textarea
                placeholder="Text"
                class="w-full p-2 border bg-inputBlue border-purple rounded"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full flex gap-8">
        <div class="w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl h-full">
          <div class="p-5 flex flex-col">
            <p>Today's Quote</p>
          </div>
        </div>
        <div class="w-2/3 bg-gradientGrayDown shadow-2xl rounded-xl h-full">
          <div class="p-5 flex justify-between h-full">
            <p>Your Dream Diary</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
