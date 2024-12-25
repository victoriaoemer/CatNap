<template>
  <div>
    <p v-if="quote">"{{ quote }}"</p>
    <p v-if="author">- {{ author }}</p>
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
