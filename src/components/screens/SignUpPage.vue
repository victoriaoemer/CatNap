<script setup lang="ts">
import { createUser, createUserData, getUsers } from '@/api'
import type { User } from '@/types/User.js'
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
    const users = await getUsers()

    // check if username already exists
    const user = users.find((user: User) => user.username === username.value)

    if (user) {
      msg.value = 'Username already exists'
      return
    }

    createUser({
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
    })

    createUserData({
      username: username.value,
      data: [],
    })

    firstName.value = ''
    lastName.value = ''
    username.value = ''
    password.value = ''

    router.push('/')
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error)
  }
}

const clearWarning = () => {
  msg.value = ''
}
</script>

<template>
  <div class="grid md:grid-cols-2 gap-20">
    <div class="flex items-center">
      <div>
        <h1>Time for a</h1>
        <h2 class="text-gradient text-3xl font-bold">CatNap</h2>
      </div>
      <img src="@/assets/icons/cat-logo.svg" alt="Cat" class="h-48" />
    </div>

    <div class="flex flex-col items-center justify-center space-y-10">
      <CatNapInput v-model="firstName" type="text" placeholder="First Name" @input="clearWarning" />
      <CatNapInput v-model="lastName" type="text" placeholder="Last Name" @input="clearWarning" />
      <CatNapInput v-model="username" type="text" placeholder="Username" @input="clearWarning" />
      <CatNapInput
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
</template>
