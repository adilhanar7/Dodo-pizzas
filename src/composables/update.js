import { firestore } from '@/firebase/config'
import { doc, updateDoc } from 'firebase/firestore'

const update = () => {
  const updateUserAdminPanel = async (collectionName, userId) => {
    const userDoc = doc(firestore, collectionName, userId)

    return await updateDoc(userDoc, {
      admin: true
    })
  }

  return {
    updateUserAdminPanel,
  }
}

export default update
