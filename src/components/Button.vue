<script setup lang="ts" name="Button">
defineProps({
  text: String,
});

</script>

<template>
  <button class="px-5 py-2  gradient-border">{{ text }}</button>
</template>
