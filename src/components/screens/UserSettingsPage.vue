<script setup lang="ts">
import MunchkinBlue from '@/assets/cat-profile/munchkin-blue.svg'
import MunchkinDefault from '@/assets/cat-profile/munchkin-default.svg'
import MunchkinGreen from '@/assets/cat-profile/munchkin-green.svg'
import MunchkinLucky from '@/assets/cat-profile/munchkin-lucky.svg'
import MunchkinRed from '@/assets/cat-profile/munchkin-red.svg'
import { usePixabayStore } from '@/types/Pixabay'
import type { User, UserData } from '@/types/User'
import { useUserStore } from '@/types/User'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CatNapButton from '../CatNapButton.vue'
import CatNapInput from '../CatNapInput.vue'
import CatNapOverlay from '../CatNapOverlay.vue'
import CatNapSelect from '../CatNapSelect.vue'
import CatNapSidebar from '../CatNapSidebar.vue'
import CatNapTimestamp from '../CatNapTimestamp.vue'

const router = useRouter()

const userStore = useUserStore()
const pixabayStore = usePixabayStore()

const newThemeImage = ref('')
const profilePicture = ref(1)

const user = userStore.username
const userData = ref<UserData>({} as UserData)

const userLoginData = ref<User>({} as User)

const msg = ref('')

const isSidebarOpen = ref(false)

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')

const imageMap: Record<number, string> = {
  1: MunchkinDefault,
  2: MunchkinRed,
  3: MunchkinBlue,
  4: MunchkinLucky,
  5: MunchkinGreen,
}

// confirmation overlay
const overlayVisible = ref(false)
const overlayContent = ref('Title')
const overlayTitle = ref('hi')
const overlayButtons = ref([{ text: '', action: () => {} }])

onMounted(async () => {
  try {
    const data = await userStore.getUserData(user)
    const loginData = await userStore
      .getUsers()
      .then((users) => users.find((u: User) => u.username === user))
    userLoginData.value = loginData
    userData.value = data
    newThemeImage.value = pixabayStore.getUserTheme(user)
    profilePicture.value = data.settings.profilePicture
    firstName.value = loginData.firstName
    lastName.value = loginData.lastName
    username.value = loginData.username
    password.value = loginData.password

    // synchronisation with the stores
    watch(
      () => userStore.settings,
      (newSettings) => {
        newThemeImage.value = pixabayStore.getUserTheme(user)
        profilePicture.value = newSettings?.profilePicture || 1
      },
      { immediate: true },
    )
  } catch (error) {
    console.error(error)
  }
})

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

function showOverlay(
  title: string,
  content: string,
  buttons?: { text: string; action: () => void }[],
) {
  overlayVisible.value = true
  overlayContent.value = content
  overlayTitle.value = title
  overlayButtons.value = buttons || [
    { text: 'No', action: closeOverlay },
    { text: 'Yes', action: closeOverlay },
  ]
}

function closeOverlay() {
  overlayVisible.value = false
  overlayContent.value = ''
  overlayTitle.value = ''
  overlayButtons.value = []
}

async function confirmUpdateUser() {
  const users = await userStore.getUsers()
  const user = users.find((user: User) => user.username === username.value.trim())

  if (!firstName.value || !lastName.value || !username.value || !password.value) {
    msg.value = 'Please fill out all fields'
    return
  }

  if (user) {
    msg.value = 'Username already exists'
    return
  }

  showOverlay('Update User?', 'Are you sure you want to update your user?', [
    { text: 'Cancel', action: closeOverlay },
    { text: 'Update', action: updateUser },
  ])
}

function confirmResetData() {
  showOverlay('Reset Data?', 'Are you sure you want to reset all dream entries?', [
    { text: 'Cancel', action: closeOverlay },
    { text: 'Reset', action: resetData },
  ])
}

function confirmDeleteAccount() {
  showOverlay('Delete Account?', 'Are you sure you want to permanently delete your account?', [
    { text: 'Cancel', action: closeOverlay },
    { text: 'Delete', action: deleteAccount },
  ])
}

