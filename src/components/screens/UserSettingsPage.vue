<script setup lang="ts">
import MunchkinBlue from '@/assets/cat-profile/munchkin-blue.svg'
import MunchkinDefault from '@/assets/cat-profile/munchkin-default.svg'
import MunchkinGreen from '@/assets/cat-profile/munchkin-green.svg'
import MunchkinLucky from '@/assets/cat-profile/munchkin-lucky.svg'
import MunchKindRed from '@/assets/cat-profile/munchkin-red.svg'
import { usePixabayStore } from '@/types/Pixabay'
import { useQuoteStore } from '@/types/Quotes'
import type { UserData } from '@/types/User'
import { useUserStore } from '@/types/User'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CatNapButton from '../CatNapButton.vue'
import CatNapInput from '../CatNapInput.vue'
import CatNapSelect from '../CatNapSelect.vue'
import CatNapSidebar from '../CatNapSidebar.vue'

const router = useRouter()

const userStore = useUserStore()
const pixabayStore = usePixabayStore()
const quoteStore = useQuoteStore()

const newThemeImage = ref('')
const newThemeQuote = ref('')
const profilePicture = ref(1)

const user = userStore.username
const userData = ref<UserData>({} as UserData)

const msg = ref('')

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')

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
    newThemeQuote.value = data.settings.themeQuote
    newThemeImage.value = data.settings.themeImage
    profilePicture.value = data.settings.profilePicture
  } catch (error) {
    console.error(error)
  }
})

const updateTheme = () => {
  pixabayStore.setNewTheme(newThemeImage.value)
  pixabayStore.confirmThemeChange()
  quoteStore.setNewTheme(newThemeQuote.value)
  quoteStore.confirmThemeChange()
  userStore.updateUserSettings(user, {
    themeQuote: newThemeQuote.value,
    themeImage: newThemeImage.value,
    profilePicture: profilePicture.value,
  })
}

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

const imageMap: Record<number, string> = {
  1: MunchkinDefault,
  2: MunchKindRed,
  3: MunchkinBlue,
  4: MunchkinLucky,
  5: MunchkinGreen,
}

const updateUser = async () => {
  if (!firstName.value || !lastName.value || !username.value || !password.value) {
    msg.value = 'Please fill out all fields'
    return
  }

  userStore.updateUser(userData.value.username, {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value,
  })

  userStore.updateUserSettings(user, {
    themeQuote: newThemeQuote.value,
    themeImage: newThemeImage.value,
    profilePicture: profilePicture.value,
  })

  userStore.username = username.value
  userStore.firstName = firstName.value
  userStore.lastName = lastName.value
  userStore.password = password.value

  firstName.value = ''
  lastName.value = ''
  username.value = ''
  password.value = ''
}

const clearWarning = () => {
  msg.value = ''
}

const logout = () => {
  userStore.firstName = ''
  userStore.lastName = ''
  userStore.username = ''
  userStore.password = ''
  router.push('/')
}

const resetData = () => {
  userStore.resetUserdata(userStore.username)
}

