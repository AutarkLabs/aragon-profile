import React, { useContext } from 'react'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'
import { useProfile } from '../hooks'
import { ModalContext } from '../wrappers/modal'
import OrganizationTile from './OrganizationTile'
import { open, removeItem } from '../stateManagers/modal'
import { Text, theme } from '@aragon/ui'
import styled from 'styled-components'

const OrganizationPanel = () => {
  const { organizations, viewMode } = useProfile()
  const { dispatchModal } = useContext(ModalContext)

  const organizationsNotEmpty = Object.keys(organizations).length > 0

  const cardProps = {
    title: 'Organizations',
    addMore: organizationsNotEmpty
      ? () => dispatchModal(open('organization'))
      : null,
    addSeparators: true,
    viewMode,
  }

  return (
    <CardWrapper {...cardProps}>
      {organizationsNotEmpty ? (
        Object.keys(organizations).map(id => (
          <OrganizationTile
            key={id}
            organizationData={organizations[id]}
            removeItem={() => dispatchModal(removeItem(id, 'organization'))}
          />
        ))
      ) : (
        <Center>
          <Text size="xlarge">You have no organizations</Text>
          {!viewMode && (
            <Text
              css={`
                cursor: pointer;
              `}
              size="small"
              color={theme.accent}
              onClick={() => dispatchModal(open('organization'))}
            >
              Add organisation
            </Text>
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

export default OrganizationPanel
