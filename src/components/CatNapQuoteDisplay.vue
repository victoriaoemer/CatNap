<template>
  <div class="flex flex-col justify-between">
    <div class="pb-12 md:pb-3 h-full">
      <p class="mb-3 font-bold lg:text-3xl md:text-2xl text-gradient-blue w-fit">Today's Picture</p>
      </div>
    </div>
    <div v-if="image" class="relative top-14">
  <img
    src="@/assets/cat-images/cat-home2.svg"
    alt="Cat"
    class="h-20 absolute -top-20 right-0"
  />
  <div class="flex justify-center">
    <img
      :src="image"
      alt="Pixabay Image"
      class="rounded-xl border-2 border-emotion-green w-full"
    />
  </div>
</div>
    <p v-else>No image available.</p>
</template>

<script setup lang="ts">
import { usePixabayStore } from '../types/Pixabay'
const pixabayStore = usePixabayStore()
const image = pixabayStore.image
</script>
