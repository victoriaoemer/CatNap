<template>
  <div class="flex flex-col justify-between">
    <div class="pb-12 md:pb-3 h-full">
      <p class="mb-3 font-bold lg:text-3xl md:text-2xl text-gradient-blue w-fit">Today's Quote</p>

      <p class="font-medium md-text-xl" v-if="quote">"{{ quote }}"</p>
      <div class="flex justify-start items-center">
        <p class="text-emotion-green font-semibold pt-2" v-if="author">- {{ author }}</p>
      </div>
    </div>
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
import { useQuoteStore } from '../types/Quotes'

const quoteStore = useQuoteStore()
const pixabayStore = usePixabayStore()

const author = quoteStore.author
const quote = quoteStore.quote
const image = pixabayStore.image
</script>
