import React from 'react'
import PropTypes from 'prop-types'
import CoverImage from '../../components/CoverImage'
import ProfilePicture from '../../components/informationPanel/ProfilePicture'
import { IconEthereum } from '../../components/styled-components'
import { Text, Card, theme } from '@aragon/ui'
import styled from 'styled-components'

const NoProfile = ({ ethereumAddress }) => (
  <div css="width: 100%">
    <CoverImage />
    <ProfilePicture />
    <NoProfileCard>
      <div css="display: flex; margin-bottom: 24px">
        <IconEthereum width="18px" height="18px" color={theme.textTertiary} />
        <Text size="small" css="margin-left: 8px" color={theme.textTertiary}>
          {ethereumAddress}
        </Text>
      </div>
      <Text.Block>This account has not created a profile</Text.Block>
    </NoProfileCard>
  </div>
)

NoProfile.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

const NoProfileCard = styled(Card).attrs({ width: 'auto' })`
  padding: 30px;
  padding-top: 62px;
  margin: 0 30px;
  height: auto;
`

export default NoProfile
