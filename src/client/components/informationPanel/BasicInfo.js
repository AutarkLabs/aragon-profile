import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, ButtonBase, useTheme } from '@aragon/ui'
import { Social, Link, IconLocation, IconGlobe } from '../styled-components'

export const Name = ({ name, handleOpenEdit }) => {
  const theme = useTheme()

  return name ? (
    <Text.Block size="xxlarge">{name}</Text.Block>
  ) : (
    <Center>
      <ButtonBase onClick={handleOpenEdit}>
        <Text size="large" color={theme.accent.toString()}>
          Add name
        </Text>
      </ButtonBase>
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

export const Location = ({ location }) => {
  const theme = useTheme()

  return (
    location && (
      <Social>
        <IconLocation
          width="13px"
          height="13px"
          color={theme.contentSecondary.toString()}
        />
        <Text size="normal" color={theme.contentSecondary.toString()}>
          {location}
        </Text>
      </Social>
    )
  )
}

Location.propTypes = {
  location: PropTypes.string,
}

export const Website = ({ website }) => {
  const theme = useTheme()

  return (
    website && (
      <Social>
        <IconGlobe
          width="13px"
          height="13px"
          color={theme.contentSecondary.toString()}
        />
        <Link
          href={website}
          css={{ textAlign: 'left' }}
          placeholder="website"
          size="small"
        >
          {website}
        </Link>
      </Social>
    )
  )
}

Website.propTypes = { website: PropTypes.string }

export const Empty = ({ handleOpenEdit }) => {
  const theme = useTheme()

  return (
    <Center height="130px">
      <Text.Block css="text-align: center" size="xlarge">
        You have no name, bio or location
      </Text.Block>
      <ButtonBase large onClick={handleOpenEdit} css="padding: 0">
        <Text size="small" color={theme.accent.toString()}>
          Add basic information
        </Text>
      </ButtonBase>
    </Center>
  )
}
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
