import freakGames from '@/assets/freak-games.mp3'
import { sounds } from '@/assets/sounds'
import { defineStore } from 'pinia'

export const useSounds = defineStore('sounds', () => {
  const freakGamesAudio = new Audio(freakGames)
  freakGamesAudio.volume = 1

  const createAudio = new Audio(sounds.create)
  createAudio.volume = 0.4

  const createNewAudio = new Audio(sounds.create_new)
  createNewAudio.volume = 0.4

  const takingAudio = new Audio(sounds.taking)
  takingAudio.volume = 0.6

  return {
    freakGamesAudio,
    createAudio,
    createNewAudio,
    takingAudio,
  }
})
