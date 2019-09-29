import React from 'react'
import PropTypes from 'prop-types'
import { Main } from '@aragon/ui'
import styled from 'styled-components'

// import { EthereumAddressType } from '../../../prop-types'
import { BoxWrapper } from './wrappers/box'
import LoadAndErrorWrapper from './wrappers/loadAndErrorWrapper'
import Profile from './components/Profile'
import { ModalWrapper } from './wrappers/modal'
import { DragWrapper } from './wrappers/drag'
import { determineAddress, isViewMode } from './utils'

const App = ({ account, enableWallet, onSignatures, parts, web3Provider }) => (
  <Main>
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
              <Profile
                ethereumAddress={determineAddress(account, parts)}
                onSignatures={onSignatures}
              />
            </LoadAndErrorWrapper>
          </BaseLayout>
        </DragWrapper>
      </ModalWrapper>
    </BoxWrapper>
  </Main>
)

App.propTypes = {
  account: PropTypes.string,
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
