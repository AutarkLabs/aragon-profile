import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ButtonBase, IconEdit, IconTrash, Text, useTheme } from '@aragon/ui'
import { TileHeader } from './styled-components'
import { displayStartEndDates } from '../utils'

const EducationHistoryTile = ({
  educationHistoryData,
  openModal,
  removeItem,
  viewMode,
}) => {
  const theme = useTheme()
  return (
    <SingleEducationItem>
      <div>
        <TileHeader>{educationHistoryData.organization}</TileHeader>
        <Text.Block size="normal" css="line-height: 1.8">
          {educationHistoryData.degree}
          {educationHistoryData.fieldOfStudy
            ? ', ' + educationHistoryData.fieldOfStudy
            : ''}
        </Text.Block>
        <Dates theme={theme}>
          {displayStartEndDates(educationHistoryData)}
        </Dates>
      </div>
      {!viewMode && (
        <Icons
          css={`
            color: ${theme.accent};
          `}
        >
          <ButtonBase width="16px" onClick={openModal}>
            <IconEdit />
          </ButtonBase>
          <ButtonBase width="16px" onClick={removeItem}>
            <IconTrash />
          </ButtonBase>
        </Icons>
      )}
    </SingleEducationItem>
  )
}

const SingleEducationItem = styled.div`
  width: 100%;
  position: relative;
`
const Icons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -4px;
  right: -4px;
  visibility: hidden;
  ${SingleEducationItem}:hover & {
    visibility: visible;
  }
`

const Dates = styled(Text.Block).attrs({ size: 'xsmall' })`
  color: ${({ theme }) => theme.contentSecondary};
  margin-top: 2px;
`

EducationHistoryTile.propTypes = {
  educationHistoryData: PropTypes.shape({
    degree: PropTypes.string,
    organization: PropTypes.string.isRequired,
    fieldOfStudy: PropTypes.string,
    startDate: PropTypes.number,
    endDate: PropTypes.number,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  viewMode: PropTypes.bool.isRequired,
}

export default EducationHistoryTile
