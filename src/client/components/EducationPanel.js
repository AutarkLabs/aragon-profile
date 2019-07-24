import React, { useContext } from 'react'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'
import { useProfile } from '../hooks'
import { ModalContext } from '../wrappers/modal'
import EducationHistoryTile from './EducationHistoryTile'
import { open, removeItem } from '../stateManagers/modal'
import { Text } from '@aragon/ui'
import styled from 'styled-components'
import { Link } from './styled-components'

const EducationPanel = () => {
  const { educationHistory, viewMode } = useProfile()
  const { dispatchModal } = useContext(ModalContext)

  const historyNotEmpty = Object.keys(educationHistory).length > 0

  const cardProps = {
    title: 'Education',
    addMore: historyNotEmpty
      ? () => dispatchModal(open('educationHistory'))
      : null,
    addSeparators: true,
    viewMode,
  }

  return (
    <CardWrapper {...cardProps}>
      {historyNotEmpty ? (
        Object.keys(educationHistory)
          .map(id => ({ id, ...educationHistory[id] }))
          .sort((a, b) => (!a.endDate ? -1 : a.endDate > b.endDate ? -1 : 1))
          .map(item => (
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
          {!viewMode && (
            <Link.Button
              onClick={() => dispatchModal(open('educationHistory'))}
              size="small"
            >
              Add education
            </Link.Button>
          )}
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
