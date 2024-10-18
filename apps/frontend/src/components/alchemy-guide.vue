<script setup lang="ts">
import { useGuide } from '@/stores/use-guide'
import Drawer from '@/ui/drawer/drawer.vue'
import DrawerBody from '@/ui/drawer/drawer-body.vue'
import DrawerHeader from '@/ui/drawer/drawer-header.vue'
import { storeToRefs } from 'pinia'

const { isOpen } = storeToRefs(useGuide())
</script>

<template>
  <Drawer
    v-model="isOpen"
    min-width="65%"
    :ignore-element="['#toggle-guide']"
  >
    <DrawerHeader>
      Помощь
    </DrawerHeader>
    <DrawerBody>
      <div class="guide">
        <div>
          <h2 class="title">
            Создание элементов
          </h2>
          <p class="description">
            Создавайте новые элементы, комбинируя существующие друг с другом. У одного элемента может быть несколько рецептов. Один элемент может использоваться в создании нескольких элементов.
          </p>
          <p class="description">
            Чтобы добавить уже созданный элемент на поле, найдите его в каталоге и нажмите по нему правой кнопкой мыши.
          </p>
          <p class="description">
            Кликните два раза по пустой области чтобы создать четыре базовых элемента.
          </p>
        </div>

        <div>
          <h2 class="title">
            Просмотр информации об элементе
          </h2>
          <p class="description">
            Не забывайте читать описания элементов. В них может содержаться подсказка для создания другого элемента. Для этого найдите элемент в каталоге и нажмите по нему левой кнопкой мыши.
          </p>
          <p class="description">
            Символ <b style="color: tomato;">*</b> около элемента означает, что данный элемент конечный и не может быть использован для создания другого элемента.
          </p>
        </div>

        <div>
          <h2 class="title">
            Копирование элементов
          </h2>
          <p class="description">
            Чтобы скопировать элемент, кликните по нему два раза.
          </p>
        </div>

        <div>
          <h2 class="title">
            Удаление элементов
          </h2>
          <p class="description">
            Чтобы удалить элемент, кликните по нему правой кнопкой мыши или воспользуйтесь опцией "Очистить поле".
          </p>
        </div>
      </div>
    </DrawerBody>
  </Drawer>
</template>

<style scoped lang="scss">
.guide {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.description {
  text-align: justify;
  font-size: 18px;
}

.description + .description {
  margin-top: 12px;
}
</style>
