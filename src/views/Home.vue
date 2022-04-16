<template>
  <div class="content">
    <div class="container">
      <Advertising />
      <div class="content__top">
        <Categories />
        <Sort />
      </div>
      <PizzaList />
    </div>
  </div>
</template>

<script>
import Advertising from '@/components/advertising'
import PizzaList from '@/components/Pizza/List'
import Categories from '@/components/Categories'
import Sort from '@/components/Sort'
import { useStore } from 'vuex'
export default {
  components: { Advertising, PizzaList, Categories, Sort },
  setup() {
    const store = useStore()
    store.commit('SELECT_PAGE', 'Главная')
    return {  }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

.content__top {
  margin-top: 65px;
}
</style>
