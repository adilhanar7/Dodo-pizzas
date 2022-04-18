<template>
  <div class="categories">
    <ul>
      <li @click="handleSetNull" :class="{ active: categoryActive === null }">
        Все
      </li>
      <li
        :class="{ active: i === categoryActive }"
        v-for="(item, i) in categoriesItems"
        :key="item"
        @click="handleActiveItem(i)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const categoriesItems = ref([
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
    ])
    const categoryActive = computed(() => store.state.category)

    const handleActiveItem = (i) => {
      store.dispatch('getFilteredPizzaz', i)
    }

    const handleSetNull = () => {
      store.commit('SET_CATEGORY', null)
      store.dispatch('getPizzaAction')
    }

    return { categoriesItems, handleActiveItem, categoryActive, handleSetNull }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
.categories {
  background: white;
  border-radius: 30px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  height: 100px;
  min-width: 915px;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    display: flex;
    li {
      padding: 13px 30px;
      border-radius: 30px;
      margin-right: 10px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.1s ease-in-out;
      @include noselect();

      &:hover {
        background-color: darken(#f9f9f9, 2%);
      }

      &:active {
        background-color: darken(#f9f9f9, 5%);
      }

      &.active {
        background-color: #282828;
        color: #fff;
      }
    }
  }
}
</style>
