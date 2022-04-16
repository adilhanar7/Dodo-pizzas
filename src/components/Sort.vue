<template>
  <div class="sort">
    <div
      style="cursor:pointer;"
      @click="showPopup = !showPopup"
      class="sort__label"
    >
      <svg
        :class="{ active: showPopup }"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
          fill="#2C2C2C"
        />
      </svg>
      <b>Сортировка по:</b>
      <span>{{ sortItems[activeSortItem.id].name }}</span>
    </div>
    <div v-if="showPopup" class="sort__popup">
      <ul>
        <li
          @click="handleActiveItem(index)"
          :class="{ active: activeSortItem.id === index }"
          v-for="(item, index) in sortItems"
          :key="item.name"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const showPopup = ref(false)
    const sortItems = ref([
      { id: 0, name: 'популярности', sortBy: 'rating' },
      { id: 1, name: 'цене', sortBy: 'price' },
      { id: 2, name: 'алфавиту', sortBy: 'name' },
    ])

    const activeSortItem = computed(() => store.state.sortBy)

    const handleActiveItem = (index) => {
      showPopup.value = false
      store.commit('SET_SORT', sortItems.value[index])
    }

    return { showPopup, sortItems, activeSortItem, handleActiveItem }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
.sort {
  position: relative;
  &__label {
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
      transform: rotate(180deg);
	  transition: 0.4s;
      &.active {
        transform: rotate(0);
      }
    }

    b {
      margin-right: 8px;
    }

    span {
      color: $orange;
      border-bottom: 1px dashed $orange;
      cursor: pointer;
    }
  }

  &__popup {
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
</style>
