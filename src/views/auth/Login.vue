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
    <div>
      <button v-if="isPendingUser" class="button">Войти</button>
      <button v-else>Идет загрузка....</button>
    </div>
  </form>
</template>

<script>
import useAuth from '@/composables/useAuth.js'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const isPendingUser = ref(true)
    const handleSubmit = async () => {
      const { login } = useAuth()
      isPendingUser.value = false
      const { isPending } = await login(email.value, password.value)
      isPendingUser.value = isPending
      setTimeout(async () => {
        await store.dispatch('getCurrentUser')
        await router.push('/')
      }, 500)
    }
    return { isPendingUser, email, password, handleSubmit }
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
