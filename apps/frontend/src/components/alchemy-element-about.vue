<script setup lang="ts">
import { sprites } from '@/assets/sprites'
import { useElementAbout } from '@/stores/use-element-about'
import Drawer from '@/ui/drawer/drawer.vue'
import DrawerBody from '@/ui/drawer/drawer-body.vue'
import DrawerHeader from '@/ui/drawer/drawer-header.vue'
import AlchemyItem from './alchemy-item.vue'

const elementAbout = useElementAbout()
</script>

<template>
  <Drawer v-model="elementAbout.isOpen" min-width="65%">
    <template v-if="elementAbout.activeElement">
      <DrawerHeader>
        Об элементе
      </DrawerHeader>
      <DrawerBody>
        <div class="container">
          <div class="info">
            <h2>{{ elementAbout.activeElement.name }}</h2>
            <img
              class="image"
              :src="sprites[elementAbout.activeElement.id]"
            >
            <p class="description">
              {{ elementAbout.activeElement.description }}
            </p>
          </div>

          <div v-if="elementAbout.activeElement.recipes.length">
            <h2>Доступные рецепты</h2>
            <div
              v-for="(recipe, index) of elementAbout.activeElement.recipes"
              :key="index"
              class="recipe"
            >
              <div class="element" @click="elementAbout.openElementAbout(recipe[0])">
                <AlchemyItem :element="recipe[0]" />
              </div>
              <span class="plus">+</span>
              <div class="element" @click="elementAbout.openElementAbout(recipe[1])">
                <AlchemyItem :element="recipe[1]" />
              </div>
            </div>
          </div>
        </div>
      </DrawerBody>
    </template>
  </Drawer>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-direction: column;

  .image {
    height: 120px;
    width: 120px;
  }

  .description {
    text-align: justify;
    font-size: 18px;
  }
}

.recipe {
  display: flex;
  align-items: baseline;

  .plus {
    font-size: 64px;
    font-weight: bold;
  }

  .element {
    cursor: pointer;
  }
}
</style>
