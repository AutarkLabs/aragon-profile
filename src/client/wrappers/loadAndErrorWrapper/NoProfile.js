import React from 'react'
import PropTypes from 'prop-types'
import CoverImage from '../../components/CoverImage'
import ProfilePicture from '../../components/informationPanel/ProfilePicture'
import {
  BasicInfoCardWrap,
  ContentWrap,
  EthAddr,
  IconEthereum,
} from '../../components/styled-components'
import { Text } from '@aragon/ui'

const NoProfile = ({ ethereumAddress }) => (
  <React.Fragment>
    <CoverImage />
    <ContentWrap>
      <BasicInfoCardWrap>
        <ProfilePicture />
        <div css="display: flex; margin: 7px 0 24px;">
          <IconEthereum width="18px" height="18px" />
          <EthAddr css="margin-left: 8px">{ethereumAddress}</EthAddr>
        </div>
        <Text.Block>This account has not created a profile</Text.Block>
      </BasicInfoCardWrap>
    </ContentWrap>
  </React.Fragment>
)

NoProfile.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export default NoProfile
