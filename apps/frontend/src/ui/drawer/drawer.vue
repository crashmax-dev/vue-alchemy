<template>
  <Teleport to="body">
    <Transition name="overlay-slide" :data-placement="placement">
      <div
        v-if="isOpen"
        ref="contentElement"
        class="drawer-content"
        :style="drawerStyles"
      >
        <slot :toggle-drawer="toggleDrawer" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, provide, ref, shallowRef, watch } from 'vue'

import { drawerInjectionKey } from './drawer-injection-key'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

const props = withDefaults(defineProps<{
  minWidth: string
  maxWidth?: string
  placement?: DrawerPlacement
  ignoreElement?: string[]
}>(), {
  maxWidth: 'auto',
  placement: 'right',
  ignoreElement: () => [],
})

const drawerStyles = computed(() => {
  return {
    minWidth: props.minWidth,
    maxWidth: props.maxWidth === 'auto' ? props.minWidth : props.maxWidth,
    [props.placement]: '0px',
  }
})

const isOpen = ref(false)
const openModel = defineModel<boolean>({ default: false })

watch(openModel, (value) => {
  isOpen.value = value
})

const contentElement = shallowRef<HTMLElement>()
onClickOutside(contentElement, () => (openModel.value = false), {
  ignore: props.ignoreElement,
})

function toggleDrawer() {
  openModel.value = !openModel.value
}

provide(drawerInjectionKey, {
  isOpen,
  toggleDrawer,
})
</script>

<style scoped lang="scss">
.drawer {
  &-overlay {
    background-color: var(--vt-c-overlay);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    bottom: 0px;
    transform: translateX(0%) translateY(0px) translateZ(0px);
    background-color: var(--vt-c-black);
    z-index: 900;
    border-left: 1px solid var(--vt-c-divider-dark-2);
  }
}

.overlay-slide-enter-active,
.overlay-fade-leave-active {
  transition: all 0.3s ease-out;
}

.overlay-slide-leave-active,
.overlay-fade-enter-active {
  transition: all 0.3s ease-in;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.overlay-slide-enter-from,
.overlay-slide-leave-to {
  &:where([data-placement='left']) {
    transform: translateX(-100%);
  }

  &:where([data-placement='right']) {
    transform: translateX(100%);
  }
}
</style>
