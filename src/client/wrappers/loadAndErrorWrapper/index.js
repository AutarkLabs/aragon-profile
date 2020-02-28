import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Initializing from './Initializing'
import LoadingPublicProfile from './LoadingPublicProfile'
import ErrorState from './Error'
import UnlockingBox from './UnlockingBox'
import NoProfile from './NoProfile'

import { useProfile, useProfileStates } from '../../hooks'
import EnableMetamask from './EnableMetamask'

const LoadAndErrorWrapper = ({ children, enableWallet, ethereumAddress }) => {
  const {
    loadingPublicProf,
    unlockingProf,
    noPublicProfileFound,
    error,
  } = useProfileStates()
  const { viewMode, metamaskEnabled } = useProfile()

  const isInitializing = false
  if (error instanceof Error)
    return <ErrorState error={error} ethereumAddress={ethereumAddress} />
  if (isInitializing) return <Initializing />
  if (!metamaskEnabled) return <EnableMetamask enableWallet={enableWallet} />
  if (loadingPublicProf) return <LoadingPublicProfile />
  if (unlockingProf) return <UnlockingBox />
  // show NoProfile only if it doesn't exist and can't be created
  if (noPublicProfileFound && viewMode)
    return <NoProfile ethereumAddress={ethereumAddress} />
  return <Fragment>{children}</Fragment>
}

LoadAndErrorWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  enableWallet: PropTypes.func.isRequired,
  ethereumAddress: PropTypes.string,
}

export default LoadAndErrorWrapper
