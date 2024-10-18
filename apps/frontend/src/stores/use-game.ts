import recipes from '@/assets/recipes.json'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useBoard } from './use-board.js'
import { useOpenedElements } from './use-opened-elements.js'
import type { AlchemyElementOnBoard, Position } from '@/types.js'

export const useGame = defineStore('game', () => {
  const board = useBoard()
  const openedElements = useOpenedElements()
  const basicElements = ref<AlchemyElementOnBoard[]>([])

  function getRandomPosition(): Position {
    return {
      x: Math.floor(Math.random() * (board.boardSize.right - board.elementSize.height)),
      y: Math.floor(Math.random() * (board.boardSize.bottom - board.elementSize.width)),
    }
  }

  function $reset() {
    const isConfirm = confirm('Вы точно хотите начать новую игру?')
    if (!isConfirm) return
    board.$reset()
    openedElements.$reset()
  }

  watch(() => board.boardSize, (board) => {
    if (board.bottom === 0) return
    basicElements.value = recipes.slice(0, 4).map((element) => {
      return {
        uuid: crypto.randomUUID(),
        id: element.id,
        name: element.name,
        ended: element.ended ?? false,
        position: getRandomPosition(),
      }
    })
  })

  return {
    basicElements,
    getRandomPosition,
    $reset,
  }
})
