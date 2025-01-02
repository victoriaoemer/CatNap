<script setup lang="ts">
import MunchkinBlue from '@/assets/cat-profile/munchkin-blue.svg'
import MunchkinDefault from '@/assets/cat-profile/munchkin-default.svg'
import MunchkinGreen from '@/assets/cat-profile/munchkin-green.svg'
import MunchkinLucky from '@/assets/cat-profile/munchkin-lucky.svg'
import MunchKindRed from '@/assets/cat-profile/munchkin-red.svg'
import { useUserStore, type UserData } from '@/types/User'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CatNapAddEntry from '../CatNapAddEntry.vue'
import CatNapDreamEntries from '../CatNapDreamEntries.vue'
import CatNapSidebar from '../CatNapSidebar.vue'
import CatNapReadEntry from '../CatNapReadEntry.vue'

const userStore = useUserStore()
const user = userStore.username
const userData = ref<UserData>({} as UserData)
const router = useRouter()

const date = new Date()
const formattedDate = date.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const imageMap: Record<number, string> = {
  1: MunchkinDefault,
  2: MunchKindRed,
  3: MunchkinBlue,
  4: MunchkinLucky,
  5: MunchkinGreen,
}

const entries = ref<[string, { title: string; content: string; emotion: number }][]>([])
onMounted(async () => {
  try {
    const data = await userStore.getUserData(user)
    userData.value = data
    if (data.data) {
      entries.value = Object.entries(data.data)
    }
  } catch (error) {
    console.error(error)
  }
})

// select Dreams
interface DreamDetails {
  title: string
  content: string
  emotion: number
}

interface DreamSelected {
  dream: DreamDetails
  date: string
}

const selectedDream = ref<DreamSelected | null>(null)

const handleDreamSelected = (dream: DreamSelected) => {
  selectedDream.value = dream
  selectedDream.value.date = formattedDate
}

// sidebar
const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

</script>

<template>
  <div class="w-full h-screen flex flex-col md:flex-row md:p-8" :class="{ 'overflow-hidden': isSidebarOpen }">
    <CatNapSidebar :user="user" class="hidden md:flex fixed top-0 left-0 m-5 h-[calc(100vh-3rem)]" />
    <div class="w-full md:w-fit relative">
      <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <CatNapSidebar v-if="isSidebarOpen" :user="user" :mobile="true" @close="closeSidebar"
        class="md:hidden z-50 fixed top-0 left-0 h-screen bg-white shadow-lg" />
    </div>
    <div class="w-full flex flex-col md:pl-32">
      <div
        class="flex items-center justify-between md:justify-end space-x-5 bg-secondary md:bg-transparent pt-4 pb-2 px-6 md:px-0 rounded-b-2xl">
        <button @click="toggleSidebar" class="md:hidden">
          <img src="@/assets/icons/menu.svg" alt="Menu" class="h-8 w-max" />
        </button>
        <div class="md:text-lg py-1 px-3 rounded-xl border border-purple md:border-secondary">
          {{ formattedDate }}
        </div>
        <div class="md:bg-secondary bg-purple p-2 rounded-full">
          <div v-if="userData.settings">
            <img :src="imageMap[userData.settings.profilePicture || 1]" alt="Cat" class="cursor-pointer"
              @click="router.push('/settings/' + userData.username)" />
          </div>
        </div>
      </div>

      <div class="mb-5 pt-5 px-6 md:p-0">
        <h2 class="text-xl font-semibold text-[#C1A2FB]">Dream Diary</h2>
        <h1 class="text-2xl font-bold">What was your dream about?</h1>
      </div>

      <div class="flex flex-grow flex-col lg:flex-row gap-8 pt-5 px-6 md:p-0">
        <div v-if="entries.length" class="lg:w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl p-5 overflow-auto">
          <h2 class="text-gradient text-3xl font-bold w-fit pb-3">Your Dream Entries</h2>
          <CatNapDreamEntries :dreams="entries" :date="formattedDate" @dreamSelected="handleDreamSelected" />
        </div>

        <div class="bg-gradientGrayDown shadow-2xl rounded-xl p-5"
          :class="['lg:w-2/3', { '!w-full': !entries.length }]">
          <CatNapAddEntry v-if="!selectedDream" :date="formattedDate" />
          <CatNapReadEntry v-if="selectedDream" :dream="{ ...selectedDream.dream, date: selectedDream.date }"
            @close="selectedDream = null" />
        </div>
      </div>
    </div>
  </div>
</template>
