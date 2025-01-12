<script setup lang="ts">
import { useUserStore, type User } from '@/types/User.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CatNapButton from '../CatNapButton.vue'
import CatNapInput from '../CatNapInput.vue'

const username = ref('')
const password = ref('')
const msg = ref('')

const router = useRouter()

const redirectSignUp = () => {
  router.push('/signup')
}

const login = async () => {
  // check if fields are empty
  if (!username.value || !password.value) {
    msg.value = 'Please enter a username and password'
    return
  }

  try {
    const userStore = useUserStore()

    const users = await userStore.getUsers()
    // find user in users
    const user = users.find((user: User) => user.username === username.value)

    if (user) {
      if (password.value === user.password) {
        userStore.login(user)
        router.push('/dashboard/' + user.username)
      } else {
        msg.value = 'Password is incorrect'
      }
    } else {
      msg.value = 'Username does not exist'
    }
  } catch (error) {
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
          <CatNapButton text="Login" type="filled" @click="login" class="w-1/2" />
          <CatNapButton text="Sign Up" type="outline" @click="redirectSignUp" class="w-1/2" />
        </div>
      </div>
    </div>
  </div>
</template>
