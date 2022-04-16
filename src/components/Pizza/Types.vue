<template>
  <ul>
    <li
      @click="handleActiveItem(i), $emit('clickedType',item)"
      :class="{ active: activeItem === i }"
      v-for="(item, i) in types"
      :key="item"
    >
      {{ typesItems[item] }}
    </li>
  </ul>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: ['types'],
  setup() {
    const typesItems = ref(['тонкое', 'традиционное'])
    const activeItem = ref(0)
    const handleActiveItem = (i) => {
      activeItem.value = i
    }

    return { handleActiveItem, typesItems, activeItem }
  },
}
</script>

<style></style>
