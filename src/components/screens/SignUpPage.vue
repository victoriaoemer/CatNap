<script setup lang="ts">
import { useUserStore, type User } from '@/types/User.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CatNapButton from '../CatNapButton.vue'
import CatNapInput from '../CatNapInput.vue'

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const msg = ref('')

const router = useRouter()
const userStore = useUserStore()

const redirectLogin = () => {
  router.push('/')
}

const signUp = async () => {
  // check if fields are empty
  if (!username.value || !password.value || !firstName.value || !lastName.value) {
    msg.value = 'Please fill out all fields'
    return
  }

  msg.value = ''

  try {
    const users = await userStore.getUsers()

    // check if username already exists
    const user = users.find((user: User) => user.username === username.value.trim())

    if (user) {
      msg.value = 'Username already exists'
      return
    }

    userStore.createUser({
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      username: username.value.trim(),
      password: password.value,
    })

    userStore.createUserData({
      username: username.value.trim(),
      settings: {
        themeImage: 'moons',
        profilePicture: 1,
      },
    })

    userStore.username = username.value.trim()
    userStore.firstName = firstName.value.trim()
    userStore.lastName = lastName.value.trim()
    userStore.password = password.value

    firstName.value = ''
    lastName.value = ''
    username.value = ''
    password.value = ''

    router.push('/')
  } catch (error) {
    // display this message as a pop up if there is an error: Database unreachable - please check the .env file and run "npm run dev" locally!
    window.alert('Database unreachable - please check the .env file and run "npm run dev" locally!')
    console.error('Fehler beim Abrufen der Benutzer:', error)
  }
}

const clearWarning = () => {
  msg.value = ''
}
</script>

<template>
  <div class="h-screen items-center justify-center flex">
    <div class="grid md:grid-cols-2 gap-20">
      <div class="flex items-center">
        <div>
          <h1>Time for a</h1>
          <h2 class="text-gradient text-3xl font-bold">CatNap</h2>
        </div>
        <img src="@/assets/icons/cat-logo.svg" alt="Cat" class="h-48" />
      </div>

      <div class="flex flex-col items-center justify-center space-y-10">
        <CatNapInput
          id="firstname"
          v-model="firstName"
          type="text"
          placeholder="First Name"
          @input="clearWarning"
        />
        <CatNapInput
          id="lastname"
          v-model="lastName"
          type="text"
          placeholder="Last Name"
          @input="clearWarning"
        />
        <CatNapInput
          id="username"
          v-model="username"
          type="text"
          placeholder="Username"
          @input="clearWarning"
        />
        <CatNapInput
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          @input="clearWarning"
        />

        <div v-if="msg" class="text-red-500 text-sm">
          {{ msg }}
        </div>

        <div class="w-full flex gap-5">
          <CatNapButton text="Sign Up" type="filled" @click="signUp" class="w-1/2" />
          <CatNapButton text="Login" type="outline" @click="redirectLogin" class="w-1/2" />
        </div>
      </div>
    </div>
  </div>
</template>
