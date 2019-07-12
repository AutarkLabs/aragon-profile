import { useEffect, useState, useReducer } from 'react'

import { format } from '../../modules/3box-LD'
import {
  boxReducer,
  initialState,
  fetchedPublicProfileError,
} from '../stateManagers/box'

const useLinkedData = xboxes => {
  // const { connectedAccount } = useAragonApi()
  const connectedAccount = ''
  const [formattedProfile, setFormattedProfile] = useState({})

  const [boxes, dispatch] = useReducer(boxReducer, initialState)
  const box = boxes[connectedAccount]
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
      console.error('useLinkedData', error)
      dispatch(fetchedPublicProfileError(connectedAccount, error))
    }
  }, [loadedPublicProf, publicProfile, setFormattedProfile])

  return { formattedProfile }
}

export default useLinkedData
