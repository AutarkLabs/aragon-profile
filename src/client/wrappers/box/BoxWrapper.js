import React from 'react'
import PropTypes from 'prop-types'

import { BoxContext } from '../box'
import { use3Box, useLinkedData } from '../../hooks'

const BoxWrapper = ({ ethereumAddress, children, onSignatures, isViewMode }) => {
  const { boxes, dispatch } = use3Box(ethereumAddress, onSignatures)
  useLinkedData(boxes, dispatch, ethereumAddress)
  return (
    <BoxContext.Provider
      value={{
        boxes,
        dispatch,
        ethereumAddress,
        isViewMode,
        onSignatures,
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
}

export default BoxWrapper
