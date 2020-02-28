import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, EmptyStateCard, IconIdentity, Text } from '@aragon/ui'

const EnableMetamask = ({ enableWallet }) => (
  <EmptyWrapper>
    <EmptyStateCard
      text={<Text>Get started now by creating a new account.</Text>}
      illustration={<IconIdentity size="large" />}
      action={
        <Button wide onClick={enableWallet}>
          Enable wallet
        </Button>
      }
    />
  </EmptyWrapper>
)

EnableMetamask.propTypes = {
  enableWallet: PropTypes.func.isRequired,
}

const EmptyWrapper = styled.div`
  margin-top: 50px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default EnableMetamask
