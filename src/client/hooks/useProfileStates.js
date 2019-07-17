import { useContext } from 'react'
import { BoxContext } from '../wrappers/box'

const defaultValues = {
  checkingMembership: false,
  checkedMembershipSuccess: false,
  checkedMembershipError: false,
  loadingPublicProf: false,
  unlockingProf: false,
  noPublicProfileFound: false,
  error: '',
}

const useProfileStates = () => {
  const { boxes, ethereumAddress } = useContext(BoxContext)
  const userLoaded = !!boxes[ethereumAddress]

  if (!userLoaded) return defaultValues

  const {
    checkingMembership,
    checkedMembershipSuccess,
    checkedMembershipError,
    loadingPublicProf,
    unlockingProf,
    noPublicProfileFound,
    error,
  } = boxes[ethereumAddress]

  return {
    checkingMembership,
    checkedMembershipSuccess,
    checkedMembershipError,
    loadingPublicProf,
    unlockingProf,
    noPublicProfileFound,
    error: error || defaultValues.error,
  }
}

export default useProfileStates
