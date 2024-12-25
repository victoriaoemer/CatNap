<template>
  <div>
    <p class="font-medium mb-2" v-if="quote">"{{ quote }}"</p>
    <p class="text-[#37A2ED] font-medium" v-if="author">- {{ author }}</p>
  </div>
</template>

<script lang="ts">
import { useQuoteStore } from '../types/Quotes';


export default {
  setup() {
    const quoteStore = useQuoteStore();
    return {
      quote: quoteStore.quote,
      author: quoteStore.author,
    };
  },
};
</script>
