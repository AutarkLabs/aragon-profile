import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Checkbox, Field } from '@aragon/ui'
import { DropDownWithValidation } from './styled-components'
import { years, months } from '../utils'

// copied from aragonUI Field
const Label = styled.label`
  text-transform: lowercase;
  font-variant: small-caps;
  color: #707070;
`

const DateDropdowns = ({
  current,
  dispatchDateChange,
  indexStartMonth,
  indexStartYear,
  indexEndMonth,
  indexEndYear,
  type,
  error,
}) => (
  <Fragment>
    <Field label="Start Date">
      <DateDropDowns>
        <div css="width: 48%;">
          <DropDownWithValidation
            wide
            items={months}
            active={indexStartMonth}
            onChange={index =>
              dispatchDateChange({ type: 'setIndexStartMonth', index })
            }
            error={error}
          />
        </div>
        <div css="width: 48%;">
          <DropDownWithValidation
            wide
            items={years}
            active={indexStartYear}
            onChange={index =>
              dispatchDateChange({ type: 'setIndexStartYear', index })
            }
            error={error}
          />
        </div>
      </DateDropDowns>
    </Field>

    <Label>End Date</Label>
    <div css="display: flex; height: 40px; margin-bottom: 20px;">
      {!current && (
        <DateDropDowns>
          <div css="width: 48%;">
            <DropDownWithValidation
              wide
              items={months}
              active={indexEndMonth}
              onChange={index =>
                dispatchDateChange({ type: 'setIndexEndMonth', index })
              }
              error={error}
            />
          </div>
          <div css="width: 48%;">
            <DropDownWithValidation
              wide
              items={years}
              active={indexEndYear}
              onChange={index =>
                dispatchDateChange({ type: 'setIndexEndYear', index })
              }
              error={error}
            />
          </div>
        </DateDropDowns>
      )}
      <label css="display: flex; align-items: center;">
        <Checkbox
          checked={current}
          onChange={index => dispatchDateChange({ type: 'setCurrent', index })}
        />
        {type === 'workHistory'
          ? 'I currently work here'
          : 'I currently study here'}
      </label>
    </div>
  </Fragment>
)

const DateDropDowns = styled.div`
  width: 60%;
  padding-right: 13px;
  display: flex;
  justify-content: space-between;
`

DateDropdowns.propTypes = {
  current: PropTypes.bool.isRequired,
  dispatchDateChange: PropTypes.func.isRequired,
  indexStartMonth: PropTypes.number.isRequired,
  indexStartYear: PropTypes.number.isRequired,
  indexEndMonth: PropTypes.number.isRequired,
  indexEndYear: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
}

DateDropdowns.defaultProps = {
  error: '',
}

export default DateDropdowns
