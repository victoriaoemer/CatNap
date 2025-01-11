<template>
  <div
    v-if="overlayVisible"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-secondary"
  >
    <div class="bg-light p-6 rounded-lg shadow-lg w-4/5 md:w-1/3 space-y-4">
      <p class="text-lg font-bold text-gradient">{{ title }}</p>
      <p>{{ content }}</p>
      <div class="flex gap-5 pt-2">
        <div v-for="(button, index) in buttons" :key="index" class="w-full">
          <CatNapButton
            :text="button.text"
            :type="index == 0 ? 'outline' : 'filled'"
            @click="button.action"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CatNapButton from './CatNapButton.vue'

interface Button {
  text: string
  action: () => void
}

defineProps<{
  overlayVisible: boolean
  title: string
  content: string
  buttons: Button[]
}>()
</script>
