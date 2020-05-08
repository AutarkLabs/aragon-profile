import React from 'react'
import styled from 'styled-components'
import ImageMenu from './ImageMenu'
import { useProfile } from '../hooks'
import { ipfsAddress } from '../../ipfs'

const CoverImage = () => {
  const {
    userLoaded,
    coverPhotoCid,
    ethereumAddress,
    viewMode,
    onSignatures,
  } = useProfile()
  const hasImage = !!coverPhotoCid

  return (
    <CoverBase className="imageHover">
      {hasImage ? (
        <CoverPicture imageCid={coverPhotoCid} />
      ) : (
        <CoverPlaceholder />
      )}
      {userLoaded && !viewMode && (
        <ImageMenu
          ethereumAddress={ethereumAddress}
          top={26}
          right={26}
          imageExists={!!hasImage}
          open={open}
          imageTag="coverPhoto"
          imageTitle="cover"
          onSignatures={onSignatures}
        />
      )}
    </CoverBase>
  )
}

const getBackground = props =>
  `url(https://${ipfsAddress}/ipfs/${props.imageCid})`

const CoverBase = styled.div`
  width: 100%;
  height: 156px;
  position: relative;
  background-size: cover;
  background-position: center;
`
const CoverPicture = styled(CoverBase)`
  background-image: ${props => getBackground(props)};
`
const CoverPlaceholder = styled(CoverBase)`
  border: ${({ dragBorder }) => dragBorder};
  filter: grayscale(100);
  background: black;
  opacity: 0.1;
`

export default CoverImage
