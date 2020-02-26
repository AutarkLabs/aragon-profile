import React, { useContext, Fragment } from 'react'
import { Text, IconClose, unselectable, theme } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ModalContext } from '../../wrappers/modal'
import { close } from '../../stateManagers/modal'

const CONTENT_PADDING = 30

const ModalWrapper = ({ children, title }) => {
  return (
    <Fragment>
      <PanelHeader>
        {title && (
          <h1>
            <Text size="xxlarge">{title}</Text>
          </h1>
        )}
      </PanelHeader>
      <PanelScrollView>
        <PanelContent>{children}</PanelContent>
      </PanelScrollView>
    </Fragment>
  )
}

ModalWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

const DisplayErrors = ({ errors }) => {
  return Object.keys(errors).length ? (
    <Fragment>
      {Object.keys(errors)
        .filter(field => !!errors[field])
        .map(errorSource => (
          <Text.Block key={errorSource} color={theme.negative}>
            {errors[errorSource]}
          </Text.Block>
        ))}
    </Fragment>
  ) : (
    <Fragment />
  )
}

DisplayErrors.propTypes = {
  errors: PropTypes.object,
}

DisplayErrors.defaultProps = {
  errors: {},
}

const PanelHeader = styled.header`
  position: relative;
  margin: 15px 0;
  padding: 0 ${CONTENT_PADDING}px;
  ${unselectable()};
  flex-shrink: 0;
`
const PanelScrollView = styled.div`
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const PanelContent = styled.div`
  min-height: 0;
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: ${CONTENT_PADDING}px;
  padding-left: ${CONTENT_PADDING}px;
  padding-bottom: ${CONTENT_PADDING}px;
`
const PanelCloseButton = styled.button`
  ${PanelHeader} & {
    position: absolute;
    padding: 20px;
    top: 0;
    right: 0;
    cursor: pointer;
    background: none;
    border: 0;
    outline: 0;
    &::-moz-focus-inner {
      border: 0;
    }
  }
`
const TwoColumnsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: stretch;
  > * {
    width: 48%;
  }
`

export { ModalWrapper, TwoColumnsRow, DisplayErrors }
