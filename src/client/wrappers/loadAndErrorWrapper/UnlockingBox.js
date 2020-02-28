import React from 'react'
import { LoadingAnimation } from '../../components/styled-components'

const UnlockingBox = () => (
  <div
    css={`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
    `}
  >
    <div css="text-align: center">
      <LoadingAnimation />
    </div>

    <div css="margin-top: 13px">Unlocking box</div>
  </div>
)

export default UnlockingBox
