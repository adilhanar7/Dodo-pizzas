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
    <div>
      <button v-if="isPendingUser" class="button">Создать Аккаунт</button>
      <button v-else>Идет загрузка....</button>
    </div>
  </form>
</template>

<script>
import { user } from '@composables/getUser.js'
import { ref, computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import useDoc from '@/composables/useDoc'
import { useStore } from 'vuex'
export default {
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const { addCollection } = useDoc()
    const name = ref('')
    const email = ref('')
    const isPendingUser = ref(true)
    const handleSubmit = async () => {
      await store.dispatch('createUser', {
        email: email.value,
        password: password.value,
        name: name.value,
      })
     setTimeout(async () => {
      isPendingUser.value = false
      const { isPending } = await addCollection(
        'users',
        {
          name: name.value,
          email: email.value,
          photo:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
        },
        false,
        user.uid
      )
      isPendingUser.value = isPending
      await store.dispatch('getCurrentUser')
      await router.push('/')
     },7000)
    }
    return { isPendingUser, name, email, password, handleSubmit }
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
