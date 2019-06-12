import React from 'react'
import { AnimationLoading } from '../../components/styled-components'

const LoadingPublicProfile = () => (
  <div
    style={{
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <AnimationLoading />
    </div>

    <div style={{ marginTop: '13px' }}>Loading public profile</div>
  </div>
)

export default LoadingPublicProfile
