<script setup lang="ts">
import { getUserData } from '@/api'
import type { UserData } from '@/types/User'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CatNapAverageEmotion from '../CatNapAverageEmotion.vue'
import CatNapCalendar from '../CatNapCalendar.vue'
import CatNapEntryWidget from '../CatNapEntryWidget.vue'
import CatNapSidebar from '../CatNapSidebar.vue'
import QuoteDisplay from '../QuoteDisplay.vue'
import { useQuoteStore } from '@/types/Quotes'
import { usePixabayStore } from '@/types/Pixabay'

const router = useRouter()
const user = router.currentRoute.value.params.username.toString()

const userData = ref<UserData>({} as UserData)

const date = new Date()
const formattedDate = date.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const quoteStore = useQuoteStore()
const pixabayStore = usePixabayStore();

onMounted(async () => {
  try {
    const data = await getUserData(user)
    userData.value = data
    quoteStore.fetchQuote()
    pixabayStore.fetchImage('moon');
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
      <div class="flex flex-col h-fit pb-8">
        <div class="flex gap-8 w-full">
          <div class="bg-gradient shadow-2xl rounded-xl p-3 w-1/2">
            <div class="flex justify-between">
              <div>
                <p class="mb-3 mt-1 font-bold text-4xl">Hello, Minicat!</p>
                <p class="font-semibold text-lg">What are we doing today?</p>
              </div>
              <img src="@/assets/cat-images/cat-home1.svg" alt="Cat" class="h-36" />
            </div>
          </div>

          <div class="w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl p-3">
            <div v-if="userData.data">
              <CatNapAverageEmotion :userData="userData" />
            </div>
          </div>

          <div class="w-fit bg-gradientGrayDown shadow-2xl rounded-xl">
            <div v-if="userData.data" class="p-2 flex flex-col h-full">
              <CatNapCalendar :userData="userData" />
            </div>
          </div>
        </div>
      </div>
      <div class="h-full flex gap-8">
        <div class="w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl h-full">
          <div class="p-5 flex flex-col">
            <p class="mb-3 font-bold text-3xl text-gradient_blue">Today's Quote</p>
            <QuoteDisplay />
          </div>
        </div>
        <div class="w-2/3 bg-gradientGrayDown shadow-2xl rounded-xl h-full">
          <div v-if="userData.data" class="p-5 flex justify-between h-full w-full">
            <CatNapEntryWidget :userData="userData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
