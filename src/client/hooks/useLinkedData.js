import { useEffect, useState } from 'react'

import { format } from '../../modules/3box-LD'
import { fetchedPublicProfileError } from '../stateManagers/box'

const useLinkedData = (boxes, dispatch, ethereumAddress) => {
  const [formattedProfile, setFormattedProfile] = useState({})

  const box = boxes[ethereumAddress]
  const loadedPublicProf = box ? box.loadedPublicProfSuccess : false
  const publicProfile = loadedPublicProf ? box.publicProfile : {}

  useEffect(() => {
    try {
      if (loadedPublicProf) {
        const formattedBox = format(publicProfile)
        setFormattedProfile(formattedBox)
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.text = JSON.stringify(formattedBox)
        document.head.appendChild(script)
      }
    } catch (error) {
      dispatch(fetchedPublicProfileError(ethereumAddress, error))
    }
  }, [
    ethereumAddress,
    loadedPublicProf,
    publicProfile,
    setFormattedProfile,
    dispatch,
  ])

  return { formattedProfile }
}

export default useLinkedData
