<template>
  <ul>
    <li
      @click="handleActiveItem(i), $emit('clickedSize', i)"
      :class="{ active: activeItem === i }"
      v-for="(item, i) in sizes"
      :key="item"
    >
      {{ item }} см
    </li>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: ['sizes'],
  setup() {
    const activeItem = ref(0)
    const handleActiveItem = (index) => {
      activeItem.value = index
    }

    return { handleActiveItem, activeItem }
  },
}
</script>

<style></style>
