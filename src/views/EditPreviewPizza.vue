<template>
  <div class="content">
    <div class="container">
      <div class="edit__pizza">
        <div class="edit__pizza_heading">
          <h2>Рейтинг и Категория</h2>
          <h3>Определите настройки для пиццы</h3>
        </div>
        <div class="edit__pizza_main">
          <div class="edit__pizza_main-preview">
            <h5>Превью</h5>
            <Item :pizza="pizza" />
          </div>
          <form
            @submit.prevent="handleCreatePizza"
            class="edit__pizza_main-inside"
          >
            <div class="edit__pizza_main-inside_child">
              <span>Выберите категорию</span>
              <div @click.self="handleShowCategories()">
                {{ categoryActive }}
                <span v-if="boolShowCategories">
                  <ul>
                    <li
                      @click="handleCategory(item.name)"
                      :class="{ activeCategory: categoryActive === item.name }"
                      v-for="item in categoryItems"
                      :key="item.id"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </span>
              </div>
            </div>
            <div class="edit__pizza_main-inside_child">
              <span>Место в списке пицц</span>
              <span
                ><input
                  :class="{ active: mapChild === 'false' }"
                  type="radio"
                  name="childMap"
                  v-model="mapChild"
                  value="false"
                  required
                />
                <span>В конце списка</span></span
              >
              <span
                ><input
                  :class="{ active: mapChild === 'true' }"
                  type="radio"
                  name="childMap"
                  v-model="mapChild"
                  value="true"
                  required
                />
                <span>В начале списка</span></span
              >
            </div>
            <div class="edit__pizza_main-inside_child">
              <span>Определите рейтинг пиццы</span>
              <div>
                <div>
                  <input
                    :class="{ active: ratingPizza === '5' }"
                    type="radio"
                    name="ratingStars"
                    value="5"
                    v-model="ratingPizza"
                  />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                </div>
                <div>
                  <input
                    :class="{ active: ratingPizza === '4' }"
                    type="radio"
                    name="ratingStars"
                    value="4"
                    v-model="ratingPizza"
                  />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="noActiveStarPizza" />
                </div>
                <div>
                  <input
                    :class="{ active: ratingPizza === '3' }"
                    type="radio"
                    name="ratingStars"
                    value="3"
                    v-model="ratingPizza"
                  />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="noActiveStarPizza" />
                  <img :src="noActiveStarPizza" />
                </div>
                <div>
                  <input
                    :class="{ active: ratingPizza === '2' }"
                    type="radio"
                    name="ratingStars"
                    value="2"
                    v-model="ratingPizza"
                  />
                  <img :src="activeStarPizza" />
                  <img :src="activeStarPizza" />
                  <img :src="noActiveStarPizza" />
                  <img :src="noActiveStarPizza" />
                  <img :src="noActiveStarPizza" />
                </div>
              </div>
            </div>
            <button class="button__black">
              <span v-if="isPending">Создать</span>
              <span v-else>Идет загрузка....</span>
            </button>
          </form>
          <div class="edit__pizza_main-hints">
            <div class="edit__pizza_main-hints_child">
              <span>
                Тут вы определяете категорию вашей пиццы к которой он относится,
                пример; Пепперони => <span>Мясная</span> Овощная =>
                <span>Вегетерианская</span>
              </span>
            </div>
            <div class="edit__pizza_main-hints_child">
              <span>
                Данное поле будет влиять где появится пицца которую мы здесь
                добавляем.
              </span>
            </div>
            <div class="edit__pizza_main-hints_child">
              <span
                >Данное поле будет влиять на сортировку. Пиццы с высоким
                рейтингом отображаются в начале списка при выборе сортировки
                <span>по Популярности</span></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noActiveStarPizza from '@/assets/img/noActiveStarPizza.svg'
