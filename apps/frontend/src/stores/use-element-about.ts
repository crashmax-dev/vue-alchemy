import recipes from '@/assets/recipes.json'
import { useOpenedElements } from '@/stores/use-opened-elements'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AlchemyElement } from '@/types'

interface AlchemyRecipe {
  id: string
  name: string
  ended?: boolean
}

interface AlchemyAboutElement {
  id: string
  name: string
  description: string
  recipes: AlchemyRecipe[][]
}

export const useElementAbout = defineStore('element-about', () => {
  const isOpen = ref(false)
  const activeElement = ref<AlchemyAboutElement | null>(null)
  const openedElements = useOpenedElements()

  function openElementAbout(element: AlchemyElement) {
    isOpen.value = true

    const el = recipes.find((recipe) => recipe.id === element.id)!
    const openedRecipes: AlchemyRecipe[][] = []

    for (const recipe of el.recipes) {
      const [el1, el2] = recipe as [string, string]
      const first = openedElements.isCreatedElement(el1)
      const second = openedElements.isCreatedElement(el2)
      if (first && second) {
        openedRecipes.push([first, second])
      }
    }

    activeElement.value = {
      id: element.id,
      name: element.name,
      description: el.description,
      recipes: openedRecipes,
    }
  }

  return {
    isOpen,
    activeElement,
    openElementAbout,
  }
})
