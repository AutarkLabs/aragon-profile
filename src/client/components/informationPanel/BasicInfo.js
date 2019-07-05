import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, theme, Button } from '@aragon/ui'
import { Social, Link, IconLocation, IconGlobe } from '../styled-components'

export const Name = ({ name, handleOpenEdit }) => {
  return name ? (
    <Text.Block size="xxlarge" css="font-weight: 700">
      {name}
    </Text.Block>
  ) : (
    <Center>
      <Button onClick={handleOpenEdit}>
        <Text size="large" color={theme.accent}>
          Add name
        </Text>
      </Button>
    </Center>
  )
}

Name.propTypes = {
  name: PropTypes.string,
  handleOpenEdit: PropTypes.func.isRequired,
}

export const Description = ({ description, handleOpenEdit }) =>
  description ? (
    <Text.Block>{description}</Text.Block>
  ) : (
    <Center>
      <Button size="small" onClick={handleOpenEdit}>
        <Text size="large" color={theme.accent}>
          Add bio
        </Text>
      </Button>
    </Center>
  )

Description.propTypes = {
  description: PropTypes.string,
  handleOpenEdit: PropTypes.func.isRequired,
}

export const Location = ({ location, handleOpenEdit }) => (
  <Social>
    <IconLocation width="13px" height="13px" color={theme.textTertiary} />
    {location ? (
      <Text size="normal" color={theme.textTertiary}>
        {location}
      </Text>
    ) : (
      <div>
        <Link.Button size="tiny" onClick={handleOpenEdit}>
          Add location
        </Link.Button>
      </div>
    )}
  </Social>
)

Location.propTypes = {
  location: PropTypes.string,
  handleOpenEdit: PropTypes.func.isRequired,
}

export const Website = ({ website }) =>
  website && (
    <Social>
      <IconGlobe width="13px" height="13px" color={theme.textPrimary} />
      <Link href={website} placeholder="website" size="small">
        {website}
      </Link>
    </Social>
  )

Website.propTypes = { website: PropTypes.string }

export const Empty = handleOpenEdit => (
  <Center height="130px">
    <Text.Block css="text-align: center" size="xlarge">
      You have no name, bio or location
    </Text.Block>
    <Button onClick={handleOpenEdit} css="padding: 0">
      <Text size="small" color={theme.accent}>
        Add basic information
      </Text>
    </Button>
  </Center>
)

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height || '40px'};
`
