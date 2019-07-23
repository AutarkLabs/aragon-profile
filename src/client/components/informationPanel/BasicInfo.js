import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, theme, Button } from '@aragon/ui'
import { Social, Link, IconLocation, IconGlobe } from '../styled-components'

export const Name = ({ name, handleOpenEdit }) => {
  return name ? (
    <Text.Block size="xxlarge">{name}</Text.Block>
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

export const Description = ({ description }) =>
  description && <Text.Block>{description}</Text.Block>

Description.propTypes = {
  description: PropTypes.string,
}

export const Location = ({ location }) =>
  location && (
    <Social>
      <IconLocation width="13px" height="13px" color={theme.textTertiary} />
      <Text size="normal" color={theme.textTertiary}>
        {location}
      </Text>
    </Social>
  )

Location.propTypes = {
  location: PropTypes.string,
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

export const Empty = ({ handleOpenEdit }) => (
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

Empty.propTypes = {
  handleOpenEdit: PropTypes.func.isRequired,
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height || '40px'};
`
