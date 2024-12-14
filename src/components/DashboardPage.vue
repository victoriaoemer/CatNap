<script setup lang="ts">
import { getUserData } from '@/api';
import type { UserData } from '@/types/User';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = router.currentRoute.value.params.username.toString();

const userData = ref<UserData>({} as UserData);

const date = new Date();
const formattedDate = date.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

onMounted(async () => {
  try {
    const data = await getUserData(user);
    userData.value = data;
  } catch (error) {
    console.error(error);
  }
});
</script>


<template>
  <div class="h-screen w-full flex p-8">
    <aside class="w-24 bg-white rounded-lg p-5 flex flex-col">
      <div v-if="userData">
        <p> {{ userData.username }}</p>
      </div>
    </aside>

    <div class="w-full flex flex-col pl-24">
      <div class="flex justify-end space-x-5 ">
        <div class="text-lg py-1 px-3 rounded-lg border border-secondary">
          {{ formattedDate }}
        </div>
        <div class="bg-secondary p-2 rounded-full">
          <img src="@/assets/icons/profile-cat.svg" alt="Cat" />
        </div>
      </div>

      <div class="mb-5">
        <h2 class="text-xl font-semibold">Dream Diary</h2>
        <h1 class="text-2xl font-bold">What was your dream about?</h1>
      </div>

      <div class="flex flex-grow gap-8">
        <div class="w-1/3 bg-blue-500 rounded-lg p-3 overflow-auto">
          <p class="mb-3 font-medium">The Exam under water with sealions</p>
          <p class="text-sm">12.12.2024</p>
        </div>

        <div class="w-2/3 bg-blue-200 rounded-lg p-3 flex flex-col">
          <input type="text" placeholder="Title" class="w-full mb-3 p-2 border border-gray-400 rounded" />
          <textarea placeholder="Text" class="w-full flex-grow p-2 border border-gray-400 rounded"></textarea>
          <button class="bg-blue-600 text-white mt-3 py-2 rounded hover:bg-blue-700">
            Add Entry
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
