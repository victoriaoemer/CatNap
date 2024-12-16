<template>
  <div class="h-screen w-full flex p-8">
    <CatNapSidebar :user="user" />
    <div class="w-full flex flex-col pl-24"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import CatNapSidebar from '../CatNapSidebar.vue';

const router = useRouter();

const user = router.currentRoute.value.params.username.toString();

</script>
