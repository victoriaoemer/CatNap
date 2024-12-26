<script setup lang="ts">
import { useUserStore } from '@/types/User'
import CatNapSidebar from '../CatNapSidebar.vue'
import CatNapButton from '../CatNapButton.vue'
import type { UserData } from '@/types/User'
import { onMounted, ref } from 'vue'
import CatNapInput from '../CatNapInput.vue'
import CatNapSelect from '../CatNapSelect.vue'
import { usePixabayStore } from '@/types/Pixabay'
import { useQuoteStore } from '@/types/Quotes'

const userStore = useUserStore()
const pixabayStore = usePixabayStore()
const quoteStore = useQuoteStore()

const newThemeImage = ref("")
const newThemeQuote = ref("")

const user = userStore.username
const userData = ref<UserData>({} as UserData)

const date = new Date()
const formattedDate = date.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

onMounted(async () => {
  try {
    const data = await userStore.getUserData(user)
    userData.value = data
  } catch (error) {
    console.error(error)
  }
})

const updateTheme = () => {
  pixabayStore.setNewTheme(newThemeImage.value)
  pixabayStore.confirmThemeChange()
  quoteStore.setNewTheme(newThemeQuote.value)
  quoteStore.confirmThemeChange()
}

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}
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
        <div class="md:text-lg py-1 px-3 rounded-xl border border-purple md:border-secondary">
          {{ formattedDate }}
        </div>
        <div class="md:bg-secondary bg-purple p-2 rounded-full">
          <img src="@/assets/cat-profile/munchkin-default.svg" alt="Cat" />
        </div>
      </div>

      <div class="flex">
        <div mb-5>
          <h2 class="text-xl font-semibold text-[#C1A2FB]">Settings</h2>
          <h1 class="text-2xl font-bold">Something you want to change?</h1>
        </div>
        <img src="@/assets/cat-images/cat-settings1.svg" alt="Cat_Settings1" class="h-16 pl-16" />
      </div>

      <!-- Settings -->
      <div class="flex flex-grow gap-8">
        <!-- left side -->
        <div class="w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl p-3 overflow-auto">
          <h3 class="font-semibold text-3xl text-gradient">Profile</h3>
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex flex-col gap-3 pb-2">
              <label for="firstName" class="w-32 font-semibold text-lg">Profile Picture</label>
              <div class="flex gap-5 items-center justify-center">
                <div class="bg-secondary p-2 rounded-full">
                  <img src="@/assets/cat-profile/munchkin-default.svg" alt="Cat" />
                </div>
                <div class="bg-secondary p-2 rounded-full">
                  <img src="@/assets/cat-profile/munchkin-red.svg" alt="Cat" />
                </div>
                <div class="bg-secondary p-2 rounded-full">
                  <img src="@/assets/cat-profile/munchkin-blue.svg" alt="Cat" />
                </div>
                <div class="bg-secondary p-2 rounded-full">
                  <img src="@/assets/cat-profile/munchkin-lucky.svg" alt="Cat" />
                </div>
                <div class="bg-secondary p-2 rounded-full">
                  <img src="@/assets/cat-profile/munchkin-green.svg" alt="Cat" />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-3 pb-2">
              <label for="firstName" class="w-24 font-semibold text-lg">First Name</label>
              <CatNapInput
                v-model="userData.username"
                :placeholder="'First Name'"
                :settings="true"
              />
            </div>
            <div class="flex flex-col gap-3 pb-2">
              <label for="lastName" class="w-24 font-semibold text-lg">Last Name</label>
              <CatNapInput v-model="userData.username" :placeholder="'Last Name'" :settings="true" />
            </div>
            <div class="flex flex-col gap-3 pb-2">
              <label for="username" class="w-24 font-semibold text-lg">Username</label>
              <CatNapInput
              v-model="userData.username"
              :placeholder="'Username'"
              :settings="true"
              />
            </div>
            <div class="flex flex-col gap-3 pb-2">
              <label for="password" class="w-24 font-semibold text-lg">Password</label>
              <CatNapInput
                v-model="userData.username"
                type="password"
                :placeholder="'new Password'"
                @input="'clearWarning'"
                :settings="true"
              />
            </div>
            <CatNapButton class="pl-24 pr-24" text="Update" type="outline" />
          </div>
        </div>

        <!-- right side -->
        <div class="flex flex-col w-2/3 gap-8">
          <!-- upper box -->
          <div class="bg-gradientGrayDown shadow-2xl rounded-xl p-6 h-2/3">
            <h3 class="font-semibold text-3xl text-gradient">Themes</h3>
            <div class="flex flex-col gap-4 mt-4">
              <div>
                <label for="quote" class="block mb-2 font-semibold text-lg">Quote</label>
                <CatNapSelect
                  v-model="newThemeQuote"
                  :options="['Art', 'Beauty', 'Change', 'Communication', 'Cool', 'Courage', 'Dreams', 'Faith',
                  'Family', 'Freedom', 'Friendship', 'Funny', 'Future', 'Good', 'Graduation', 'Great', 'Happiness',
                  'Health', 'History', 'Home', 'Hope', 'Humor', 'Imagination', 'Inspirational', 'Intelligence', 'Life',
                  'Love', 'Movies', 'Success']"
                  :placeholder="'Select a quote'"
                  @change="newThemeQuote = $event.target.value"
                  :settings="true"
                />
              </div>
              <div>
                <label for="image" class="block mb-2 font-semibold text-lg">Image</label>
                <CatNapInput
                  v-model="newThemeImage"
                  :placeholder="pixabayStore.theme"
                  @change="newThemeImage = $event.target.value"
                  :settings="true"
                />
              </div>
              <CatNapButton
                class="pl-64 pr-64"
                text="Update"
                type="outline"
                v-on:click="updateTheme()"
              />
              <div class="flex justify-start">
                <img src="@/assets/cat-images/cat-settings2.svg" alt="Cat_Settings2" class="h-24" />
              </div>
            </div>
          </div>

          <!-- lower box -->
          <div class="bg-gradientGrayDown shadow-2xl rounded-xl p-6 h-1/3">
            <div class="flex justify-between">
              <div class="flex flex-col gap-3">
                <h3 class="font-semibold text-3xl text-gradient">Reset Data</h3>
                <CatNapButton class="pt-5" text="Reset" type="outline" />
              </div>
              <div class="flex jusitify-between">
                <div class="flex flex-col gap-3">
                  <h3 class="font-semibold text-3xl text-gradient">Delete Account?</h3>
                  <CatNapButton class="pr-16 pt-5" text="Delete" type="outline" />
                </div>
              </div>
              <div class="flex pt-12 pr-5">
                <img src="@/assets/cat-images/cat-settings3.svg" alt="Cat_Settings3" class="h-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
