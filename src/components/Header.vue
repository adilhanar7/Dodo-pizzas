<template>
  <header class="header">
    <div class="container">
      <div @click="handleShowSideBar" class="header__logo">
        <img width="38" :src="logo" alt="Pizza logo" />
        <div>
          <h1>Dodo Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </div>
      <div
        v-if="
          currentPage === 'Авторизация' ||
          currentPage === 'РедиктированиеПревью' ||
          currentPage === 'Пиццы' ||
          currentPage === 'Админ'||
          currentPage === 'Корзина'
        "
      ></div>
      <div v-else class="header__search">
        <input
          v-model="inputText"
          @input="handleInputText"
          type="text"
          placeholder="Введите текст для поиска..."
        />
        <span @click="handleInputText">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.8387 16.6908L12.4283 11.2804C13.2679 10.195 13.7221 8.86794 13.7221 7.47211C13.7221 5.80129 13.07 4.23462 11.8908 3.05338C10.7117 1.87213 9.14085 1.22214 7.47211 1.22214C5.80337 1.22214 4.23254 1.87422 3.05338 3.05338C1.87213 4.23254 1.22214 5.80129 1.22214 7.47211C1.22214 9.14085 1.87422 10.7117 3.05338 11.8908C4.23254 13.0721 5.80129 13.7221 7.47211 13.7221C8.86794 13.7221 10.1929 13.2679 11.2783 12.4304L16.6887 17.8387C16.7046 17.8546 16.7234 17.8672 16.7442 17.8758C16.7649 17.8844 16.7871 17.8888 16.8096 17.8888C16.832 17.8888 16.8542 17.8844 16.875 17.8758C16.8957 17.8672 16.9145 17.8546 16.9304 17.8387L17.8387 16.9325C17.8546 16.9166 17.8672 16.8978 17.8758 16.8771C17.8844 16.8563 17.8888 16.8341 17.8888 16.8117C17.8888 16.7892 17.8844 16.767 17.8758 16.7463C17.8672 16.7255 17.8546 16.7067 17.8387 16.6908ZM10.7721 10.7721C9.88877 11.6533 8.71794 12.1388 7.47211 12.1388C6.22628 12.1388 5.05545 11.6533 4.17213 10.7721C3.29088 9.88877 2.80546 8.71794 2.80546 7.47211C2.80546 6.22628 3.29088 5.05337 4.17213 4.17213C5.05545 3.29088 6.22628 2.80546 7.47211 2.80546C8.71794 2.80546 9.89085 3.2888 10.7721 4.17213C11.6533 5.05545 12.1388 6.22628 12.1388 7.47211C12.1388 8.71794 11.6533 9.89085 10.7721 10.7721Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
      <div class="header__cart">
        <router-link
          v-if="user !== null"
          to="/cart"
          class="button button--cart"
        >
          <span v-if="totalSum">{{ totalSum }} ₽</span>
          <span v-else>0 ₽</span>
          <div class="button__delimiter"></div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span v-if="totalCount">{{ totalCount }}</span>
          <span v-else>0</span>
        </router-link>
        <router-link
          v-if="user === null"
          to="/auth"
          @click="cickedPageRegister"
          class="button button--cart"
        >
          Войти / Регистрация
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { user } from '@/composables/getUser.js'
import logo from '@/assets/img/pizza-logo.svg'
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const totalCount = computed(() => store.getters.getAddedPizzasCount)
    const totalSum = computed(() => store.getters.getAddedPizzasSum)
    const currentPage = computed(() => store.state.currentPage)
    const inputText = ref('')

    const handleInputText = () => {
      store.commit('SEARCH_PIZZA', inputText.value)
      if (!inputText.value.length) {
        store.dispatch('getPizzaAction')
      }
    }
    const handleShowSideBar = () => {
      store.commit('SHOW_SIDEBAR')
    }
    const cickedPageRegister = () => {
      store.commit('SELECT_PAGE', 'Авторизация')
    }

    return {
      cickedPageRegister,
      currentPage,
      handleShowSideBar,
      logo,
      totalSum,
      totalCount,
      inputText,
      handleInputText,
      user,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

.header {
  border-bottom: 1px solid $gray-line;
  padding-top: 55px;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__logo {
    display: flex;
    cursor: pointer;
    img {
      margin-right: 15px;
    }
    h1 {
      color: #181818;
      font-size: 24px;
      letter-spacing: 1%;
      text-transform: uppercase;
      font-weight: 800;
    }
    p {
      color: #7b7b7b;
    }
  }
  &__search {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 40px;
    width: 455px;
    height: 50px;
    border-radius: 30px;
    background: $gray-blueF2;
    input {
      background: none;
      border: none;
      width: 45%;
    }
    span {
      background: $orange;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background: lighten($orange, 10%);
      }
    }
  }
}
</style>
