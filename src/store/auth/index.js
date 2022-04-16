import useAuth from '@/composables/useAuth.js'

const auth = {
  state: {
    // currentUser: [],
  },
  mutations: {
    // CREATE_USER(state, user) {
    //   state.currentUser = user
    // },
  },
  actions: {
    async logOutUser() {
      const { logout } = useAuth()

      await logout()
    },
  },
  modules: {},
}

export default auth
