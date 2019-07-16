import React from 'react'
import PropTypes from 'prop-types'
import { SafeLink, Text, theme } from '@aragon/ui'

const Link = ({ value, placeholder, size }) => (
  <div>
    {value ? (
      <SafeLink
        css={`
          color: ${theme.accent};
        `}
        href={value}
        target="_blank"
        size={size}
      >
        {value}
      </SafeLink>
    ) : (
      <Text size={size} color="grey">
        {placeholder}
      </Text>
    )}
  </div>
)

Link.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}

export default Link
