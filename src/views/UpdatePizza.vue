<template>
  <div class="content">
    <div class="container">
      <div class="create-pizza">
        <div class="create-pizza__heading">
          <h2>Обновим пиццу</h2>
          <span>Выберите параметры продукта</span>
        </div>
        <div class="create-pizza__form">
          <form @submit.prevent="handleUpdatePizza">
            <!-- <Item :pizza="pizza" /> -->
            <div class="create-pizza__form_child">
              <div class="create-pizza__form-main">
                <div class="create-pizza__form-main_top">
                  <span class="create-pizza__form-main_item">
                    <label for="title">Название</label>
                    <input
                      type="text"
                      name="title"
                      v-model="pizzaName"
                      required
                    />
                  </span>
                  <span class="create-pizza__form-main_item">
                    <label for="pathtoimage">Путь к картинке</label>
                    <input
                      type="text"
                      name="pathtoimage"
                      v-model="pizzaImage"
                      required
                    />
                  </span>
                </div>
                <div class="create-pizza__form-main_middle">
                  <span class="create-pizza__form-main_item">
                    <label>Размеры</label>
                    <span>
                      <input
                        :class="{ active: selectSizes.includes('26') }"
                        type="checkbox"
                        name="size26"
                        value="26"
                        v-model="selectSizes"
                      />
                      <label for="size26">26 см</label>
                      <input
                        :class="{ active: selectSizes.includes('30') }"
                        type="checkbox"
                        name="size30"
                        value="30"
                        v-model="selectSizes"
                      />
                      <label for="size30">30 см</label>
                      <input
                        :class="{ active: selectSizes.includes('40') }"
                        type="checkbox"
                        name="size40"
                        value="40"
                        v-model="selectSizes"
                      />
                      <label for="size40">40 см</label>
                    </span>
                  </span>
                  <span class="create-pizza__form-main_item">
                    <label>Типы</label>
                    <span class="create-pizza__form-main_item-foot">
                      <span>
                        <input
                          :class="{ active: selectTypes.includes('0') }"
                          type="checkbox"
                          name="types0"
                          value="0"
                          v-model="selectTypes"
                        />
                        <label for="types0">Тонкое</label>
                      </span>
                      <span>
                        <input
                          :class="{ active: selectTypes.includes('1') }"
                          type="checkbox"
                          name="types1"
                          value="1"
                          v-model="selectTypes"
                        />
                        <label for="types1">Традиционное</label>
                      </span>
                    </span>
                  </span>
                </div>
                <div class="create-pizza__form-main_bottom">
                  <span class="create-pizza__form-main_item">
                    <label>Цены</label>
                    <span class="create-pizza__form-main_item-foot">
                      <span v-if="selectSizes.includes('26')">
                        <label>26 см</label>
                        <input
                          minlength="2"
                          maxlength="3"
                          type="text"
                          onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                          v-model="firstPrice"
                        />
                      </span>
                      <span v-if="selectSizes.includes('30')">
                        <label>30 см</label>
                        <input
                          minlength="2"
                          maxlength="3"
                          type="text"
                          onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                          v-model="secondPrice"
                        /> </span
                      ><span v-if="selectSizes.includes('40')">
                        <label>40 см</label>
                        <input
                          minlength="2"
                          maxlength="3"
                          type="text"
                          onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                          v-model="thirdPrice"
                        />
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div class="create-pizza__form-footer">
                <p>Не забудьте указать цену для разных резмеров пиццы*</p>
                <button class="button__black">
                  <span v-if="isPendingPizza">Обновить пиццу.</span>
                  <span v-else>Обновление пиццы......</span>
                </button>
              </div>
            </div>
            <div class="create-pizza__form_child">
              <div class="create-pizza__form_child-category">
                <span>Выберите категорию</span>
                <div @click.self="handleShowCategories()">
                  {{ categoryActive }}
                  <span v-if="boolShowCategories">
                    <ul>
                      <li
                        @click="handleCategory(item.name)"
                        :class="{
                          activeCategory: categoryActive === item.name,
                        }"
                        v-for="item in categoryItems"
                        :key="item.id"
                      >
                        {{ item.name }}
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
              <div class="create-pizza__form_child-star">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import update from '@/composables/update.js'
