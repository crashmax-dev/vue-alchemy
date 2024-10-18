<script setup lang="ts">
import AlchemyBoard from '@/components/alchemy-board.vue'
import AlchemyCounter from '@/components/alchemy-counter.vue'
import AlchemyElements from '@/components/alchemy-elements.vue'
import AlchemyElementAbout from './components/alchemy-element-about.vue'
import AlchemyGuide from './components/alchemy-guide.vue'
</script>

<template>
  <AlchemyCounter />
  <AlchemyElements />
  <AlchemyBoard />

  <AlchemyGuide />
  <AlchemyElementAbout />
</template>
