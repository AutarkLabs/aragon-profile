import { useReducer, useEffect } from 'react'

import { Profile } from '../../modules/3box-aragon'
import {
  fetchingProfile,
  fetchedPublicProfile,
  boxReducer,
  initialState,
  fetchedPublicProfileError,
  requestedProfileUnlock,
  profileUnlockSuccess,
  profileUnlockFailure,
  noPublicProfileFound,
} from '../stateManagers/box'

const use3Box = (account, onSignatures, web3Provider) => {
  const [boxes, dispatch] = useReducer(boxReducer, initialState)

  useEffect(() => {
    const unlockIfLoggedIn = async profile => {
      const isLoggedIn = await profile.isLoggedIn()

      if (isLoggedIn) {
        dispatch(requestedProfileUnlock(account))
        try {
          await profile.unlockAndSync()
          dispatch(profileUnlockSuccess(account, profile))
        } catch (error) {
          dispatch(profileUnlockFailure(account, error))
        }
      }
    }

    const getBox = async () => {
      if (account && onSignatures) {
        dispatch(fetchingProfile(account))
        try {
          const profile = new Profile(account, onSignatures, web3Provider)
          const publicProfile = await profile.getPublic()
          if (Object.keys(publicProfile).length > 0) {
            dispatch(fetchedPublicProfile(account, publicProfile))
          } else {
            dispatch(noPublicProfileFound(account))
          }
          unlockIfLoggedIn(profile)
        } catch (error) {
          dispatch(fetchedPublicProfileError(account, error))
        }
      }
    }

    getBox()
  }, [account, onSignatures, web3Provider])

  return { boxes, dispatch }
}

export default use3Box
