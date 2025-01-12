<template>
  <div class="flex flex-col justify-between">
    <div class="pb-12 md:pb-3 h-full">
      <p class="mb-3 font-bold text-3xl text-gradient-blue w-fit">Today's Picture</p>
      </div>
    </div>
  <div v-if="image" class="relative lg:top-10">
  <img
    src="@/assets/cat-images/cat-home2.svg"
    alt="Cat"
    class="h-16 absolute -top-16 right-0"
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
