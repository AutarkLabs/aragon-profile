import React, { useContext, useState } from 'react'
import { Field, Text, Button, theme } from '@aragon/ui'
import { ensResolve } from '@aragon/wrapper'
import PropTypes from 'prop-types'
import { ModalWrapper, DisplayErrors } from './ModalWrapper'
import { validateDAOAddress } from '../../utils/validation'
import { BoxContext } from '../../wrappers/box'
import { ModalContext } from '../../wrappers/modal'
import { close } from '../../stateManagers/modal'
import { isEmpty } from 'lodash'
import styled from 'styled-components'
import {
  requestedCheckMembership,
  requestedCheckMembershipClean,
  requestedCheckMembershipSuccess,
  requestedCheckMembershipError,
} from '../../stateManagers/box'
import {
  TextInputWithValidation,
  AnimationLoadingCircle,
  AddOrganizationSuccess,
  AddOrganizationError,
} from '../../components/styled-components'

const Organization = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  organizationId,
  savingError,
}) => {
  const [validationErrors, setValidationErrors] = useState({})
  const { boxes, dispatch } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)

  let {
    checkingMembership,
    checkedMembershipSuccess,
    checkedMembershipError,
    error,
  } = boxes[ethereumAddress]

  const checkMembershipError = boxes[ethereumAddress].checkedMembershipError
    ? { error: `Error checking membership: ${error.message}` }
    : {}

  const resolveEnsDomain = async (domain, opts) => {
    try {
      return await ensResolve(domain, opts)
    } catch (err) {
      if (err.message === 'ENS name not defined.') {
        return ''
      }
      throw err
    }
  }

  const fakeIsMember = async (ethereumAddress, address) => {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(Math.random() >= 0.5), 5000)
    })
    return promise
  }

  const checkMembershipAndSave = (ethereumAddress, address) => {
    dispatch(requestedCheckMembership(ethereumAddress))

    fakeIsMember(ethereumAddress, address)
      .then(result => {
        if (result) {
          dispatch(requestedCheckMembershipSuccess(ethereumAddress))
          saveProfile(ethereumAddress)
          //dispatchModal(close())
          //dispatch(requestedCheckMembershipClean(ethereumAddress))
          return true
        } else {
          throw new Error("I'm sorry Dave")
        }
      })
      .catch(err => {
        dispatch(
          requestedCheckMembershipError(ethereumAddress, {
            message: err,
          })
        )
      })
  }

  const validateAndSave = () => {
    const errors = {}
    let address = getFormValue('organizations', organizationId, 'address')

    if (address.endsWith('.eth')) {
      console.log(resolveEnsDomain(address))
    } else if (!validateDAOAddress(address))
      errors['organization'] = 'Please provide valid DAO address'

    if (isEmpty(errors)) {
      checkMembershipAndSave(ethereumAddress, address)
    } else {
      setValidationErrors(errors)
    }
  }

  const CheckWrapper = styled.div`
    height: 146px;
    display: flex;
    align-items: center;
    padding-bottom: 13px;
    > :first-child {
      margin-left: 10px;
      margin-right: 30px;
    }
  `

  const CheckStarted = () => (
    <ModalWrapper>
      <CheckWrapper>
        <AnimationLoadingCircle />
        <Text size="xxlarge">
          Validating your membership to{' '}
          {getFormValue('organizations', organizationId, 'address')}...
        </Text>
      </CheckWrapper>
    </ModalWrapper>
  )

  const CheckSuccess = address => (
    <ModalWrapper>
      <CheckWrapper>
        <AddOrganizationSuccess />
        <Text size="xxlarge">
          We found {getFormValue('organizations', organizationId, 'address')}{' '}
          and confirmed you are a member
        </Text>
      </CheckWrapper>
    </ModalWrapper>
  )

  const CheckError = () => (
    <ModalWrapper>
      <CheckWrapper>
        <AddOrganizationError />
        <div
          css={`
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
          `}
        >
          <Text.Block size="xxlarge">
            We could not verify your membership to{' '}
            {getFormValue('organizations', organizationId, 'address')}
          </Text.Block>

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
            onClick={() =>
              dispatch(requestedCheckMembershipClean(ethereumAddress))
            }
          >
            Back to previous screen
          </Text.Block>
        </div>
      </CheckWrapper>
    </ModalWrapper>
  )

  if (
    checkingMembership ||
    checkedMembershipSuccess ||
    checkedMembershipError
  ) {
    return (
      <React.Fragment>
        {checkingMembership && <CheckStarted />}
        {checkedMembershipSuccess && <CheckSuccess />}
        {checkedMembershipError && <CheckError />}
      </React.Fragment>
    )
  } else {
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
            value={getFormValue('organizations', organizationId, 'address')}
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
