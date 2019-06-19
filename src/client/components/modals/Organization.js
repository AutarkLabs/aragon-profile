import React, { useState } from 'react'
import { Field, Text, Button } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, DisplayErrors } from './ModalWrapper'
import { TextInputWithValidation } from '../styled-components'
import { validateDAOAddress } from '../../utils/validation'

const Organization = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  organizationId,
  savingError,
}) => {
  const [validationErrors, setValidationErrors] = useState({})

  const validateAndSave = () => {
    const errors = {}
    if (
      !validateDAOAddress(
        getFormValue('organizations', organizationId, 'address')
      )
    )
      errors['organization'] = 'Please provide valid DAO address'

    setValidationErrors(errors)
    if (!Object.keys(errors).length) saveProfile(ethereumAddress)
  }

  return (
    <ModalWrapper title="Add Organization">
      <DisplayErrors errors={{ ...validationErrors, ...savingError }} />
      <Text>
        Enter an organization ID where your logged in ethereum account is a
        member
      </Text>
      <Field>
        <TextInputWithValidation
          wide
          value={getFormValue('organizations', organizationId, 'address')}
          onChange={e =>
            onChange(e.target.value, 'organizations', organizationId, 'address')
          }
          placeholder="Example: governance.aragonid.eth"
          error={validationErrors['organization']}
        />
      </Field>

      <Button wide mode="strong" onClick={validateAndSave}>
        Add to Profile
      </Button>
    </ModalWrapper>
  )
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
