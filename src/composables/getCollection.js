import { ref } from 'vue'
import { firestore } from '@/firebase/config'
import { getDocs, collection, query, limit } from 'firebase/firestore'

const getCollection = async (collectionName) => {
  const documents = ref(null)
  const error = ref(null)

  try {
    const myCollection = collection(firestore, collectionName)
    
    const response = await getDocs(myCollection)
    documents.value = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  } catch (err) {
    error.value = 'Данные не получины ошибка'
  }

  return { documents, error }
}

export default getCollection
