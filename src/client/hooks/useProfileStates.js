import { useContext } from 'react'
import { BoxContext } from '../wrappers/box'

const defaultValues = {
  checkingMembership: false,
  checkedMembershipSuccess: false,
  checkedMembershipError: false,
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
    error,
  } = boxes[ethereumAddress]

  return {
    checkingMembership,
    checkedMembershipSuccess,
    checkedMembershipError,
    error: error || defaultValues.error,
  }
}

export default useProfileStates
