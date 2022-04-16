<template>
  <div class="auth">
    <div class="container">
      <!-- <router-link :to="{ name: 'SignUp' }">Регистрация</router-link>
      <router-link :to="{ path: '/auth/login' }">Авторизация</router-link>   -->
      <div class="auth__inside">
        <div v-if="showForm">
          <h2>Регистрация</h2>
          <SignUp />
          <p>
            Уже есть аккаунт?
            <button @click="handleVariable('SignIn')">Войти</button>
          </p>
        </div>
        <div v-else>
          <h2>Авторизация</h2>
          <Login />
          <p>
            До сих пор нет аккаунта?
            <button @click="handleVariable('SignUp')">Создать аккаунт</button>
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="load"></div> -->
</template>

<script>
import { user } from '@/composables/getUser.js'
import Login from '../../components/Login.vue'
import { ref, computed } from '@vue/reactivity'
import SignUp from '../../components/SignUp.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  props: ['variable'],
  components: { Login, SignUp },
  setup() {
    const store = useStore()
    const router = useRouter()
    const userLocal = computed(() => store.state.currentUser)
    store.commit('SELECT_PAGE', 'Авторизация')
    const showForm = ref(true)
    const varAuth = ref('SignUp')

    const handleVariable = (text) => {
      showForm.value = !showForm.value
      varAuth.value = text
    }
    setTimeout(() => {
      console.log(userLocal)
      if (user.value !== null) {
        router.push('/')
        store.commit('SELECT_PAGE', 'Главная')
      }
      if (user.value === null) {
        return
      }
    }, 1000)
    return { user, userLocal, showForm, handleVariable }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';
.auth {
  .container {
    .auth__inside {
      width: 300px;
      margin: 20px auto;
      div {
        p,
        h2 {
          text-align: center;
        }
        button {
          cursor: pointer;
          padding: 10px;
          margin: 20px auto;
          border: 2px solid white;
          border-radius: 12px;
          background-color: $orange;
          color: white;
          transition: 0.5s;
          &:hover {
            background-color: darken($orange, 8%);
          }
        }
      }
    }
  }
}
</style>