const deleteAccount = () => {
  userStore.deleteUser(userStore.username)
  router.push('/')
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
    <div class="w-full md:w-fit relative">
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
    <div class="w-full h-full flex flex-col md:pl-32">
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
          <img :src="imageMap[profilePicture]" alt="Cat" />
        </div>
      </div>

      <div class="flex">
        <div class="mb-5 pt-5 px-6 md:p-0">
          <h2 class="text-xl font-semibold text-[#C1A2FB]">Settings</h2>
          <h1 class="text-2xl font-bold">Something you want to change?</h1>
        </div>
      </div>

      <!-- Settings -->
      <div class="flex flex-col md:flex-row gap-8 py-8 px-6 h-full md:px-0 md:py-0">
        <!-- left side -->
        <div class="md:w-2/5 bg-gradientGrayDown shadow-2xl rounded-xl p-3">
          <h3 class="flex justify-between">
            <p class="font-semibold text-3xl text-gradient">Profile</p>
            <CatNapButton class="w-fit" text="Logout" type="outline" @click="logout" />
          </h3>

          <div class="flex flex-col gap-3 mt-4">
            <div class="flex flex-col gap-3 pb-2">
              <label for="firstName" class="w-32 font-semibold text-lg">Profile Picture</label>
              <div class="flex gap-5 items-center justify-center">
                <button
                  v-for="i in 5"
                  :key="i"
                  class="bg-secondary p-2 rounded-full"
                  @click="profilePicture = i"
                >
                  <img
                    :src="imageMap[i]"
                    alt="Cat"
                    :class="{ 'opacity-30': profilePicture !== i }"
                  />
                </button>
              </div>
            </div>
            <div class="flex">
              <div class="flex flex-col gap-2 pb-2 pr-3 w-1/2">
                <label for="firstName" class="font-semibold text-lg">First Name</label>
                <CatNapInput
                  v-model="firstName"
                  :placeholder="'First Name'"
                  :settings="true"
                  @input="clearWarning"
                />
              </div>
              <div class="flex flex-col gap-2 pb-2 pl-3 w-1/2">
                <label for="lastName" class="font-semibold text-lg">Last Name</label>
                <CatNapInput
                  v-model="lastName"
                  :placeholder="'Last Name'"
                  :settings="true"
                  @input="clearWarning"
                />
              </div>
            </div>
            <div class="flex flex-col gap-2 pb-2">
              <label for="username" class="w-24 font-semibold text-lg">Username</label>
              <CatNapInput
                v-model="username"
                :placeholder="'Username'"
                :settings="true"
                @input="clearWarning"
              />
            </div>
            <div class="flex flex-col gap-2 pb-2">
              <label for="password" class="w-24 font-semibold text-lg">Password</label>
              <CatNapInput
                v-model="password"
                type="password"
                :placeholder="'Password'"
                :settings="true"
                @input="clearWarning"
              />
            </div>
            <div v-if="msg" class="text-red-500 text-sm">
              {{ msg }}
            </div>
            <div class="w-full flex justify-center">
              <CatNapButton class="w-fit" text="Update" type="outline" @click="updateUser" />
            </div>
          </div>
        </div>

        <!-- right side -->
        <div class="flex flex-col md:w-3/5 gap-8 h-full">
          <!-- upper box -->
          <div class="bg-gradientGrayDown shadow-2xl rounded-xl p-6 h-3/4 relative">
            <img
              src="@/assets/cat-images/cat-settings1.svg"
              alt="Cat_Settings1"
              class="h-16 pl-16 absolute -top-16 right-5"
            />

            <h3 class="font-semibold text-3xl text-gradient">Themes</h3>
            <div class="flex flex-col gap-4 mt-4">
              <div>
                <label for="quote" class="block mb-2 font-semibold text-lg">Quote</label>
                <CatNapSelect
                  v-model="newThemeQuote"
                  :options="[
                    'Art',
                    'Beauty',
                    'Change',
                    'Communication',
                    'Cool',
                    'Courage',
                    'Dreams',
                    'Faith',
                    'Family',
                    'Freedom',
                    'Friendship',
                    'Funny',
                    'Future',
                    'Good',
                    'Graduation',
                    'Great',
                    'Happiness',
                    'Health',
                    'History',
                    'Home',
                    'Hope',
                    'Humor',
                    'Imagination',
                    'Inspirational',
                    'Intelligence',
                    'Life',
                    'Love',
                    'Movies',
                    'Success',
                  ]"
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
              <div class="w-full flex justify-center">
                <CatNapButton class="w-fit" text="Update" type="outline" v-on:click="updateTheme" />
              </div>
              <div class="absolute bottom-5 left-5">
                <img
                  src="@/assets/cat-images/cat-settings2.svg"
                  alt="Cat_Settings2"
                  class="h-20 -mb-5"
                />
              </div>
            </div>
          </div>

          <!-- lower box -->
          <div class="bg-gradientGrayDown shadow-2xl rounded-xl p-4 md:h-1/4 relative">
            <div class="flex flex-col md:flex-row md:justify-between justify-center items-center">
              <div class="flex flex-col gap-3">
                <h3 class="font-semibold text-lg lg:text-3xl text-gradient">Reset Data</h3>
                <CatNapButton class="" text="Reset" type="outline" @click="resetData" />
              </div>
              <div class="flex jusitify-between pt-4 md:pt-0">
                <div class="flex flex-col gap-3">
                  <h3 class="font-semibold text-lg lg:text-3xl text-gradient">Delete Account?</h3>
                  <CatNapButton
                    class="md:pr-16"
                    text="Delete"
                    type="outline"
                    @click="deleteAccount"
                  />
                </div>
              </div>
              <div class="flex pt-4 md:pt-12 md:pr-5">
                <img
                  src="@/assets/cat-images/cat-settings3.svg"
                  alt="Cat_Settings3"
                  class="h-16 md:absolute bottom-0 right-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
