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

const messages = {
  savingProfile: 'Updating your profile...',
  savedProfileSuccess: 'Your profile has been updated!',
  savedProfileError: 'Your profile could not be updated.',
}

const icons = {
  savingProfile: AnimationLoadingCircle,
  savedProfileSuccess: IconSuccess,
  savedProfileError: IconError,
}

const AfterSave = ({ state }) => {
  const Icon = icons[state] || IconError
  return (
    <ModalWrapper>
      <CheckWrapper>
        <Icon />
        <Text size="xxlarge">
          {messages[state] ||
            'Oops, something went wrong on our end. Please try again.'}
        </Text>
      </CheckWrapper>
    </ModalWrapper>
  )
}

AfterSave.propTypes = {
  state: PropTypes.string,
}

export default AfterSave
