<template>
  <div class="h-screen w-full flex p-8">
    <CatNapSidebar :user="user" />
    <div class="w-full flex flex-col pl-24"></div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/types/User'
import CatNapSidebar from '../CatNapSidebar.vue'

const userStore = useUserStore()
const user = userStore.username
</script>
