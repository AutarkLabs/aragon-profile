import React from 'react'
import PropTypes from 'prop-types'
import { AppView, AppBar } from '@aragon/ui'
import logoBackground from '../../../../assets/logo-background.svg'

const AppContainer = ({ children }) => {
  return (
    <AppView
      appBar={<AppBar title="Profile" />}
      padding={0}
      css={`
        background-color: #f7fbfd;
        background-image: url(${logoBackground});
        background-position: 50% 50%;
        background-repeat: no-repeat;
      `}
    >
      {children}
    </AppView>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppContainer
