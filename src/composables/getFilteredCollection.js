import { ref } from 'vue'
import { firestore } from '@/firebase/config'
import { getDocs, collection, query, where } from 'firebase/firestore'

const getFilteredCollection = async (collectionName, array, filters) => {
  const documents = ref(null)
  const error = ref(null)

  try {
    const myCollection = collection(firestore, collectionName)

    // const dataColl = query(
    //   myCollection,
    //   where(array, 'array-contains', filters)
    // )
    // const response = await getDocs(dataColl)

    documents.value = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  } catch (err) {
    error.value = 'Данные не получины ошибка'
  }

  return { documents, error }
}

export default getFilteredCollection
