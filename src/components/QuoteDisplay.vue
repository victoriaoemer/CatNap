<template>
  <div>
    <p class="font-medium" v-if="quote">"{{ quote }}"</p>
    <div class="flex justify-start items-center">
      <p class="text-[#37A2ED] font-semibold" v-if="author">- {{ author }}</p>
      <img src="@/assets/cat-images/cat-home2.svg" alt="Cat" class="h-16 ml-44" />
    </div>
  </div>
  <div>
    <div v-if="image">
      <img :src="image" alt="Pixabay Image" class="rounded-xl border-2 border-[#3DD8CB]" />
    </div>
    <p v-else>No image available.</p>
  </div>
</template>

<script lang="ts">
import { useQuoteStore } from '../types/Quotes'
import { usePixabayStore } from '../types/Pixabay'

export default {
  setup() {
    const quoteStore = useQuoteStore()
    const pixabayStore = usePixabayStore()
    return {
      quote: quoteStore.quote,
      author: quoteStore.author,
      image: pixabayStore.image,
    }
  },
}
</script>
