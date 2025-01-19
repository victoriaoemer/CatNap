<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col md:flex-row gap-4 pb-5">
      <input
        v-model="title"
        type="text"
        placeholder="Enter Title"
        class="bg-[#3B32AB] border border-purple rounded-xl p-2 md:text-xl md:w-2/3"
        @input="clearWarning"
      />
      <div
        class="bg-[#3B32AB] border border-purple rounded-xl p-1 md:w-1/3 flex flex-col justify-center items-center"
      >
        <p v-if="props.large">How was your dream?</p>
        <div
          class="flex gap-2"
          :class="{
            'py-1': props.large,
          }"
        >
          <button
            class="p-1 rounded-md bg-emotion-red flex items-center justify-center"
            :class="[
              { 'opacity-50': emotion !== 1 && emotion !== 0 },
              props.large ? 'h-10 w-10' : 'h-6 w-6',
            ]"
            @click="selectEmotion(1)"
          >
            <img src="@/assets/cat-emotes/cat-emote-sad.svg" alt="Sad Cat" />
          </button>
          <button
            class="p-1 rounded-md bg-emotion-orange flex items-center justify-center"
            :class="[
              { 'opacity-50': emotion !== 2 && emotion !== 0 },
              props.large ? 'h-10 w-10' : 'h-6 w-6',
            ]"
            @click="selectEmotion(2)"
          >
            <img src="@/assets/cat-emotes/cat-emote-meh.svg" alt="Meh Cat" />
          </button>
          <button
            class="p-1 rounded-md bg-emotion-green flex items-center justify-center"
            :class="[
              { 'opacity-50': emotion !== 3 && emotion !== 0 },
              props.large ? 'h-10 w-10' : 'h-6 w-6',
            ]"
            @click="selectEmotion(3)"
          >
            <img src="@/assets/cat-emotes/cat-emote-happy.svg" alt="Happy Cat" />
          </button>
        </div>
      </div>
    </div>

    <div class="flex-grow relative">
      <textarea
        v-model="content"
        placeholder="Enter Text"
        class="bg-[#3B32AB] border border-purple rounded-xl p-2 md:text-xl w-full h-full resize-none min-h-28"
        @input="clearWarning"
      />
      <img
        src="@/assets/icons/add.svg"
        alt="Add"
        class="absolute bottom-5 right-5 h-10 border border-purple rounded-xl hover:bg-gradient"
        @click="updateData"
      />
      <div v-if="msg" class="absolute bottom-5 left-5 text-red-500 text-sm">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/types/User'
import { ref } from 'vue'

const userStore = useUserStore()
const user = userStore.username
const msg = ref('')

const title = ref('')
const content = ref('')
const emotion = ref(0)

const props = defineProps({
  large: Boolean,
  onUpdateEntries: Function,
})

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

    userStore.updateUserData(user, newEntry)

    const updatedEntries = await userStore.getUserData(user)
    if (props.onUpdateEntries) {
      props.onUpdateEntries(updatedEntries)
    }

    // Formular zurücksetzen
    title.value = ''
    content.value = ''
    emotion.value = 0
    clearWarning()

    // to update all widgets in the dashboard
    window.location.reload()
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error)
  }
}

const clearWarning = () => {
  msg.value = ''
}
</script>

<style scoped></style>
