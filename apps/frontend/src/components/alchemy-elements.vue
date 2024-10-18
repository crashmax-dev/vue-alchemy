<script setup lang="ts">
import { useBoard } from '@/stores/use-board.js'
import { useElementAbout } from '@/stores/use-element-about'
import { useGame } from '@/stores/use-game.js'
import { useGuide } from '@/stores/use-guide'
import { useOpenedElements } from '@/stores/use-opened-elements.js'
import { computed, ref } from 'vue'
import AlchemyItem from './alchemy-item.vue'
import type { AlchemyElement } from '@/types.js'

const guide = useGuide()
const game = useGame()
const board = useBoard()
const elementAbout = useElementAbout()
const openedElements = useOpenedElements()
const searchInput = ref('')

const filteredElements = computed(() => {
  return openedElements.openedElements.filter((element) => {
    const value = searchInput.value.toLowerCase()
    const id = element.id.includes(value)
    const name = element.name.toLowerCase().includes(value)
    return id || name
  })
})

function createElement(element: AlchemyElement) {
  board.board.push({
    ...element,
    uuid: crypto.randomUUID(),
    position: game.getRandomPosition(),
  })
}
</script>

<template>
  <div class="container">
    <input
      v-model="searchInput"
      class="search-input"
      type="text"
      name="search"
      placeholder="Искать элемент..."
    >
    <div class="elements-list">
      <div
        v-for="element in filteredElements"
        :key="element.id"
        class="element"
        @click="createElement(element)"
        @contextmenu.prevent="() => {
          guide.closeGuide()
          elementAbout.openElementAbout(element)
        }"
      >
        <AlchemyItem :element="element" />
      </div>
    </div>
    <div class="controls">
      <div
        class="button border-right"
        @click="game.$reset()"
      >
        Новая игра
      </div>
      <div
        id="toggle-guide"
        class="button border-right"
        @click="guide.toggleGuide()"
      >
        Помощь
      </div>
      <div
        class="button"
        @click="board.$reset()"
      >
        Очистить поле
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--vt-c-black);
  width: 35%;
  display: flex;
  flex-direction: column;
}

.elements-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: center;
  height: 100%;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  overscroll-behavior: contain;
}

@media screen and (max-width: 768px) {
  .container {
    width: 40%;
  }
}

.element {
  cursor: pointer;
}

.search-input {
  width: 100%;
  padding: 1rem;
  background: var(--vt-c-black);
  border: none;
  outline: none;
  border-bottom: 1px solid var(--vt-c-divider-dark-2);
  font-size: 18px;
  text-align: center;
  color: var(--vt-c-text-dark-2);
  height: 52px;
}

.controls {
  display: flex;
  border-top: 1px solid var(--vt-c-divider-dark-2);
}

.button {
  padding: 12px;
  cursor: pointer;
  color: var(--vt-c-text-dark-2);
  background-color: var(--vt-c-black);
  font-size: inherit;
  text-align: center;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.border-right {
  border-right: 1px solid var(--vt-c-divider-dark-2);
}
</style>
