<template>
  <div class="flex flex-col justify-between">
    <div v-if="image" class="relative">
      <img
        src="@/assets/cat-images/cat-home2.svg"
        alt="Cat"
        class="h-16 absolute -top-16 right-0 pt-5"
      />
      <div class="flex justify-center">
        <img
          :src="image"
          alt="Pixabay Image"
          class="rounded-xl border-2 border-emotion-green object-cover w-full h-36 "
        />
      </div>
    </div>
    <p v-else>No image available.</p>
  </div>
</template>

<script setup lang="ts">
import { usePixabayStore } from '../types/Pixabay'
const pixabayStore = usePixabayStore()
const image = pixabayStore.image
</script>
