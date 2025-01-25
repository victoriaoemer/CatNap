<script setup lang="ts">
import { usePixabayStore } from '@/types/Pixabay'
import { useUserStore, type UserData } from '@/types/User'
import { computed, onMounted, ref } from 'vue'
import CatNapAverageEmotion from '../CatNapAverageEmotion.vue'
import CatNapCalendar from '../CatNapCalendar.vue'
import CatNapEntryWidget from '../CatNapEntryWidget.vue'
import CatNapQuoteDisplay from '../CatNapQuoteDisplay.vue'
import CatNapSidebar from '../CatNapSidebar.vue'
import CatNapTimestamp from '../CatNapTimestamp.vue'

const userStore = useUserStore()
const user = userStore.username

const userData = ref<UserData>({} as UserData)

onMounted(async () => {
  try {
    const data = await userStore.getUserData(user)
    userData.value = data
    const pixabayStore = usePixabayStore()
    const userImage = pixabayStore.getUserImage(user)

    if (userImage.valueOf() === '') {
      await pixabayStore.fetchImage(true, data.username)
    }
  } catch (error) {
    console.error('Error loading data:', error)
  }
})

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

const getUsername = computed(() => {
  return userStore.username.charAt(0).toUpperCase() + userStore.username.slice(1)
})
</script>

<template>
  <div
    class="h-screen w-full flex flex-col md:flex-row md:p-8"
    :class="{ 'overflow-hidden': isSidebarOpen }"
  >
    <CatNapSidebar
      :user="user"
      class="hidden md:flex fixed top-0 left-0 m-5 h-[calc(100vh-3rem)]"
    />
    <div class="h-screen w-full md:w-fit relative">
      <div
        v-if="isSidebarOpen"
        @click="closeSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      <CatNapSidebar
        v-if="isSidebarOpen"
        :user="user"
        :mobile="true"
        @close="closeSidebar"
        class="md:hidden z-50 fixed top-0 left-0 h-screen bg-white shadow-lg"
      />
    </div>
    <div class="w-full flex flex-col md:pl-32">
      <div
        class="flex items-center justify-between md:justify-end space-x-5 bg-secondary md:bg-transparent pt-4 pb-2 px-6 md:px-0 rounded-b-2xl"
      >
        <button @click="toggleSidebar" class="md:hidden">
          <img src="@/assets/icons/menu.svg" alt="Menu" class="h-8 w-max" />
        </button>
        <CatNapTimestamp :userData="userData" />
      </div>

      <div class="mb-5 pt-5 px-6 md:p-0">
        <h2 class="text-xl font-semibold text-[#C1A2FB]">Home</h2>
        <h1 class="text-2xl font-bold">Dashboard</h1>
      </div>

      <!-- Dashboard -->
      <div class="flex flex-col flex-grow pt-5 px-6 md:pb-8 md:px-0 md:pt-0">
        <div class="flex flex-col lg:flex-row gap-8 w-full">
          <div class="bg-gradient shadow-2xl rounded-xl p-5 lg:w-1/2">
            <div class="flex justify-between">
              <div>
                <p class="mb-3 mt-1 font-bold text-xl md:text-4xl">Hello, {{ getUsername }}!</p>
                <p class="font-semibold text-lg">What are we doing today?</p>
              </div>
              <img src="@/assets/cat-images/cat-home1.svg" alt="Cat" class="h-36" />
            </div>
          </div>

          <div class="flex flex-col sm:flex-row lg:w-1/2 gap-8">
            <div class="w-full bg-gradientGrayDown shadow-2xl rounded-xl p-3">
              <div v-if="userData.data">
                <CatNapAverageEmotion :userData="userData" />
              </div>
              <div v-else>
                <div class="h-full w-full justify-items-center">
                  <p>Miau, no data yet</p>

                  <img src="@/assets/cat-images/cat-entry2.svg" alt="cat" class="h-28" />
                </div>
              </div>
            </div>

            <div
              class="flex justify-center w-full sm:w-fit bg-gradientGrayDown shadow-2xl rounded-xl"
            >
              <div class="p-2 flex flex-col h-full">
                <CatNapCalendar :userData="userData" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full flex flex-col lg:flex-row gap-8 pt-5 px-6 md:p-0">
        <div class="lg:w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl h-full">
          <div class="p-5">
            <CatNapQuoteDisplay />
          </div>
        </div>
        <div class="lg:w-2/3 bg-gradientGrayDown shadow-2xl rounded-xl h-full">
          <div class="p-5 flex justify-between h-full w-full">
            <CatNapEntryWidget :userData="userData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