import noActiveStarPizza from '@/assets/img/noActiveStarPizza.svg'
import activeStarPizza from '@/assets/img/activeStarPizza.svg'
import Item from '@/components/Pizza/Item.vue'
import getDocument from '@/composables/getDocument.js'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
export default {
  components: { Item },
  props: ['id'],
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const pizzaImage = ref('')
    const pizzaName = ref('')
    const selectSizes = ref([])
    const selectTypes = ref([])
    const prices = ref([])
    const firstPrice = ref()
    const secondPrice = ref()
    const thirdPrice = ref()
    const ratingStars = ref([])
    const ratingPizza = ref('5')
    const categoryItems = ref([
      { id: 0, name: 'Мясные' },
      { id: 1, name: 'Вегетарианская' },
      { id: 2, name: 'Гриль' },
      { id: 3, name: 'Острые' },
      { id: 4, name: 'Закрытые' },
    ])
    const boolShowCategories = ref(false)
    const categoryActive = ref()
    const pizza = ref({})
    const isPendingPizza = ref(true)
    store.commit('SELECT_PAGE', 'ОбновлениеПиццы')
    const handleCategory = (title) => {
      categoryActive.value = title
    }
    const handleShowCategories = () => {
      boolShowCategories.value = !boolShowCategories.value
    }
    const handleUpdatePizza = async () => {
      prices.value = []
      if (selectSizes.value.includes('26')) {
        prices.value.push(firstPrice.value)
      }
      if (selectSizes.value.includes('30')) {
        prices.value.push(secondPrice.value)
      }
      if (selectSizes.value.includes('40')) {
        prices.value.push(thirdPrice.value)
      }
      const categoryIndex = ref(
        categoryItems.value.findIndex((el) => el.name === categoryActive.value)
      )
      isPendingPizza.value = false
      const { updatePizza } = update()
      const { isPending } = await updatePizza(
        'pizzas',
        {
          name: pizzaName.value,
          imageUrl: pizzaImage.value.trim(),
          category: Number(categoryIndex.value),
          types: selectTypes.value.map((item) => +item),
          sizes: selectSizes.value.map((item) => +item),
          price: prices.value.map((item) => +item),
          rating: Number(ratingPizza.value),
        },
        props.id
      )
      isPendingPizza.value = isPending
      setTimeout(async () => {
        await store.dispatch('getPizzaAction')
        await store.commit('SELECT_PAGE', 'Главная')
        await router.push('/')
      }, 600)
    }
    onMounted(async () => {
      const { documents } = await getDocument('pizzas', props.id)
      pizza.value = { ...documents.value }

      pizzaName.value = documents.value.name
      pizzaImage.value = documents.value.imageUrl
      selectSizes.value = documents.value.sizes
      selectTypes.value = documents.value.types
      firstPrice.value = documents.value.price[0]
      secondPrice.value = documents.value.price[1]
      thirdPrice.value = documents.value.price[2]
      categoryActive.value = categoryItems.value[documents.value.category].name
      ratingPizza.value = String(documents.value.rating)
      if (selectSizes.value.includes(26)) {
        prices.value.push(firstPrice.value)
      }
      if (selectSizes.value.includes(30)) {
        prices.value.push(secondPrice.value)
      }
      if (selectSizes.value.includes(40)) {
        prices.value.push(thirdPrice.value)
      }
      selectSizes.value = selectSizes.value.map((item) => {
        return String(item)
      })
      selectTypes.value = selectTypes.value.map((item) => {
        return String(item)
      })
    })

    return {
      isPendingPizza,
      noActiveStarPizza,
      activeStarPizza,
      ratingPizza,
      ratingStars,
      handleShowCategories,
      handleCategory,
      categoryItems,
      categoryActive,
      boolShowCategories,
      handleUpdatePizza,
      pizzaImage,
      prices,
      firstPrice,
      secondPrice,
      thirdPrice,
      pizzaName,
      selectTypes,
      pizza,
      selectSizes,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.create-pizza {
  &__heading {
    h2 {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 900;
      font-size: 48px;
      line-height: 56px;
      letter-spacing: 0.01em;
      color: #2c2c2c;
    }
    span {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 38px;
      letter-spacing: 0.01em;
      color: #2c2c2c;
    }
  }
  &__form {
    margin-top: 22px;
    form {
      max-width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    &-main {
      display: block;
      &_top {
        display: flex;
        justify-content: space-between;
        margin-top: 21px;
        .create-pizza__form-main_item {
          margin-left: 1px;
          display: flex;
          flex-direction: column;
          &:last-child {
            margin-left: 60px;
          }
          label {
            margin-bottom: 11px;
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            letter-spacing: 0.01em;
            color: rgba(44, 44, 44, 0.5);
          }
          input {
            background: #ffffff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 30px;
            font-family: 'Raleway';
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            color: rgba(44, 44, 44, 0.5);
            border: none;
            outline: none;
            padding: 15px 22px 16px 96px;
          }
        }
      }
      &_middle {
        display: flex;
        justify-content: space-between;
        margin-top: 21px;
        .create-pizza__form-main_item {
          display: flex;
          flex-direction: column;
          label {
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            letter-spacing: 0.01em;
            color: rgba(44, 44, 44, 0.5);
          }
          span {
            display: flex;
            margin-top: 11px;
            align-items: center;
            label,
            input {
              margin-left: 6px;
            }
            label {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 300;
              font-size: 16px;
              line-height: 19px;
              letter-spacing: 0.01em;
              color: rgba(44, 44, 44, 0.5);
            }
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
                border-radius: 25%;
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
                  border-radius: 25%;
                  transform: translate(-50%, -50%);
                  background-color: rgba(254, 95, 30, 1);
                }
              }
            }
          }
          &:nth-child(2) {
            .create-pizza__form-main_item-foot {
              display: flex;
              flex-direction: column;
            }
          }
        }
      }
      &_bottom {
        margin-top: 21px;
        .create-pizza__form-main_item {
          display: flex;
          flex-direction: column;
          label {
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            letter-spacing: 0.01em;
            color: rgba(44, 44, 44, 0.5);
          }
          .create-pizza__form-main_item-foot {
            margin-top: 11px;
            display: flex;
            flex-wrap: wrap;
            max-width: 506px;
            span {
              margin-top: 5px;
              margin-left: 20px;
              label {
                background: #2c2c2c;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
                border-radius: 100px;
                font-style: normal;
                font-weight: 300;
                font-size: 14px;
                line-height: 16px;
                letter-spacing: 0.01em;
                color: #ffffff;
                padding: 7px;
              }
              input {
                margin-left: 5px;
                background: #ffffff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                border-radius: 30px;
                font-family: 'Raleway';
                font-weight: 500;
                font-size: 18px;
                line-height: 21px;
                color: rgba(44, 44, 44, 0.5);
                border: none;
                outline: none;
                padding: 14px 20px 15px 25px;
                width: 113px;
              }
            }
          }
        }
      }
    }
    &-footer {
      margin-top: 55px;
      display: flex;
      justify-content: space-between;
      p {
        max-width: 350px;
      }
    }
    .create-pizza__form_child {
      margin-left: 100px;
      &-category {
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
            right: 500px;
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
        span {
          font-family: 'Raleway';
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
          color: rgba(44, 44, 44, 0.5);
        }
      }
      &-star {
        margin-top: 20px;
        span {
          font-family: 'Raleway';
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
          color: rgba(44, 44, 44, 0.5);
        }
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
    }
  }
}
</style>
