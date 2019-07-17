import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Initializing from './Initializing'
import LoadingPublicProfile from './LoadingPublicProfile'
import ErrorState from './Error'
import UnlockingBox from './UnlockingBox'
import NoProfile from './NoProfile'
import { useProfile, useProfileStates } from '../../hooks'

const LoadAndErrorWrapper = ({ children, ethereumAddress }) => {
  const {
    loadingPublicProf,
    unlockingProf,
    noPublicProfileFound,
    error,
  } = useProfileStates()
  const { viewMode } = useProfile()

  const isInitializing = false
  if (Object.keys(error).length > 0) return <ErrorState />
  if (isInitializing) return <Initializing />
  if (loadingPublicProf) return <LoadingPublicProfile />
  if (unlockingProf) return <UnlockingBox />
  // show NoProfile only if it doesn't exist and can't be created
  if (noPublicProfileFound && viewMode)
    return <NoProfile ethereumAddress={ethereumAddress} />
  return <Fragment>{children}</Fragment>
}

LoadAndErrorWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  ethereumAddress: PropTypes.string.isRequired,
}

export default LoadAndErrorWrapper
