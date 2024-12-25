<template>
  <aside class="w-24 bg-gradientGrayDown shadow-2xl rounded-xl p-5 flex flex-col justify-between">
    <div>
      <img src="@/assets/icons/cat-logo.svg" alt="Cat" class="w-max pb-5" />
      <RouterLink
        :to="'/dashboard/' + user"
        active-class="bg-gradient"
        class="relative p-2 border border-secondary rounded-xl w-full flex items-center justify-center mb-3"
      >
        <img src="@/assets/icons/home.svg" alt="Home" class="w-full h-full object-contain" />
      </RouterLink>
      <RouterLink
        :to="'/add-entry/' + user"
        active-class="bg-gradient"
        class="relative p-2 border border-secondary rounded-xl w-full flex items-center justify-center"
      >
        <img src="@/assets/icons/add.svg" alt="Add" class="w-full h-full object-contain" />
      </RouterLink>
    </div>
    <RouterLink
      :to="'/settings/' + user"
      active-class="bg-gradient"
      class="relative p-2 border border-secondary rounded-xl w-full flex items-center justify-center"
    >
      <img src="@/assets/icons/settings.svg" alt="Settings" class="w-full h-full object-contain" />
    </RouterLink>
  </aside>
</template>

<script setup lang="ts">
defineProps({
  user: String,
})
</script>
