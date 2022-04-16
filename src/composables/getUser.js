import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export const user = ref()

onAuthStateChanged(auth, (_user) => {
  console.log(_user)
  user.value = _user
})
