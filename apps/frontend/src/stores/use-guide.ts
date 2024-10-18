import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGuide = defineStore('guide', () => {
  const isOpen = ref(false)

  function toggleGuide() {
    isOpen.value = !isOpen.value
  }

  function closeGuide() {
    isOpen.value = false
  }

  return {
    isOpen,
    closeGuide,
    toggleGuide,
  }
})
