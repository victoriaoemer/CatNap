<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';

const username = ref('');
const password = ref('');

const login = () => {
  console.log
    ('Username:', username.value);
  console.log
    ('Password:', password.value);
}
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
      <input class="w-full bg-transparent border-b focus:outline-none" type="text" v-model="username"
        placeholder="Username">
      <input class="w-full bg-transparent border-b focus:outline-none" type=" password" v-model="password"
        placeholder="Password">
      <div class="w-full flex gap-5">
        <Button text="Login" @click="login" class="w-1/2" />
        <Button text="Sign Up" @click="login" class="w-1/2" />
      </div>
    </div>
  </div>
</template>
