import * as vueuse from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useGame } from './use-game.js'
import type { AlchemyElementOnBoard } from '@/types.js'

export const useBoard = defineStore('board', () => {
  const boardSize = ref({ left: 0, right: 0, top: 0, bottom: 0 })
  const elementSize = ref({ width: 50, height: 50 })

  const game = useGame()
  const board = vueuse.useStorage<AlchemyElementOnBoard[]>('alchemy-board', [])

  function $reset(): void {
    board.value = game.basicElements?.map((element) => {
      return {
        ...element,
        position: game.getRandomPosition(),
      }
    })
  }

  function addElement(element: AlchemyElementOnBoard): void {
    board.value.push(element)
  }

  watch(() => game.basicElements, () => {
    if (board.value.length === 0) {
      board.value = game.basicElements
    }
  })

  return {
    board,
    boardSize,
    elementSize,
    $reset,
    addElement,
  }
})
