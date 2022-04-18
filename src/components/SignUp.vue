<template>
  <form @submit.prevent="handleSubmit">
    <span>
      <label for="name">Имя</label>
      <input
        type="text"
        name="name"
        required
        placeholder="Введите ваше имя"
        v-model="name"
      />
    </span>
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
      v-if="
        errorSignUp !== '' &&
        password.length >= 4 &&
        email.length >= 4 &&
        name.length >= 3
      "
      >{{ errorSignUp }}</span
    >
    <div>
      <button class="button" v-if="isPendingSignUp">Создать Аккаунт</button>
      <button class="button" v-else>Идет загрузка....</button>
    </div>
  </form>
</template>

<script>
import useAuth from '@/composables/useAuth.js'
import { user } from '@/composables/getUser.js'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import useDoc from '@/composables/useDoc'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const { addCollection } = useDoc()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const errorSignUp = ref('')
    const isPendingSignUp = ref(true)
    const handleSubmit = async () => {
      name.value = name.value.trim()
      email.value = email.value.trim()
      password.value = password.value.trim()
      const { signup } = useAuth()
      isPendingSignUp.value = false
      const { error, isPending } = await signup(
        email.value,
        password.value,
        name.value
      )
      errorSignUp.value = error
      isPendingSignUp.value = isPending

      setTimeout(async () => {
        await addCollection(
          'users',
          {
            name: name.value,
            email: email.value,
            admin: false,
            photo:
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
          },
          false,
          user.value.uid
        )
      }, 5000)
      setTimeout(async () => {
        await store.dispatch('getCurrentUser')
        await router.push('/')
      }, 5200)
    }
    return {
      isPendingSignUp,
      errorSignUp,
      user,
      name,
      email,
      password,
      handleSubmit,
    }
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
