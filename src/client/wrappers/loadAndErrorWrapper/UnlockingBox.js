import React from 'react'
import { AnimationLoading } from '../../components/styled-components'

const UnlockingBox = () => (
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
      Unlocking box
    </div>
  </div>
)

export default UnlockingBox
