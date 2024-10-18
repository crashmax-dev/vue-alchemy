import recipes from '@/assets/recipes.json'
import * as vueuse from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, watchEffect } from 'vue'
import { useGame } from './use-game.js'
import { useSounds } from './use-sounds.js'
import type { AlchemyElement } from '@/types.js'

type OpenedAlchemyElements = Omit<AlchemyElement, 'uuid'>[]

export const useOpenedElements = defineStore('opened-elements', () => {
  const game = useGame()
  const sounds = useSounds()
  const openedElements = vueuse.useStorage<OpenedAlchemyElements>(
    'alchemy-opened-elements',
    [],
  )

  const elementsCounter = computed(() => {
    return `${openedElements.value.length} / ${recipes.length}`
  })

  function $reset(): void {
    openedElements.value = []
  }

  function isCreatedElement(elementId: string) {
    return openedElements.value.find((openedElement) => {
      return openedElement.id === elementId
    })
  }

  function addElement(element: AlchemyElement): void {
    const isExist = openedElements.value
      .some((openedElement) => openedElement.id === element.id)

    if (isExist) {
      sounds.createAudio.play()
      return
    }

    sounds.createNewAudio.play()
    openedElements.value.push({
      id: element.id,
      name: element.name,
      ended: element.ended,
    })
  }

  watchEffect(() => {
    if (!game.basicElements || openedElements.value.length > 0) return
    openedElements.value = game.basicElements.map((element) => {
      return {
        id: element.id,
        name: element.name,
        ended: element.ended,
      }
    })
  })

  return {
    openedElements,
    elementsCounter,
    $reset,
    addElement,
    isCreatedElement,
  }
})
