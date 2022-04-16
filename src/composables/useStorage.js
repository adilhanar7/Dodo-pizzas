import { storage } from '@/firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const useStorage = () => {
  const uploadImageAndGetImageUrl = async (moreInfoId, file) => {
    const imageRef = ref(storage, `images/${moreInfoId}/${file.name}`)
    await uploadBytesResumable(imageRef, file)
    return await getDownloadURL(imageRef)
  }

  return { uploadImageAndGetImageUrl }
}

export default useStorage
