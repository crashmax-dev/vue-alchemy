<script setup lang="ts">
import { useOpenedElements } from '@/stores/use-opened-elements'
import { storeToRefs } from 'pinia'

const { elementsCounter } = storeToRefs(useOpenedElements())
</script>

<template>
  <div class="counter">
    {{ elementsCounter }}
  </div>
</template>

<style scoped>
.counter {
  position: absolute;
  top: 4px;
  right: 10px;
  z-index: 3;
  font-size: 18px;
  pointer-events: none;
}
</style>
