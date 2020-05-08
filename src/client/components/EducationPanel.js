import React, { useContext } from 'react'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'
import { useProfile } from '../hooks'
import { ModalContext } from '../wrappers/modal'
import EducationHistoryTile from './EducationHistoryTile'
import { open, removeItem } from '../stateManagers/modal'
import { Text } from '@aragon/ui'
import styled from 'styled-components'
import { LinkButton } from './styled-components'
import { sortHistory } from '../utils'

const EducationPanel = () => {
  const { educationHistory, viewMode } = useProfile()
  const { dispatchModal } = useContext(ModalContext)

  const historyPresent = Object.keys(educationHistory).length > 0

  if (!historyPresent && viewMode) return null

  const cardProps = {
    title: 'Education',
    addMore: historyPresent
      ? () => dispatchModal(open('educationHistory'))
      : null,
    addSeparators: true,
    viewMode,
  }

  return (
    <CardWrapper {...cardProps}>
      {historyPresent ? (
        sortHistory(educationHistory).map(item => (
          <EducationHistoryTile
            key={item.id}
            educationHistoryData={item}
            openModal={() => dispatchModal(open('educationHistory', item.id))}
            removeItem={() =>
              dispatchModal(removeItem(item.id, 'educationHistory'))
            }
            viewMode={viewMode}
          />
        ))
      ) : (
        <Center>
          <Text size="normal">No education added</Text>
          <LinkButton
            onClick={() => dispatchModal(open('educationHistory'))}
            size="small"
          >
            Add education
          </LinkButton>
        </Center>
      )}
    </CardWrapper>
  )
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90px;
`

export default EducationPanel
