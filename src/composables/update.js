import { firestore } from '@/firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { ref } from 'vue'

const update = () => {
  const updateUserAdminPanel = async (collectionName, userId) => {
    const userDoc = doc(firestore, collectionName, userId)

    return await updateDoc(userDoc, {
      admin: true,
    })
  }
  const updatePizza = async (collectionName, pizza, pizzaId) => {
    const isPending = ref(true)
    const pizzaDoc = doc(firestore, collectionName, pizzaId)
    
    isPending.value = false
    await updateDoc(pizzaDoc, {
      name: pizza.name,
      imageUrl: pizza.imageUrl,
      category: pizza.category,
      types: pizza.types,
      sizes: pizza.sizes,
      price: pizza.price,
      rating: pizza.rating,
    })
    isPending.value = true
    return isPending
  }
  return {
    updateUserAdminPanel,
    updatePizza,
  }
}

export default update
