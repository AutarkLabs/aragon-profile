import React, { useState } from 'react'
import { Button, Field, TextInput } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, DisplayErrors } from './ModalWrapper'
import {
  TextInputWithValidation,
  TextMultilineWithValidation,
} from '../styled-components'
import { validateName, validateWebsite } from '../../utils/validation'

const BasicInformation = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  savingError,
}) => {
  const [validationErrors, setValidationErrors] = useState({})

  const validateAndSave = e => {
    e.preventDefault()

    const errors = {}
    if (!validateName(getFormValue('name')))
      errors['name'] = 'Please provide valid name'

    // validate only if non-empty
    const website = getFormValue('website')
    if (!!website && !validateWebsite(website))
      errors['website'] = 'Please provide valid website address'

    setValidationErrors(errors)
    if (!Object.keys(errors).length) saveProfile(ethereumAddress)
  }

  return (
    <ModalWrapper title="Edit Basic Information">
      <form onSubmit={validateAndSave}>
        <DisplayErrors errors={{ ...validationErrors, ...savingError }} />
        <Field label="Name">
          <TextInputWithValidation
            wide
            onChange={e => onChange(e.target.value, 'name')}
            value={getFormValue('name')}
            error={validationErrors['name']}
          />
        </Field>

        <Field label="Bio">
          <TextMultilineWithValidation
            wide
            value={getFormValue('description')}
            onChange={e => onChange(e.target.value, 'description')}
          />
        </Field>

        <Field label="Location">
          <TextInput
            wide
            onChange={e => onChange(e.target.value, 'location')}
            value={getFormValue('location')}
          />
        </Field>

        <Field label="Website">
          <TextInputWithValidation
            wide
            value={getFormValue('website')}
            onChange={e => onChange(e.target.value, 'website')}
            placeholder="Enter a website starting with https://"
            type="url"
            error={validationErrors['website']}
          />
        </Field>

        <Button mode="strong" wide type="submit">
          Save
        </Button>
      </form>
    </ModalWrapper>
  )
}

BasicInformation.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  savingError: PropTypes.object,
}

export default BasicInformation
