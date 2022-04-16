import { createStore } from 'vuex'
import getCollection from '@/composables/getCollection.js'
import useDoc from '@/composables/useDoc.js'
import { v4 as uuid } from 'uuid'
import getDocument from '@/composables/getDocument.js'
import { user } from '@/composables/getUser.js'
import auth from './auth'

export default createStore({
  state: {
    pizzas: [],
    category: null,
    sortBy: {
      id: 0,
      name: 'rating',
    },
    cartItems: new Map(),
    inputText: '',
    showSideBar: false,
    currentPage: 'Главная',
    createPizza: {},
    currentUser: {},
    currentUserName: '',
    currentUserEmail: '',
    currentUserPhotoUrl: '',
    url: 'http://localhost:3000/pizzas',
  },
  getters: {
    getAddedPizzasCount(state) {
      let totalCount = 0
      const pizzas = state.cartItems.values()

      for (const pizza of pizzas) {
        totalCount += pizza.count
      }
      return totalCount
    },
    getAddedPizzasSum(state) {
      let totalSum = 0
      const pizzas = state.cartItems.values()

      for (const pizza of pizzas) {
        const pizzaTotalPrice = pizza.price * pizza.count
        totalSum += pizzaTotalPrice
      }
      return totalSum
    },
    getCartItemsPizzas(state) {
      let addedPizzas = []

      for (const pizza of state.cartItems.values()) {
        addedPizzas = [...addedPizzas, pizza]
      }
      return addedPizzas
    },
    getCartItemTotalPrice: () => (pizza) => {
      const pizzaTotalPrice = pizza.price * pizza.count

      return pizzaTotalPrice
    },
    getPizzas: (state) => (pizzas) => {
      state.pizzas = pizzas

      return pizzas
    },
  },
  mutations: {
    CLEAR_USER(state) {
      state.currentUser = {}
      state.currentUserName = ''
      state.currentUserEmail = ''
      state.currentUserPhotoUrl = ''
    },
    GET_CURRENT_USER(state, doc) {
      state.currentUser = doc
      state.currentUserName = doc.name
      state.currentUserEmail = doc.email
      state.currentUserPhotoUrl = doc.photo
    },
    CREATE__PIZZA(state, pizza) {
      state.createPizza = pizza
    },
    SELECT_PAGE(state, name) {
      state.currentPage = name
    },
    SHOW_SIDEBAR(state) {
      state.showSideBar = !state.showSideBar
    },
    SEARCH_PIZZA(state, text) {
      state.inputText = text
      state.pizzas = state.pizzas.filter((pizza) =>
        pizza.name.includes(state.inputText)
      )
    },
    GET_PIZZA(state, pizzas) {
      state.pizzas = pizzas
    },
    SET_CATEGORY(state, categoryIndex) {
      state.category = categoryIndex
    },
    SET_SORT(state, sortItem) {
      state.sortBy = { name: sortItem.sortBy, id: sortItem.id }
      switch (sortItem.sortBy) {
        case 'rating':
          return state.pizzas.sort((a, b) => a.rating - b.rating)
        case 'price':
          return state.pizzas.sort((a, b) => a.price[0] - b.price[0])
        case 'name':
          return state.pizzas.sort((a, b) => (a.name > b.name ? 1 : -1))
      }
    },
    ADD_CART(state, pizza) {
      const strigifyedPizza = JSON.stringify(pizza)
      const isPizzaAdded = state.cartItems.get(strigifyedPizza)
      if (!isPizzaAdded) {
        state.cartItems.set(strigifyedPizza, { ...pizza, count: 1 })
        return
      } else {
        const addedPizza = state.cartItems.get(strigifyedPizza)
        state.cartItems.set(strigifyedPizza, {
          ...pizza,
          count: addedPizza.count + 1,
        })
        return
      }
    },
    DELETE__CART_ITEM(state, pizza) {
      delete pizza.count
      const strigifyedPizza = JSON.stringify(pizza)
      state.cartItems.delete(strigifyedPizza)
    },
    DECREMENT_CART_ITEM(state, pizza) {
      const copyPizza = { ...pizza }
      delete copyPizza.count
      const strigifyedPizza = JSON.stringify(copyPizza)

      if (pizza.count > 1) {
        state.cartItems.set(strigifyedPizza, {
          ...pizza,
          count: pizza.count - 1,
        })
      } else {
        return
      }
    },
    INCREMENT_CART_ITEM(state, pizza) {
      const copyPizza = { ...pizza }
      delete copyPizza.count
      const strigifyedPizza = JSON.stringify(copyPizza)
      state.cartItems.set(strigifyedPizza, { ...pizza, count: pizza.count + 1 })
    },
    CLEAR_CART(state) {
      state.cartItems.clear()
    },
  },
  actions: {
    async getPizzaAction({ commit }) {
      const { documents, error } = await getCollection('pizzas')
      commit('GET_PIZZA', documents)
      // const response = await fetch(state.url)
      // const documents = await response.json()
      // commit('GET_PIZZA', documents)
    },
    async getFilteredPizzaz({ commit }, category) {
      const { documents, error } = await getCollection('pizzas')
      const resFilteredCollection = documents.value.filter((obj) => {
        return obj.category === category
      })
      // const response = await fetch(state.url + `?category=${category}`)
      // const jsonPizzas = await response.json()
      commit('SET_CATEGORY', category)
      commit('GET_PIZZA', resFilteredCollection)
    },
    async postResPizza({ state, commit }, pizza, mapChild) {
      // if (mapChild) {
      //   state.pizzas.unshift(pizza)
      // } else {
      //   state.pizzas.push(pizza)
      // }
      // console.log(state.pizzas)
      // await fetch(state.url, {
      //   method: 'POST',
      //   body: JSON.stringify(pizza),
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      // })
      const myId = uuid()
      const { addCollection } = useDoc()
      await addCollection('pizzas', pizza, true)
    },
    async getCurrentUser({ commit }) {
      const { documents } = await getDocument('users', user.value.uid)
      commit('GET_CURRENT_USER', documents.value)
    },
  },
  modules: {
    auth,
  },
})
