<template>
  <div class="drawer-header">
    <span class="h6">
      <slot />
    </span>
    <img
      class="drawer-header__close"
      :src="XIcon"
      @click="toggleDrawer"
    >
  </div>
</template>

<script setup lang="ts">
import XIcon from '@/assets/x.svg'
import { inject } from 'vue'
import { drawerInjectionKey } from './drawer-injection-key'

const { toggleDrawer } = inject(drawerInjectionKey)!
</script>

<style scoped lang="scss">
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  border-bottom: 1px solid var(--vt-c-divider-dark-2);
  height: 52px;
  flex-shrink: 0;

  &__close {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
