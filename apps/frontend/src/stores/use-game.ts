import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
import { useBoard } from './use-board.js'
import { useOpenedElements } from './use-opened-elements.js'
import { API_URL } from '@/constants.js'
import type { AlchemyElement, AlchemyElementOnBoard, Position } from '@/types.js'

interface AlchemyInfo {
  recipes: number
  basicElements: AlchemyElement[]
}

export const useGame = defineStore('game', () => {
  const board = useBoard()
  const { data } = useFetch(`${API_URL}/api/alchemy`).json<AlchemyInfo>()
  const openedElements = useOpenedElements()

  const availableRecipes = computed(() => {
    return `${openedElements.openedElements.length} / ${data.value?.recipes ?? 0}`
  })

  const basicElements = computed((): AlchemyElementOnBoard[] | undefined => {
    return data.value?.basicElements.map((element) => {
      return {
        ...element,
        position: getRandomPosition()
      }
    })
  })

  function getRandomPosition(): Position {
    return {
      x: Math.floor(Math.random() * (board.boardSize.right - board.boardSize.left) + board.boardSize.left),
      y: Math.floor(Math.random() * (board.boardSize.bottom - board.boardSize.top) + board.boardSize.top)
    }
  }

  function $reset() {
    const isConfirm = confirm('Вы точно хотите начать новую игру?')
    if (!isConfirm) return
    board.$reset()
    openedElements.$reset()
  }

  return {
    availableRecipes,
    basicElements,
    getRandomPosition,
    $reset
  }
})
