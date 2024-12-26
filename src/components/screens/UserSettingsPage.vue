<script setup lang="ts">
import { useRouter } from 'vue-router'
import CatNapSidebar from '../CatNapSidebar.vue'
import CatNapButton from '../CatNapButton.vue'
import type { UserData } from '@/types/User'
import { onMounted, ref } from 'vue'
import { getUserData } from '@/api'
import CatNapInput from '../CatNapInput.vue'

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

      <div class=" flex">
        <div mb-5 >
        <h2 class="text-xl font-semibold text-[#C1A2FB]">Settings</h2>
        <h1 class="text-2xl font-bold">Something you want to change?</h1>
      </div>
      <img src="@/assets/cat-images/cat-settings1.svg" alt="Cat_Settings1" class="h-16 pl-16" />
      </div>


      <!-- Settings -->
      <div class="flex flex-grow gap-8">
        <!-- Linke Spalte -->
        <div class="w-1/3 bg-gradientGrayDown shadow-2xl rounded-xl p-3 overflow-auto">
          <h3 class="font-semibold text-3xl text-gradient">Profile</h3>
          <div class="flex flex-col gap-4 mt-4">
            <div class="flex flex-col gap-3">
              <label for="firstName" class="w-24">First Name</label>
              <CatNapInput v-model="userData.username" :placeholder="'firstName'" :settings="true"  />
            </div>
            <div class="flex flex-col  gap-3">
              <label for="lastName" class="w-24">Last Name</label>
              <CatNapInput v-model="userData.username" :placeholder="'lastName'" :settings="true"  />
            </div>
            <div class="flex flex-col  gap-3">
              <label for="username" class="w-24">Username</label>
              <CatNapInput v-model="userData.username" :placeholder="userData.username" :settings="true"  />
            </div>
            <div class="flex flex-col  gap-3">
              <label for="password" class="w-24">Password</label>
              <CatNapInput v-model="userData.username" type="password" :placeholder="'current Password'" @input="'clearWarning'" :settings="true"  />
            </div>
            <CatNapButton class="pl-24 pr-24" text="Update" type="outline" />
          </div>
        </div>

        <!-- Rechte Spalte -->
        <div class="flex flex-col w-2/3 gap-8">
          <!-- Obere Box -->
          <div class="bg-gradientGrayDown shadow-2xl rounded-xl p-6 h-2/3">
            <h3 class="font-semibold text-3xl text-gradient">Themes</h3>
            <div class="flex flex-col gap-4 mt-4">
              <div>
                <label for="quote" class="block mb-2">Quote</label>
                <select id="quote" class="input-field">
                  <option value="inspirational">Inspirational</option>
                  <option value="moons">Moons</option>
                </select>
              </div>
              <div>
                <label for="image" class="block mb-2">Image</label>
                <input id="image" type="text" class="input-field" placeholder="Default: moons" />
              </div>
              <CatNapButton class="pl-64 pr-64" text="Update" type="outline" />
              <div class="flex justify-start">
                <img src="@/assets/cat-images/cat-settings2.svg" alt="Cat_Settings2" class="h-28" />
              </div>
            </div>
          </div>

          <!-- Untere Box -->
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
              <div class="flex pt-16">
                    <img src="@/assets/cat-images/cat-settings3.svg" alt="Cat_Settings3" class="h-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
