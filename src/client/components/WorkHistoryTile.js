import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Text, theme } from '@aragon/ui'
import { IconPencil, IconTrash } from './styled-components'
import { displayStartEndDates } from '../utils'

const WorkHistoryTile = ({
  workHistoryData,
  openModal,
  removeItem,
  viewMode,
}) => (
  <SingleWorkItem>
    <Details>
      <Text.Block
        size="large"
        css={`
          font-weight: 700;
        `}
      >
        {workHistoryData.workPlace}
      </Text.Block>
      <Text.Block
        size="normal"
        css={`
          font-weight: 600;
        `}
      >
        {workHistoryData.jobTitle}
        <Text
          size="xsmall"
          color={theme.textTertiary}
          css={`
            margin-left: 13px;
          `}
        >
          {displayStartEndDates(workHistoryData)}
        </Text>
      </Text.Block>
      <Text.Block size="normal">{workHistoryData.description}</Text.Block>
    </Details>
    {!viewMode && (
      <Icons>
        <IconPencil color={theme.accent} width="16px" onClick={openModal} />
        <IconTrash color={theme.accent} width="16px" onClick={removeItem} />
      </Icons>
    )}
  </SingleWorkItem>
)

const SingleWorkItem = styled.div`
  display: flex;
  > :not(:last-child) {
    margin-bottom: 5px;
  }
`
const Icons = styled.div`
  display: inline-flex;
  width: auto;
  flex-direction: column;
  visibility: hidden;
  > * {
    margin: 0 0 8px 8px;
    cursor: pointer;
  }
  ${SingleWorkItem}:hover & {
    visibility: visible;
  }
}
`
const Details = styled.div`
  width: 100%;
  > :not(:last-child) {
    margin-bottom: 6px;
  }
`

WorkHistoryTile.propTypes = {
  workHistoryData: PropTypes.shape({
    workPlace: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.number,
    endDate: PropTypes.number,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  viewMode: PropTypes.bool,
}

WorkHistoryTile.defaultProps = {
  viewMode: true,
}

export default WorkHistoryTile
