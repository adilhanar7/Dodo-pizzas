import { firestore } from '../firebase/config'
import { setDoc, doc } from '@firebase/firestore'
import { v4 as uuid } from 'uuid'

const addCollection = async (collectionName, newDoc, createId = true, myId) => {
  const id = uuid()
  const docRef = doc(firestore, collectionName, createId ? id : myId)

  try {
    await setDoc(docRef, newDoc)
  } catch (err) {
    console.log(err.message)
  }
}

export default addCollection


