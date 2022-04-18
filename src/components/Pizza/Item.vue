<template>
  <div class="pizza-block">
    <div
      v-if="pizza.rating && userLocal.admin"
      class="pizza-block__admin_panel"
    >
      <div style="cursor: pointer" @click="handleShowPopup">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="18" fill="#FE5F1E" />
        </svg>
      </div>
      <div v-if="pizzaShowPopup" class="pizza-block__admin_panel-popup">
        <ul>
          <li
            @click="selectCurrentFunction('Change')"
            :class="{ active: currentPanelFunction === 'Change' }"
          >
            Изменить
          </li>
          <li
            @click="selectCurrentFunction('Delete')"
            :class="{ active: currentPanelFunction === 'Delete' }"
          >
            Удалить
          </li>
          <li
            @click="selectCurrentFunction('OnAlphabet')"
            :class="{ active: currentPanelFunction === 'OnAlphabet' }"
          >
            По алфавиту
          </li>
        </ul>
      </div>
    </div>
    <img class="pizza-block__image" :src="pizza.imageUrl" alt="Pizza" />
    <h4 class="pizza-block__title">{{ pizza.name }}</h4>
    <div class="pizza-block__selector">
      <Types :types="pizza.types" @clickedType="setSubType" />
      <Sizes :sizes="pizza.sizes" @clickedSize="setSubSize" />
    </div>
    <div class="pizza-block__bottom">
      <div class="pizza-block__price">от {{ resPizzaPrice }} ₽</div>
      <div
        v-if="user !== null && pizza.rating"
        @click="handleAddCart(pizza)"
        class="button button--outline button--add"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
            fill="white"
          />
        </svg>
        <span>Добавить</span>
        <i> {{ pizzaCount }}</i>
      </div>
      <div
        v-if="user === null"
        @click="handleDisabledPizza()"
        class="button button--outline button--add"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
            fill="white"
          />
        </svg>
        <span>Добавить</span>
      </div>
      <div v-if="!pizza.rating" class="button button--outline button--add">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
            fill="white"
          />
        </svg>
        <span>Добавить</span>
      </div>
    </div>
  </div>
</template>

