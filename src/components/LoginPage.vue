<script setup lang="ts">
import { getUsers } from '@/api';
import type { User } from '@/types/User.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CatNapButton from './elements/CatNapButton.vue';
import CatNapInput from './elements/CatNapInput.vue';

const username = ref('');
const password = ref('');
const emptyValues = ref(false);
const invalidUser = ref(false);

const router = useRouter();

const redirectSignUp = () => {
  router.push('/signup');
};

const login = async () => {
  // check if fields are empty
  if (!username.value || !password.value) {
    emptyValues.value = true;
    return;
  }

  emptyValues.value = false;
  invalidUser.value = false;

  try {
    const users = await getUsers();
    // find user in users
    const user = users.find((user: User) => user.username === username.value);

    if (user) {
      if (password.value === user.password) {
        router.push('/dashboard/' + user.username);
      } else {
        console.error('Falsches Passwort für Benutzer:', username.value);
      }
    } else {
      invalidUser.value = true;
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
  }
};

const clearWarning = () => {
  emptyValues.value = false;
  invalidUser.value = false;
};
</script>


<template>
  <div class="grid md:grid-cols-2 gap-20">
    <div class="flex items-center ">
      <div>
        <h1>Time for a</h1>
        <h2 class="text-gradient text-3xl font-bold">CatNap</h2>
      </div>
      <img src="@/assets/icons/cat-logo.svg" alt="Cat" class=" h-48" />
    </div>

    <div class="flex flex-col items-center justify-center space-y-10 ">
      <CatNapInput v-model="username" type="text" placeholder="Username" @input="clearWarning" />
      <CatNapInput v-model="password" type="password" placeholder="Password" @input="clearWarning" />

      <div v-if="emptyValues" class="text-red-500 text-sm">
        Please enter a username and password
      </div>
      <div v-if="invalidUser" class="text-red-500 text-sm">
        Username does not exist
      </div>

      <div class="w-full flex gap-5">
        <CatNapButton text="Login" type="filled" @click="login" class="w-1/2" />
        <CatNapButton text="Sign Up" type="outline" @click="redirectSignUp" class="w-1/2" />
      </div>
    </div>
  </div>
</template>