import activeStarPizza from '@/assets/img/activeStarPizza.svg'
import Item from '@/components/Pizza/Item.vue'
import { ref, computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  props: ['title'],
  components: { Item },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    store.commit('SELECT_PAGE', 'РедиктированиеПревью')
    const pizza = computed(() => store.state.createPizza)
    const categoryActive = ref('Мясные')
    const isPending = ref(true)
    const boolShowCategories = ref(false)
    const mapChild = ref('true')
    const ratingPizza = ref('5')
    const resPizza = ref({})
    const ratingStars = ref([])
    const categoryItems = ref([
      { id: 0, name: 'Мясные' },
      { id: 1, name: 'Вегетарианская' },
      { id: 2, name: 'Гриль' },
      { id: 3, name: 'Острые' },
      { id: 4, name: 'Закрытые' },
    ])
    const handleCategory = (title) => {
      categoryActive.value = title
    }
    const handleShowCategories = () => {
      boolShowCategories.value = !boolShowCategories.value
    }
    const handleCreatePizza = async () => {
      isPending.value = false
      const categoryIndex = ref(
        categoryItems.value.findIndex((el) => el.name === categoryActive.value)
      )
      mapChild.value = Boolean(mapChild.value)
      resPizza.value = {
        ...pizza.value,
        category: categoryIndex.value,
        rating: Number(ratingPizza.value),
      }
      setTimeout(() => {
        store.dispatch('postResPizza', resPizza.value, mapChild.value)
      }, 2000)
      setTimeout(() => {
        isPending.value = true
        store.commit('CREATE__PIZZA', {})
        store.dispatch('getPizzaAction')
        store.commit('SELECT_PAGE', 'Главная')
        router.push('/')
      }, 2100)
    }
    return {
      ratingPizza,
      ratingStars,
      noActiveStarPizza,
      activeStarPizza,
      isPending,
      handleCreatePizza,
      resPizza,
      boolShowCategories,
      handleShowCategories,
      pizza,
      categoryItems,
      categoryActive,
      handleCategory,
      mapChild,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.edit__pizza {
  position: relative;
  &_heading {
    h2 {
      font-family: 'Raleway';
      font-weight: 900;
      font-size: 48px;
      line-height: 56px;
      color: #2c2c2c;
      margin-top: 15px;
    }
    h3 {
      font-family: 'Raleway';
      font-weight: 700;
      font-size: 32px;
      line-height: 38px;
      color: #2c2c2c;
      margin-top: 15px;
    }
  }
  &_main {
    display: flex;
    margin-top: 22px;
    &-preview {
      h5 {
        font-family: 'Raleway';
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        color: rgba(44, 44, 44, 0.5);
      }
      div {
        margin-top: 15px;
      }
    }
    &-inside {
      margin-left: 200px;
      &_child {
        display: flex;
        flex-direction: column;
        margin-top: 19px;
        &:first-child {
          div {
            margin-top: 11px;
            background: #ffffff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 30px;
            outline: none;
            border: none;
            height: 50px;
            cursor: pointer;
            font-weight: bold;
            color: $orange;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              position: absolute;
              right: 593px;
              margin-top: 15px;
              background: #ffffff;
              box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
              border-radius: 10px;
              overflow: hidden;
              padding: 10px 0;
              width: 242px;
              ul {
                overflow: hidden;
                li {
                  padding: 10px 25px 12px 25px;
                  &.activeCategory,
                  &:hover {
                    background: rgba(254, 95, 30, 0.05);
                  }
                  &.activeCategory {
                    font-weight: bold;
                    color: $orange;
                  }
                }
              }
            }
          }
        }
        &:nth-child(2) {
          span {
            margin-top: 14px;
            input {
              position: relative;
              cursor: pointer;
              &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 74%;
                height: 77%;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                border: 2px solid rgba(254, 95, 30, 1);
              }

              &.active {
                &::before {
                  content: '';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 74%;
                  height: 77%;
                  border-radius: 50%;
                  transform: translate(-50%, -50%);
                  background-color: rgba(254, 95, 30, 1);
                }
              }
            }
            span {
              margin-left: 15px;
            }
          }
        }
        &:nth-child(3) {
          div {
            div {
              display: flex;
              align-items: center;
              input {
                position: relative;
                cursor: pointer;
                &::before {
                  content: '';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  transform: translate(-50%, -50%);
                  background-color: white;
                  border: 2px solid rgba(254, 95, 30, 1);
                }
                &.active {
                  &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(254, 95, 30, 1);
                    background: rgba(254, 95, 30, 1);
                  }
                }
              }
              img {
                margin-left: 7px;
              }
            }
          }
        }
        span {
          font-family: 'Raleway';
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
          color: rgba(44, 44, 44, 0.5);
        }
      }
      button {
        margin-top: 19px;
      }
    }
    &-hints {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: -91px;
      right: 128px;
      &_child {
        background: #ffffff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 30px 30px 30px 0px;
        padding: 18px 16px 17px 15px;
        max-width: 230px;
        &:first-child,
        &:nth-child(2) {
          margin-top: 72px;
        }
        &:last-child {
          margin-top: 41px;
        }
        span {
          font-family: 'Roboto';
          font-weight: 300;
          font-size: 14px;
          line-height: 16px;
          color: rgba(44, 44, 44, 0.6);
          span {
            color: #fe5f1e;
          }
        }
      }
    }
  }
}
</style>