<script>
import useDoc from '@/composables/useDoc.js'
import { user } from '@/composables/getUser.js'
import Types from './Types.vue'
import Sizes from './Sizes.vue'
import { useStore } from 'vuex'
import { computed, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
export default {
  props: ['pizza'],
  components: { Types, Sizes },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const pizzaShowPopup = ref(false)
    const currentPanelFunction = ref()
    const userLocal = computed(() => store.state.currentUser)
    const resPizzaPrice = ref(props.pizza.price[0])
    const resPizzaSize = ref(props.pizza.sizes[0])
    const resPizzaType = ref(props.pizza.types[0])
    const pizzaCount = ref(0)

    onMounted(() => {
      if (
        computed(() =>
          store.state.cartItems.has(
            JSON.stringify({
              id: props.pizza.id,
              imageUrl: props.pizza.imageUrl,
              name: props.pizza.name,
              types: resPizzaType.value,
              sizes: resPizzaSize.value,
              price: resPizzaPrice.value,
              category: props.pizza.category,
              rating: props.pizza.rating,
            })
          )
        ).value
      ) {
        pizzaCount.value = computed(
          () =>
            store.state.cartItems.get(
              JSON.stringify({
                id: props.pizza.id,
                imageUrl: props.pizza.imageUrl,
                name: props.pizza.name,
                types: resPizzaType.value,
                sizes: resPizzaSize.value,
                price: resPizzaPrice.value,
                category: props.pizza.category,
                rating: props.pizza.rating,
              })
            ).count
        )
      } else {
        pizzaCount.value = 0
      }
    })
    const handleShowPopup = () => {
      pizzaShowPopup.value = !pizzaShowPopup.value
    }
    const selectCurrentFunction = async (panelFunction) => {
      currentPanelFunction.value = panelFunction
      if (panelFunction === 'Change') {
        await router.push({
          name: 'UpdatePizza',
          params: { id: props.pizza.id },
        })
      }
      if (panelFunction === 'Delete') {
        const { deleteDocument } = useDoc()
        await deleteDocument('pizzas', props.pizza.id)
        setTimeout(async () => {
          await store.dispatch('getPizzaAction')
        }, 800)
      }
      if (panelFunction === 'OnAlphabet') {
      }
    }
    const setSubSize = (params) => {
      resPizzaSize.value = props.pizza.sizes[params]
      resPizzaPrice.value = props.pizza.price[params]
      if (
        computed(() =>
          store.state.cartItems.has(
            JSON.stringify({
              id: props.pizza.id,
              imageUrl: props.pizza.imageUrl,
              name: props.pizza.name,
              types: resPizzaType.value,
              sizes: resPizzaSize.value,
              price: resPizzaPrice.value,
              category: props.pizza.category,
              rating: props.pizza.rating,
            })
          )
        ).value
      ) {
        pizzaCount.value = computed(
          () =>
            store.state.cartItems.get(
              JSON.stringify({
                id: props.pizza.id,
                imageUrl: props.pizza.imageUrl,
                name: props.pizza.name,
                types: resPizzaType.value,
                sizes: resPizzaSize.value,
                price: resPizzaPrice.value,
                category: props.pizza.category,
                rating: props.pizza.rating,
              })
            ).count
        )
      } else {
        pizzaCount.value = 0
      }
    }
    const setSubType = (params) => {
      switch (params) {
        case 0:
          resPizzaType.value = 0
        case 1:
          resPizzaType.value = 1
      }
      if (
        computed(() =>
          store.state.cartItems.has(
            JSON.stringify({
              id: props.pizza.id,
              imageUrl: props.pizza.imageUrl,
              name: props.pizza.name,
              types: resPizzaType.value,
              sizes: resPizzaSize.value,
              price: resPizzaPrice.value,
              category: props.pizza.category,
              rating: props.pizza.rating,
            })
          )
        ).value
      ) {
        pizzaCount.value = computed(
          () =>
            store.state.cartItems.get(
              JSON.stringify({
                id: props.pizza.id,
                imageUrl: props.pizza.imageUrl,
                name: props.pizza.name,
                types: resPizzaType.value,
                sizes: resPizzaSize.value,
                price: resPizzaPrice.value,
                category: props.pizza.category,
                rating: props.pizza.rating,
              })
            ).count
        )
      } else {
        pizzaCount.value = 0
      }
    }
    const handleAddCart = () => {
      store.commit('ADD_CART', {
        id: props.pizza.id,
        imageUrl: props.pizza.imageUrl,
        name: props.pizza.name,
        types: resPizzaType.value,
        sizes: resPizzaSize.value,
        price: resPizzaPrice.value,
        category: props.pizza.category,
        rating: props.pizza.rating,
      })
      if (
        computed(() =>
          store.state.cartItems.has(
            JSON.stringify({
              id: props.pizza.id,
              imageUrl: props.pizza.imageUrl,
              name: props.pizza.name,
              types: resPizzaType.value,
              sizes: resPizzaSize.value,
              price: resPizzaPrice.value,
              category: props.pizza.category,
              rating: props.pizza.rating,
            })
          )
        ).value
      ) {
        pizzaCount.value = computed(
          () =>
            store.state.cartItems.get(
              JSON.stringify({
                id: props.pizza.id,
                imageUrl: props.pizza.imageUrl,
                name: props.pizza.name,
                types: resPizzaType.value,
                sizes: resPizzaSize.value,
                price: resPizzaPrice.value,
                category: props.pizza.category,
                rating: props.pizza.rating,
              })
            ).count
        )
      } else {
        pizzaCount.value = 0
      }
    }
    const handleDisabledPizza = () => {
      alert('зарегистрируйтесь чтобы купить пиццу !')
    }
    return {
      userLocal,
      selectCurrentFunction,
      currentPanelFunction,
      pizzaShowPopup,
      handleShowPopup,
      handleDisabledPizza,
      user,
      setSubType,
      resPizzaType,
      handleAddCart,
      resPizzaPrice,
      pizzaCount,
      setSubSize,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
.pizza-block {
  width: 280px;
  text-align: center;
  margin-bottom: 65px;

  &:not(:nth-of-type(4n)) {
    margin-right: 35px;
  }
  &__admin_panel {
    position: relative;
    margin-left: 160px;
    &-popup {
      position: absolute;
      right: 0;
      margin-top: 15px;
      background: #ffffff;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
      border-radius: 10px;
      overflow: hidden;
      padding: 10px 0;
      width: 160px;
      ul {
        overflow: hidden;
        li {
          padding: 12px 20px;
          cursor: pointer;
          &.active,
          &:hover {
            background: rgba(254, 95, 30, 0.05);
          }
          &.active {
            font-weight: bold;
            color: $orange;
          }
        }
      }
    }
  }
  &__image {
    width: 260px;
  }

  &__title {
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 1%;
    margin-bottom: 20px;
  }

  &__selector {
    display: flex;
    background-color: #f3f3f3;
    border-radius: 10px;
    flex-direction: column;
    padding: 6px;

    ul {
      display: flex;
      flex: 1;

      &:first-of-type {
        margin-bottom: 6px;
      }

      li {
        padding: 8px;
        flex: 1;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        @include noselect();
        &.active {
          background: #ffffff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
          border-radius: 5px;
          cursor: auto;
        }
      }
    }
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  &__price {
    font-weight: bold;
    font-size: 22px;
    line-height: 27px;
    letter-spacing: 0.015em;
  }
}
</style>
