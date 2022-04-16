import { auth } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { ref } from 'vue'

const useAuth = () => {
  const signup = async (email, password, name) => {
    const user = ref()
    const error = ref()
    let isPending = ref(true)

    isPending.value = false
    try {
      user.value = await createUserWithEmailAndPassword(auth, email, password)
      user.value.user.displayName = name

      updateProfile(user.value.user, {
        displayName: name,
      })
      console.log(user.value)
      isPending.value = true
    } catch (err) {
      isPending.value = true
      error.value =
        'Произошла ошибка проверьте данные которые вы ввели , или попробуйте совершить попытку позже.'
    }
    return { isPending }
  }
  const login = async (email, password) => {
    let error = ref('')
    let isPending = ref(true)

    isPending.value = false
    try {
      await signInWithEmailAndPassword(auth, email, password)
      isPending.value = true
    } catch (err) {
      error.value = 'Вы не правильно вели пароль или почту.'
      isPending.value = true
    }

    return { error, isPending }
  }

  const logout = async () => {
    let error

    try {
      await signOut(auth)
    } catch (err) {
      error.value = err.message
    }

    return { error }
  }

  return { signup, login, logout }
}

export default useAuth
