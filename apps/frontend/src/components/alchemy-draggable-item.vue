<script setup lang="ts">
import AlchemyItem from './alchemy-item.vue'
import { computed, ref, watch } from 'vue'
import { clamp, useDraggable, useElementBounding } from '@vueuse/core'
import { useSounds } from '@/stores/use-sounds'
import type { AlchemyElementOnBoard, Position } from '@/types.js'

const props = defineProps<{
  alchemyElement: AlchemyElementOnBoard,
  boardBounding: ReturnType<typeof useElementBounding>
}>()

const emits = defineEmits<{
  'position': [Position],
  'update:clone-element': [AlchemyElementOnBoard],
  'update:remove-element': [AlchemyElementOnBoard]
}>()

const sounds = useSounds()
const element = ref<HTMLElement | null>(null)
const { width, height } = useElementBounding(element)

const { x, y, position } = useDraggable(element, {
  initialValue: props.alchemyElement.position,
  onStart() {
    sounds.takingAudio.play()
  },
  onEnd(position) {
    emits('position', position)
  }
})

const xPos = computed(() => {
  return `${clamp(
    props.boardBounding.left.value,
    x.value,
    props.boardBounding.right.value - width.value
  )}px`
})

const yPos = computed(() => {
  return `${clamp(
    props.boardBounding.top.value,
    y.value,
    props.boardBounding.bottom.value - height.value
  )}px`
})

watch(() => props.alchemyElement.position, () => {
  position.value = props.alchemyElement.position
})
</script>

<template>
  <div
    ref="element"
    class="alchemy-item"
    v-bind:style="{ left: xPos, top: yPos }"
    v-on:dblclick="emits('update:clone-element', alchemyElement)"
    v-on:contextmenu.prevent="emits('update:remove-element', alchemyElement)"
  >
    <alchemy-item v-bind:element="alchemyElement" />
  </div>
</template>

<style scoped>
.alchemy-item {
  cursor: pointer;
  touch-action: none;
  position: fixed;
  inline-size: min-content;
  overflow-wrap: break-word;
  z-index: 1;
}

.alchemy-item:active, .alchemy-item:hover {
  transition: none;
  z-index: 2;
}
</style>