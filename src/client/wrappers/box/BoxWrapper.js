import React from 'react'
import PropTypes from 'prop-types'

import { BoxContext } from '../box'
import { use3Box, useLinkedData } from '../../hooks'

const BoxWrapper = ({
  ethereumAddress,
  children,
  onSignatures,
  isViewMode,
  web3Provider,
}) => {
  const { boxes, dispatch } = use3Box(
    ethereumAddress,
    onSignatures,
    web3Provider
  )
  useLinkedData(boxes, dispatch, ethereumAddress)
  return (
    <BoxContext.Provider
      value={{
        boxes,
        dispatch,
        ethereumAddress,
        isViewMode,
        onSignatures,
        web3Provider,
      }}
    >
      {children}
    </BoxContext.Provider>
  )
}

BoxWrapper.propTypes = {
  ethereumAddress: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSignatures: PropTypes.func.isRequired,
  isViewMode: PropTypes.bool.isRequired,
  web3Provider: PropTypes.object.isRequired,
}

export default BoxWrapper
