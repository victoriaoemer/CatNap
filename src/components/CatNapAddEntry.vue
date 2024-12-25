<template>
  <div class="flex gap-4 pb-5 h-1/5">
    <input
      v-model="title"
      type="text"
      placeholder="Enter Title"
      class="bg-secondary border border-purple rounded-xl p-2 text-xl w-2/3"
      @input="clearWarning"
    />
    <div
      class="flex gap-1 bg-secondary border border-purple rounded-xl p-2 w-1/3 items-center justify-center"
    >
      <button
        class="h-6 w-6 p-1 rounded-md bg-emotion-red"
        :class="{ 'opacity-50': emotion !== 1 && emotion !== 0 }"
      >
        <img @click="selectEmotion(1)" src="@/assets/cat-emotes/cat-emote-sad.svg" alt="Cat" />
      </button>
      <button
        class="h-6 w-6 p-1 rounded-md bg-emotion-orange"
        :class="{ 'opacity-50': emotion !== 2 && emotion !== 0 }"
      >
        <img @click="selectEmotion(2)" src="@/assets/cat-emotes/cat-emote-meh.svg" alt="Cat" />
      </button>
      <button
        class="h-6 w-6 p-1 rounded-md bg-emotion-green"
        :class="{ 'opacity-50': emotion !== 3 && emotion !== 0 }"
      >
        <img @click="selectEmotion(3)" src="@/assets/cat-emotes/cat-emote-happy.svg" alt="Cat" />
      </button>
    </div>
  </div>

  <div class="w-full h-4/5 relative">
    <textarea
      v-model="content"
      placeholder="Enter Text"
      class="bg-secondary border border-purple rounded-xl p-2 text-xl w-full h-full"
      @input="clearWarning"
    />
    <img
      src="@/assets/icons/add.svg"
      alt="Add"
      class="absolute bottom-5 right-5 h-10 border border-purple rounded-xl"
      @click="updateData"
    />
    <div v-if="msg" class="absolute bottom-5 left-5 text-red-500 text-sm">
      {{ msg }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { updateUserData } from '@/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = router.currentRoute.value.params.username.toString()
const msg = ref('')

const title = ref('')
const content = ref('')
const emotion = ref(0)

const selectEmotion = (selectedEmotion: number) => {
  emotion.value = selectedEmotion
  clearWarning()
}

const updateData = async () => {
  try {
    if (!title.value || !content.value || !emotion.value) {
      msg.value = 'Please fill out all fields'
      return
    }
    const newEntry = {
      title: title.value,
      content: content.value,
      emotion: emotion.value,
    }

    updateUserData(user, newEntry)

    // reload page to display new entry
    router.go(0)
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error)
  }
}

const clearWarning = () => {
  msg.value = ''
}
</script>

<style scoped></style>
