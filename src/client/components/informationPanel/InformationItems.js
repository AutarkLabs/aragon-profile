import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, theme } from '@aragon/ui'
import { Social, Link, IconLocation, IconGlobe } from '../styled-components'

export const RenderName = ({ name, handleOpenEdit }) => {
  return name ? (
    <Text.Block
      size="xxlarge"
      css={`
        font-weight: 700;
      `}
    >
      {name}
    </Text.Block>
  ) : (
    <Center>
      <Text
        css={`
          cursor: pointer;
        `}
        size="large"
        color={theme.accent}
        onClick={handleOpenEdit}
      >
        Add name
      </Text>
    </Center>
  )
}

RenderName.propTypes = {
  name: PropTypes.string,
  handleOpenEdit: PropTypes.func.isRequired,
}

export const RenderDescription = ({ description, handleOpenEdit }) =>
  description ? (
    <Text.Block>{description}</Text.Block>
  ) : (
    <Center>
      <Text.Block
        css={`
          cursor: pointer;
        `}
        size="large"
        color={theme.accent}
        onClick={handleOpenEdit}
      >
        Add bio
      </Text.Block>
    </Center>
  )

RenderDescription.propTypes = {
  description: PropTypes.string,
  handleOpenEdit: PropTypes.func.isRequired,
}

export const RenderLocation = ({ location, handleOpenEdit }) => (
  <Social>
    <IconLocation width="13px" height="13px" color={theme.textTertiary} />
    {location ? (
      <Text size="normal" color={theme.textTertiary}>
        {location}
      </Text>
    ) : (
      <Text
        css={`
          cursor: pointer;
        `}
        color={theme.accent}
        onClick={handleOpenEdit}
      >
        Add location
      </Text>
    )}
  </Social>
)

RenderLocation.propTypes = {
  location: PropTypes.string,
  handleOpenEdit: PropTypes.func.isRequired,
}

export const RenderWebsite = ({ website }) =>
  website && (
    <Social>
      <IconGlobe width="13px" height="13px" color={theme.textPrimary} />
      <Link href={website} placeholder="website" size="small">
        {website}
      </Link>
    </Social>
  )

RenderWebsite.propTypes = { website: PropTypes.string }

export const RenderEmpty = handleOpenEdit => (
  <Center height="130px">
    <Text.Block
      css={`
        text-align: center;
      `}
      size="xlarge"
    >
      You have no name, bio or location
    </Text.Block>
    <Text
      css={`
        cursor: pointer;
      `}
      size="small"
      color={theme.accent}
      onClick={handleOpenEdit}
    >
      Add basic information
    </Text>
  </Center>
)

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height || '40px'};
`
