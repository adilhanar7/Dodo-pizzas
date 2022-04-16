<template>
  <form @submit.prevent="handleSubmit">
    <span>
      <label for="email">Эл. почта</label>
      <input
        type="email"
        required
        name="email"
        placeholder="Введите вашу почту"
        v-model="email"
      />
    </span>
    <span>
      <label for="password">Пароль</label>
      <input
        type="password"
        required
        name="password"
        placeholder="Введите ваш пароль"
        v-model="password"
      />
    </span>
    <span
      style="color: red !important"
      v-if="errorLogin !== '' && password.length >= 4 && email.length >= 4"
      >{{ errorLogin }}</span
    >
    <div>
      <button v-if="isPendingLogin" class="button">Войти</button>
      <button v-else class="button">Идет загрузка...</button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth.js'
export default {
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errorLogin = ref('')
    const isPendingLogin = ref(true)
    const handleSubmit = async () => {
      email.value = email.value.trim()
      password.value = password.value.trim()
      const { login } = useAuth()
      isPendingLogin.value = isPending
      const { error, isPending } = await login(email.value, password.value)
      errorLogin.value = error
      isPendingLogin.value = isPending

      setTimeout(async () => {
        await store.dispatch('getCurrentUser')
        await router.push('/')
      }, 2300)
    }
    return { errorLogin, isPendingLogin, email, password, handleSubmit }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';
form {
  display: flex;
  flex-direction: column;
  span {
    display: flex;
    flex-direction: column;

    label {
      display: block;
      margin: 20px 0 10px;
    }
    input {
      width: 100%;
      padding: 10px;
      border-radius: 20px;
      border: 1px solid #eee;
      outline: none;
      color: #999;
      margin: 10px auto;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
