import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// import { EthereumAddressType } from '../../../prop-types'
import { BoxWrapper } from './wrappers/box'
import LoadAndErrorWrapper from './wrappers/loadAndErrorWrapper'
import Profile from './components/Profile'
import { ModalWrapper } from './wrappers/modal'
import { DragWrapper } from './wrappers/drag'
import { determineAddress, isViewMode } from './utils'

const App = ({
  account,
  appWidth,
  enableWallet,
  onSignatures,
  parts,
  web3Provider,
}) => (
  <BoxWrapper
    isViewMode={isViewMode(account, parts)}
    ethereumAddress={determineAddress(account, parts)}
    onSignatures={onSignatures}
    web3Provider={web3Provider}
  >
    <ModalWrapper
      ethereumAddress={determineAddress(account, parts)}
      onSignatures={onSignatures}
    >
      <DragWrapper>
        <BaseLayout>
          <LoadAndErrorWrapper
            ethereumAddress={determineAddress(account, parts)}
            enableWallet={enableWallet}
          >
            <Profile appWidth={appWidth} />
          </LoadAndErrorWrapper>
        </BaseLayout>
      </DragWrapper>
    </ModalWrapper>
  </BoxWrapper>
)

App.propTypes = {
  account: PropTypes.string,
  appWidth: PropTypes.number.isRequired,
  enableWallet: PropTypes.func.isRequired,
  onSignatures: PropTypes.func.isRequired,
  parts: PropTypes.array,
  web3Provider: PropTypes.object.isRequired,
}

App.defaultProps = { parts: [] }

const BaseLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default App
