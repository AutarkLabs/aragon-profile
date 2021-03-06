import React, { useContext, useState } from 'react'
import { Field, Text, Button, theme } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, DisplayErrors } from './ModalWrapper'
import { validateDAOAddress } from '../../utils/validation'
import { shortDAOAddress, fakeIsMember } from '../../utils'
import { BoxContext } from '../../wrappers/box'
import { ModalContext } from '../../wrappers/modal'
import { close } from '../../stateManagers/modal'
import { isEmpty } from 'lodash'
import { useProfileStates } from '../../hooks'
import {
  requestedCheckMembership,
  requestedCheckMembershipReset,
  requestedCheckMembershipSuccess,
  requestedCheckMembershipError,
} from '../../stateManagers/box'
import {
  TextInputWithValidation,
  AnimationLoadingCircle,
  IconSuccess,
  IconError,
  CheckWrapper,
} from '../../components/styled-components'

const BackToPreviousScreen = ({ ethereumAddress, dispatch }) => (
  <Text.Block
    css={`
      text-align: right;
      margin-bottom: 0px;
      text-decoration: underline;
      cursor: pointer;
      vertical-align: text-bottom;
      position: absolute;
      bottom: 0;
      right: 0;
    `}
    color={theme.accent}
    onClick={() => dispatch(requestedCheckMembershipReset(ethereumAddress))}
  >
    Back to previous screen
  </Text.Block>
)

BackToPreviousScreen.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const checkInfoIcon = {
  started: AnimationLoadingCircle,
  success: IconSuccess,
  error: IconError,
}

const checkInfoText = address => ({
  started: `Validating your membership to ${shortDAOAddress(address)}...`,
  success: `We found ${shortDAOAddress(
    address
  )} and confirmed you are a member`,
  error: `We could not verify your membership to ${shortDAOAddress(address)}`,
})

const CheckInfo = ({ type, ethereumAddress, address, dispatch, linkBack }) => {
  const Icon = checkInfoIcon[type]
  return (
    <ModalWrapper>
      <CheckWrapper>
        <Icon />
        <div
          css={`
            height: 100%;
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
          `}
        >
          <Text.Block size="xxlarge">{checkInfoText(address)[type]}</Text.Block>

          {linkBack && (
            <BackToPreviousScreen
              dispatch={dispatch}
              ethereumAddress={ethereumAddress}
            />
          )}
        </div>
      </CheckWrapper>
    </ModalWrapper>
  )
}

CheckInfo.propTypes = {
  type: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  ethereumAddress: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  linkBack: PropTypes.bool.isRequired,
}

CheckInfo.defaultProps = {
  linkBack: false,
}

const Organization = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  organizationId,
  savingError,
}) => {
  const [validationErrors, setValidationErrors] = useState({})
  const { dispatch } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)
  const {
    checkingMembership,
    checkedMembershipSuccess,
    checkedMembershipError,
    error,
  } = useProfileStates()

  const checkMembershipError = checkedMembershipError
    ? { error: `Error checking membership: ${error.message}` }
    : {}

  const checkMembershipAndSave = async (ethereumAddress, address) => {
    dispatch(requestedCheckMembership(ethereumAddress))

    try {
      const result = await fakeIsMember(ethereumAddress, address)
      if (result) {
        dispatch(requestedCheckMembershipSuccess(ethereumAddress))
        saveProfile(ethereumAddress)
        dispatchModal(close())
        dispatch(requestedCheckMembershipReset(ethereumAddress))
        return true
      } else throw new Error({ message: 'Cannot confirm membership' })
    } catch (error) {
      dispatch(requestedCheckMembershipError(ethereumAddress, error))
      return false
    }
  }

  const validateAndSave = () => {
    const errors = {}
    let address = getFormValue('organizations', organizationId, 'address')

    if (!validateDAOAddress(address))
      errors['organization'] = 'Please provide valid DAO address'

    if (isEmpty(errors)) {
      checkMembershipAndSave(ethereumAddress, address)
    } else {
      setValidationErrors(errors)
    }
  }

  const address = getFormValue('organizations', organizationId, 'address')

  const checkInfoProps = {
    address,
    ethereumAddress,
    dispatch,
  }

  if (checkingMembership)
    return <CheckInfo type="started" {...checkInfoProps} />
  else if (checkedMembershipSuccess)
    return <CheckInfo type="success" {...checkInfoProps} />
  else if (checkedMembershipError)
    return <CheckInfo type="error" linkBack {...checkInfoProps} />
  else {
    return (
      <ModalWrapper title="Add Organization">
        <DisplayErrors
          errors={{
            ...validationErrors,
            ...checkMembershipError,
            ...savingError,
          }}
        />
        <Text>
          Enter an organization ID where your logged in ethereum account is a
          member
        </Text>
        <Field>
          <TextInputWithValidation
            wide
            value={address}
            onChange={e =>
              onChange(
                e.target.value,
                'organizations',
                organizationId,
                'address'
              )
            }
            placeholder="Example: 0xb4124cEB3451635DAcedd11767f004d8a28c6eE7"
            error={validationErrors['organization']}
          />
        </Field>

        <Button wide mode="strong" onClick={validateAndSave}>
          Add to Profile
        </Button>
      </ModalWrapper>
    )
  }
}

Organization.propTypes = {
  organizationId: PropTypes.string.isRequired,
  ethereumAddress: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  savingError: PropTypes.object,
}

export default Organization
