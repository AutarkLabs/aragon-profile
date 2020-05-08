import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ButtonBase, IconEdit, IconTrash, Text, useTheme } from '@aragon/ui'
import { TileHeader } from './styled-components'
import { displayStartEndDates } from '../utils'

const WorkHistoryTile = ({
  workHistoryData,
  openModal,
  removeItem,
  viewMode,
}) => {
  const theme = useTheme()
  return (
    <SingleWorkItem>
      <Details>
        <TileHeader>{workHistoryData.workPlace}</TileHeader>
        <Text.Block size="large">
          {workHistoryData.jobTitle}
          <Text
            color={theme.contentSecondary.toString()}
            size="xsmall"
            css="margin-left: 13px"
          >
            {displayStartEndDates(workHistoryData)}
          </Text>
        </Text.Block>
        <Text.Block size="small">{workHistoryData.description}</Text.Block>
      </Details>
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
    </SingleWorkItem>
  )
}
const SingleWorkItem = styled.div`
  width: 100%;
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
    description: PropTypes.string,
    startDate: PropTypes.number,
    endDate: PropTypes.number,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  viewMode: PropTypes.bool.isRequired,
}

export default WorkHistoryTile
