<template>
  <div class="flex flex-col justify-between">
    <div class="pb-12 md:pb-3 h-full">
      <p class="mb-3 font-bold text-3xl text-gradient-blue w-fit">Inspiration</p>
    </div>
  </div>
  <div v-if="image" class="relative lg:top-2">
    <img src="@/assets/cat-images/cat-home2.svg" alt="Cat" class="h-16 absolute -top-16 right-0" />
    <div class="flex justify-center">
      <img
        :src="image"
        alt="Pixabay Image"
        class="rounded-xl border-2 border-emotion-green w-full"
      />
    </div>
  </div>
  <div v-else class="flex justify-center">
    <img src="@/assets/cat-images/cat-home2.svg" alt="Cat" class="h-16 absolute -top-16 right-0" />
    <div class="flex justify-center">
      <img
        src="@/assets/images/placeholder.jpg"
        alt="Pixabay Image Placeholder"
        class="rounded-xl border-2 border-emotion-green w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/types/User'
import { usePixabayStore } from '../types/Pixabay'
import { onMounted, ref } from 'vue'
const pixabayStore = usePixabayStore()
const userStore = useUserStore()
const user = userStore.username

const image = ref('')

onMounted(async () => {
  if (image.value == null) {
    await pixabayStore.fetchImage(true, user)
    image.value = pixabayStore.getUserImage(user)
  } else {
    image.value = pixabayStore.getUserImage(user)
  }
})
</script>
