<template>
  <h2 class="content__title">Все пиццы</h2>
  <div class="content__items">
    <Item v-for="pizza in pizzas" :key="pizza.id" :pizza="pizza" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Item from './Item.vue'
import { useStore } from 'vuex'
export default {
  components: { Item },
  setup() {
    const store = useStore()

    const pizzas = computed(() => store.state.pizzas)

    onMounted(() => {
      store.dispatch('getPizzaAction')
    })

    return { pizzas }
  },
}
</script>

<style></style>
