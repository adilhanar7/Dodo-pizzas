import { firestore } from '@/firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

const useDoc = () => {
  const generatorId = uuid()

  const addCollection = async (
    collectionName,
    newDoc,
    createId = true,
    myId
  ) => {
    const docRef = doc(firestore, collectionName, createId ? generatorId : myId)

    try {
      await setDoc(docRef, newDoc)
    } catch (err) {
      console.log(err.message)
    }
  }

  return { addCollection }
}

export default useDoc
