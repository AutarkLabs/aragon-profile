import React from 'react'
import styled, { css } from 'styled-components'
import { useTheme } from '@aragon/ui'

import ImageMenu from '../ImageMenu'
import { useProfile } from '../../hooks'
import { ipfsAddress } from '../../../ipfs'
import { assetsPath } from '../../utils'

import defaultImage from '../../../../assets/profile_avatar.svg'

const ProfilePicture = () => {
  const theme = useTheme()
  const {
    imageCid,
    ethereumAddress,
    userLoaded,
    viewMode,
    onSignatures,
  } = useProfile()
  const hasImage = !!imageCid

  // image upload menu can have either 3 or 2 rows, depending on hasImage
  const topMenuPos = hasImage ? 26 : 32

  return (
    <Container theme={theme} className="imageHover" imageCid={imageCid}>
      {userLoaded && !viewMode && (
        <ImageMenu
          ethereumAddress={ethereumAddress}
          top={topMenuPos}
          right={-12}
          imageExists={!!hasImage}
          imageTag="image"
          imageTitle="profile"
          onSignatures={onSignatures}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  cursor: ${props => props.isEditing && 'pointer'};
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.surface};
  background-repeat: no-repeat;
  background-position: center;
  transition: border 0.24s ease-in-out;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: calc(100% - 30px);
  left: 30px;
  z-index: 4;
  ${props =>
    props.imageCid
      ? css`
          background-image: url(https://${ipfsAddress}/ipfs/${props.imageCid});
          background-size: 100%;
          background-color: white;
        `
      : css`
          background-image: url(${assetsPath(defaultImage)});
          background-size: 50%;
          background-color: #e5e8eb;
        `}
`

export default ProfilePicture