function confimUpdateTheme() {
  showOverlay('Update Theme?', 'Are you sure you want to update your theme?', [
    { text: 'Cancel', action: closeOverlay },
    { text: 'Update', action: updateTheme },
  ])
}

const updateTheme = () => {
  updateThemeAndSyncStores()
  overlayVisible.value = false
}

const updateThemeAndSyncStores = async () => {
  try {
    pixabayStore.setNewTheme(user, newThemeImage.value)
    await userStore.updateUserSettings(user, {
      themeImage: newThemeImage.value,
      profilePicture: profilePicture.value,
    })
  } catch (error) {
    console.error('Error syncing theme across stores:', error)
  }
}

const updateUser = async () => {
  userStore.updateUser(userData.value.username, {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    username: username.value.trim(),
    password: password.value,
  })

  userStore.updateUserSettings(user, {
    themeImage: newThemeImage.value,
    profilePicture: profilePicture.value,
  })

  userStore.username = username.value.trim()
  userStore.firstName = firstName.value.trim()
  userStore.lastName = lastName.value.trim()
  userStore.password = password.value

  overlayVisible.value = false
}

const clearWarning = () => {
  msg.value = ''
}

const resetData = () => {
  userStore.resetUserdata(userStore.username)
  overlayVisible.value = false
}

const deleteAccount = () => {
  userStore.deleteUser(userStore.username)
  overlayVisible.value = false
  router.push('/')
}
</script>

<template>
  <CatNapOverlay
    :content="overlayContent"
    :title="overlayTitle"
    :buttons="overlayButtons"
    :overlay-visible="overlayVisible"
  />

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
        <CatNapTimestamp />
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
          </h3>

          <div class="flex flex-col gap-3 mt-4">
            <div class="flex flex-col gap-3 pb-2">
              <p class="w-32 font-semibold text-lg">Profile Picture</p>
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
                  id="firstName"
                  v-model="firstName"
                  :placeholder="'First Name'"
                  :settings="true"
                  @input="clearWarning"
                />
              </div>
              <div class="flex flex-col gap-2 pb-2 pl-3 w-1/2">
                <label for="lastName" class="font-semibold text-lg">Last Name</label>
                <CatNapInput
                  id="lastName"
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
                id="username"
                v-model="username"
                :placeholder="'Username'"
                :settings="true"
                @input="clearWarning"
              />
            </div>
            <div class="flex flex-col gap-2 pb-2">
              <label for="password" class="w-24 font-semibold text-lg">Password</label>
              <CatNapInput
                id="password"
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
              <CatNapButton class="w-fit" text="Update" type="outline" @click="confirmUpdateUser" />
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
                <label for="image" class="block mb-2 font-semibold text-lg">Image</label>
                <CatNapSelect
                  id="image"
                  v-model="newThemeImage"
                  :options="[
                    'Dreams',
                    'Clouds',
                    'Stars',
                    'Moonlight',
                    'Galaxy',
                    'Fantasy',
                    'Mystical',
                    'Surreal',
                    'Journey',
                    'Illusion',
                    'Nightfall',
                    'Sunset',
                    'Sunrise',
                    'Horizon',
                    'Twilight',
                  ]"
                  :placeholder="'Select a Theme'"
                  @change="pixabayStore.getUserTheme(user)"
                  :settings="true"
                />
              </div>
              <div class="w-full flex justify-center">
                <CatNapButton
                  class="w-fit"
                  text="Update"
                  type="outline"
                  v-on:click="confimUpdateTheme"
                />
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
                <CatNapButton class="" text="Reset" type="outline" @click="confirmResetData" />
              </div>
              <div class="flex jusitify-between pt-4 md:pt-0">
                <div class="flex flex-col gap-3">
                  <h3 class="font-semibold text-lg lg:text-3xl text-gradient">Delete Account?</h3>
                  <CatNapButton
                    class="md:pr-16"
                    text="Delete"
                    type="outline"
                    @click="confirmDeleteAccount"
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
