import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'
import { useProfile } from '../hooks'
import { ModalContext } from '../wrappers/modal'
import WorkHistoryTile from './WorkHistoryTile'
import { open, removeItem } from '../stateManagers/modal'
import { Text } from '@aragon/ui'
import styled from 'styled-components'
import { LinkButton } from './styled-components'
import { sortHistory } from '../utils'

const WorkHistoryPanel = ({ className }) => {
  const { workHistory, viewMode } = useProfile()
  const { dispatchModal } = useContext(ModalContext)

  const historyPresent = Object.keys(workHistory).length > 0

  if (!historyPresent && viewMode) return null

  const cardProps = {
    title: 'Work history',
    addMore: historyPresent ? () => dispatchModal(open('workHistory')) : null,
    addSeparators: true,
    className,
    viewMode,
  }

  return (
    <CardWrapper {...cardProps}>
      {historyPresent ? (
        sortHistory(workHistory).map(item => (
          <WorkHistoryTile
            key={item.id}
            workHistoryData={item}
            openModal={() => dispatchModal(open('workHistory', item.id))}
            removeItem={() => dispatchModal(removeItem(item.id, 'workHistory'))}
            viewMode={viewMode}
          />
        ))
      ) : (
        <Center>
          <Text size="normal">No work history added</Text>
          <LinkButton
            onClick={() => dispatchModal(open('workHistory'))}
            size="small"
          >
            Add work
          </LinkButton>
        </Center>
      )}
    </CardWrapper>
  )
}

WorkHistoryPanel.propTypes = {
  className: PropTypes.string,
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90px;
`

export default WorkHistoryPanel
