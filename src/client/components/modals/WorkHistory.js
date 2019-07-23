import React, { useState } from 'react'
import { Field, Button } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, TwoColumnsRow, DisplayErrors } from './ModalWrapper'
import { useDate } from '../../hooks'
import { years } from '../../utils'
import DateDropdowns from '../DateDropdowns'
import {
  TextInputWithValidation,
  TextMultilineWithValidation,
} from '../styled-components'
import {
  validateWorkPlace,
  validateJobTitle,
  validateWorkDates,
  workDatesError,
} from '../../utils/validation'

const WorkHistory = ({
  getFormValue,
  onChange,
  workHistoryId,
  ethereumAddress,
  saveProfile,
  savingError,
}) => {
  const [validationErrors, setValidationErrors] = useState({})

  const validateAndSave = () => {
    const errors = {}
    if (
      !validateWorkPlace(
        getFormValue('workHistory', workHistoryId, 'workPlace')
      )
    )
      errors['workPlace'] = 'Please provide name of company or project'

    if (
      !validateJobTitle(getFormValue('workHistory', workHistoryId, 'jobTitle'))
    )
      errors['jobTitle'] = 'Please provide job title or role'

    if (!validateWorkDates(startDate, endDate))
      errors['dates'] = workDatesError(startDate, endDate)

    setValidationErrors(errors)
    if (!Object.keys(errors).length) saveProfile(ethereumAddress)
  }

  const startDate = getFormValue('workHistory', workHistoryId, 'startDate')
  const endDate = getFormValue('workHistory', workHistoryId, 'endDate')

  const {
    indexStartYear,
    indexStartMonth,
    indexEndYear,
    indexEndMonth,
    current,
    dispatchDateChange,
  } = useDate(startDate, endDate, years, onChange, 'workHistory', workHistoryId)

  return (
    <ModalWrapper title="Add Work">
      <DisplayErrors errors={{ ...validationErrors, ...savingError }} />
      <TwoColumnsRow>
        <Field label="Company or Project">
          <TextInputWithValidation
            wide
            value={getFormValue('workHistory', workHistoryId, 'workPlace')}
            onChange={e =>
              onChange(
                e.target.value,
                'workHistory',
                workHistoryId,
                'workPlace'
              )
            }
            error={validationErrors['workPlace']}
          />
        </Field>
        <Field label="Job Title or Role">
          <TextInputWithValidation
            wide
            value={getFormValue('workHistory', workHistoryId, 'jobTitle')}
            onChange={e =>
              onChange(e.target.value, 'workHistory', workHistoryId, 'jobTitle')
            }
            error={validationErrors['jobTitle']}
          />
        </Field>
      </TwoColumnsRow>

      <Field label="Description">
        <TextMultilineWithValidation
          wide
          value={getFormValue('workHistory', workHistoryId, 'description')}
          onChange={e =>
            onChange(
              e.target.value,
              'workHistory',
              workHistoryId,
              'description'
            )
          }
          error={validationErrors['description']}
        />
      </Field>

      <DateDropdowns
        current={current}
        dispatchDateChange={dispatchDateChange}
        indexStartMonth={indexStartMonth}
        indexStartYear={indexStartYear}
        indexEndMonth={indexEndMonth}
        indexEndYear={indexEndYear}
        type="workHistory"
        error={validationErrors['dates']}
      />

      <Button wide mode="strong" onClick={validateAndSave}>
        Save
      </Button>
    </ModalWrapper>
  )
}

WorkHistory.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  workHistoryId: PropTypes.string.isRequired,
  savingError: PropTypes.object,
}

export default WorkHistory
