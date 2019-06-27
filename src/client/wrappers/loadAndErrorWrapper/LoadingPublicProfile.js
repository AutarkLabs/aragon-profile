import React from 'react'
import { AnimationLoading } from '../../components/styled-components'

const LoadingPublicProfile = () => (
  <div
    css={`
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
  >
    <div
      css={`
        text-align: center;
      `}
    >
      <AnimationLoading />
    </div>

    <div
      css={`
        margin-top: 13px;
      `}
    >
      Loading public profile
    </div>
  </div>
)

export default LoadingPublicProfile
