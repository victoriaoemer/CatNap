<template>
  <aside
    class="w-24 bg-gradientGrayDown shadow-2xl rounded-xl p-5 flex flex-col justify-between"
    :class="{ 'absolute h-screen top-0 left-0 rounded-l-none': mobile }"
  >
    <div class="flex flex-col items-center gap-3">
      <div v-if="mobile" @click="closeSidebar">
        <img src="@/assets/icons/menu-close.svg" alt="Close" class="w-max h-8" />
      </div>
      <img v-else src="@/assets/icons/cat-logo.svg" alt="Cat" class="w-max pb-5" />
      <RouterLink
        :to="'/dashboard/' + user"
        active-class="bg-gradient"
        class="relative p-2 border border-secondary rounded-xl w-full flex items-center justify-center hover:bg-gradient"
      >
        <img src="@/assets/icons/home.svg" alt="Home" class="w-full h-full object-contain" />
      </RouterLink>
      <RouterLink
        :to="'/add-entry/' + user"
        active-class="bg-gradient"
        class="relative p-2 border border-secondary rounded-xl w-full flex items-center justify-center hover:bg-gradient"
      >
        <img src="@/assets/icons/add-book.svg" alt="Add" class="w-full h-full object-contain" />
      </RouterLink>
    </div>
    <div class="flex flex-col items-center gap-3">
      <RouterLink
        :to="'/settings/' + user"
        active-class="bg-gradient"
        class="relative p-2 border border-secondary rounded-xl w-full flex items-center justify-center hover:bg-gradient"
      >
        <img
          src="@/assets/icons/settings.svg"
          alt="Settings"
          class="w-full h-full object-contain"
        />
      </RouterLink>
      <button
        @click="logout"
        class="relative p-2 border border-secondary rounded-xl w-full flex items-center justify-center hover:bg-gradient"
      >
        <img src="@/assets/icons/logout.svg" alt="Logout" class="w-full h-full object-contain" />
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useUserStore } from '@/types/User'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

defineProps({
  user: String,
  mobile: Boolean,
})

const emit = defineEmits(['close'])

const closeSidebar = () => {
  emit('close')
}
const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>
