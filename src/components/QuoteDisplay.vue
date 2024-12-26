<template>
  <div class="flex flex-col h-full justify-between">
    <div class="pb-5">
      <p class="mb-3 font-bold text-3xl text-gradient-blue w-fit">Today's Quote</p>

      <p class="font-medium" v-if="quote">"{{ quote }}"</p>
      <div class="flex justify-start items-center">
        <p class="text-emotion-green font-semibold pt-2" v-if="author">- {{ author }}</p>
      </div>
    </div>
    <div>
      <div v-if="image" class="h-full relative">
        <img
          src="@/assets/cat-images/cat-home2.svg"
          alt="Cat"
          class="h-16 absolute -top-16 right-0 pt-4"
        />

        <img
          :src="image"
          alt="Pixabay Image"
          class="rounded-xl border-2 border-emotion-green object-cover min-w-full lg:h-48"
        />
      </div>
      <p v-else>No image available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePixabayStore } from '../types/Pixabay'
import { useQuoteStore } from '../types/Quotes'

const quoteStore = useQuoteStore()
const pixabayStore = usePixabayStore()

const author = quoteStore.author
const quote = quoteStore.quote
const image = pixabayStore.image
</script>
