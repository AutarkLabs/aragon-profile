import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@aragon/ui'

import { ModalWrapper } from './ModalWrapper'
import {
  CheckWrapper,
  IconSuccess,
  IconError,
  AnimationLoadingCircle,
} from '../styled-components'

const calculateText = (
  savingProfile,
  savedProfileSuccess,
  savedProfileError
) => {
  if (savingProfile) return 'Updating your profile...'
  else if (savedProfileSuccess) return 'Your profile has been updated!'
  else if (savedProfileError) return 'Your profile could not be updated.'
  return 'Oops, something went wrong on our end. Please try again.'
}

const calculateIcon = (
  savingProfile,
  savedProfileSuccess,
  savedProfileError
) => {
  if (savingProfile) return AnimationLoadingCircle
  else if (savedProfileSuccess) return IconSuccess
  else if (savedProfileError) return IconError
  return IconError
}

const AfterSave = ({
  savingProfile,
  savedProfileSuccess,
  savedProfileError,
}) => {
  const Icon = calculateIcon(
    savingProfile,
    savedProfileSuccess,
    savedProfileError
  )
  return (
    <ModalWrapper>
      <CheckWrapper>
        <Icon />
        <Text size="xxlarge">
          {calculateText(savingProfile, savedProfileSuccess, savedProfileError)}
        </Text>
      </CheckWrapper>
    </ModalWrapper>
  )
}

AfterSave.propTypes = {
  savingProfile: PropTypes.bool,
  savedProfileSuccess: PropTypes.bool,
  savedProfileError: PropTypes.bool,
}

AfterSave.defaultProps = {
  savingProfile: false,
  savedProfileSuccess: false,
  savedProfileError: false,
}

export default AfterSave
