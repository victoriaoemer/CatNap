<script setup lang="ts">
import type { User } from '@/types/User.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUser, getUsers } from '../api/index';
import CatNapButton from './elements/CatNapButton.vue';
import CatNapInput from './elements/CatNapInput.vue';

const firstName = ref('');
const lastName = ref('');
const username = ref('');
const password = ref('');
const emptyValues = ref(false);
const invalidUser = ref(false);

const router = useRouter();

const redirectLogin = () => {
  router.push('/');
};

const signUp = async () => {
  // check if fields are empty
  if (!username.value || !password.value || !firstName.value || !lastName.value) {
    emptyValues.value = true;
    return;
  }

  emptyValues.value = false;
  invalidUser.value = false;

  try {
    const users = await getUsers();

    // check if username already exists
    const user = users.find((user: User) => user.username === username.value);

    if (user) {
      invalidUser.value = true;
      return;
    }

    // create new user
    createUser({
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
    });

    firstName.value = '';
    lastName.value = '';
    username.value = '';
    password.value = '';

    router.push('/');

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
  <div class="grid grid-cols-2 gap-20">
    <div class="flex items-center ">
      <div>
        <h1>Time for a</h1>
        <h2 class="text-gradient text-3xl font-bold">CatNap</h2>
      </div>
      <img src="@/assets/icons/cat-logo.svg" alt="Cat" class=" h-48" />
    </div>

    <div class="flex flex-col items-center justify-center space-y-10 ">
      <CatNapInput v-model="firstName" type="text" placeholder="First Name" @input="clearWarning" />
      <CatNapInput v-model="lastName" type="text" placeholder="Last Name" @input="clearWarning" />
      <CatNapInput v-model="username" type="text" placeholder="Username" @input="clearWarning" />
      <CatNapInput v-model="password" type="password" placeholder="Password" @input="clearWarning" />

      <div v-if="emptyValues" class="text-red-500 text-sm">
        There are empty fields
      </div>
      <div v-if="invalidUser" class="text-red-500 text-sm">
        Username already exists
      </div>

      <div class="w-full flex gap-5">
        <CatNapButton text="Sign Up" type="filled" @click="signUp" class="w-1/2" />
        <CatNapButton text="Login" type="outline" @click="redirectLogin" class="w-1/2" />
      </div>
    </div>
  </div>
</template>
