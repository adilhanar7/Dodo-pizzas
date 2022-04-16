<template>
  <div class="cart__item">
    <div class="cart__item-img">
      <img class="pizza-block__image" :src="pizza.imageUrl" alt="Pizza" />
    </div>
    <div class="cart__item-info">
      <h3>{{ pizza.name }}</h3>       
      <p> 
        <span v-if="pizza.types === 0">Тонкое</span> 
        <span v-if="pizza.types === 1">Традиционное</span>
        тесто, {{pizza.sizes}} см.</p>
    </div>
    <div class="cart__item-count">
      <div @click="handleDecrementPizza" class="button button--outline button--circle cart__item-count-minus">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
            fill="#EB5A1E"
          />
          <path
            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
            fill="#EB5A1E"
          />
        </svg>
      </div>
      <b>{{ pizza.count }}</b>
      <div @click="handleIncrementPizza" class="button button--outline button--circle cart__item-count-plus">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
            fill="#EB5A1E"
          />
          <path
            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
            fill="#EB5A1E"
          />
        </svg>
      </div>
    </div>
    <div class="cart__item-price">
      <b>{{ pizzaTotalPrice }} ₽</b>
    </div>
    <div @click="handleDeltePizza" class="cart__item-remove">
      <div class="button button--outline button--circle">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
            fill="#EB5A1E"
          />
          <path
            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
            fill="#EB5A1E"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from "vuex";
export default {
  props: ["pizza"],
  setup(props) {
    const store = useStore()

    const pizzaTotalPrice = computed(() => store.getters.getCartItemTotalPrice(props.pizza))

    const handleDeltePizza = () => {
      store.commit('DELETE__CART_ITEM',props.pizza)
    }

    const handleDecrementPizza = () => {
      store.commit('DECREMENT_CART_ITEM',props.pizza)
    }
    const handleIncrementPizza = () => {
      store.commit('INCREMENT_CART_ITEM',props.pizza)
    }

  
    return {handleIncrementPizza , handleDecrementPizza , handleDeltePizza , pizzaTotalPrice }
  },
};
</script>

<style lang="scss">
</style>