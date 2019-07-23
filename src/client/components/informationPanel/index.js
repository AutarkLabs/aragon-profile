import React from 'react'

import ProfilePicture from './ProfilePicture'
import InformationCard from './InformationCard'
import { BasicInfoCardWrap } from '../styled-components'

const InformationCardWrap = () => {
  return (
    <BasicInfoCardWrap>
      <ProfilePicture />
      <InformationCard />
    </BasicInfoCardWrap>
  )
}

export default InformationCardWrap
