<script setup lang="ts">
import { getUserData } from '@/api'
import type { UserData } from '@/types/User'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CatNapButton from '../CatNapButton.vue'
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
      <div class="flex justify-end space-x-5 items-center">
        <div class="text-lg py-1 px-3 rounded-xl border border-secondary">
          {{ formattedDate }}
        </div>
        <div class="bg-secondary p-2 rounded-full">
          <img src="@/assets/icons/profile-cat.svg" alt="Cat" />
        </div>
      </div>

      <div class="mb-5">
        <h2 class="text-xl font-semibold text-[#C1A2FB]">Dream Diary</h2>
        <h1 class="text-2xl font-bold">What was your dream about?</h1>
      </div>

      <div class="flex flex-grow gap-8">
        <div class="w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl p-3 overflow-auto">
          <p class="mb-3 font-medium">The Exam under water with sealions</p>
          <p class="text-sm">{{ formattedDate }}</p>
        </div>

        <div class="w-2/3 bg-gradientGrayDown shadow-2xl rounded-xl pt-3">
          <div class="p-5 flex flex-col h-full">
            <input
              type="text"
              placeholder="Title"
              class="w-full mb-3 p-2 border bg-inputBlue border-purple rounded"
            />
            <textarea
              placeholder="Text"
              class="w-full flex-grow p-2 border bg-inputBlue border-purple rounded"
            ></textarea>
            <CatNapButton text="Add Entry" type="outline" class="w-1/4 self-center py-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
