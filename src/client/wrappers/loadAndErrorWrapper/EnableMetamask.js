import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { EmptyStateCard, IconIdentity } from '@aragon/ui'

const EnableMetamask = ({ enableWallet }) => (
  <EmptyWrapper>
    <EmptyStateCard
      title="You haven't enabled your account"
      text="Get started now by creating a new account."
      icon={<IconIdentity />}
      actionText="Enable account"
      onActivate={enableWallet}
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
