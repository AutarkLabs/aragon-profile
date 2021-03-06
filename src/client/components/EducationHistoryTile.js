import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button as AragonButton, Text, theme } from '@aragon/ui'
import { IconPencil, IconTrash, TileHeader } from './styled-components'
import { displayStartEndDates } from '../utils'

const EducationHistoryTile = ({
  educationHistoryData,
  openModal,
  removeItem,
  viewMode,
}) => (
  <SingleEducationItem>
    <div>
      <TileHeader>{educationHistoryData.organization}</TileHeader>
      <Text.Block size="normal" css="line-height: 1.8">
        {educationHistoryData.degree}
        {educationHistoryData.fieldOfStudy
          ? ', ' + educationHistoryData.fieldOfStudy
          : ''}
      </Text.Block>
      <Dates>{displayStartEndDates(educationHistoryData)}</Dates>
    </div>
    {!viewMode && (
      <Icons>
        <Button onClick={openModal}>
          <IconPencil width="16px" height="16px" color={theme.accent} />
        </Button>
        <Button onClick={removeItem}>
          <IconTrash width="16px" height="16px" color={theme.accent} />
        </Button>
      </Icons>
    )}
  </SingleEducationItem>
)

const SingleEducationItem = styled.div`
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
const Button = styled(AragonButton).attrs({ mode: 'text' })`
  background: rgba(255, 255, 255, 0.9);
  box-sizing: content-box;
  height: 16px;
  overflow: hidden;
  padding: 4px;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`
const Dates = styled(Text.Block).attrs({ size: 'xsmall' })`
  color: ${theme.textTertiary};
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
