import React from 'react'
import PropTypes from 'prop-types'
import { Card, Text, useTheme } from '@aragon/ui'
import styled from 'styled-components'
import { LinkButton } from '../../components/styled-components'

const CardWrapper = ({
  children,
  className,
  title,
  addMore,
  addSeparators,
  viewMode,
}) => {
  const theme = useTheme()
  return (
    <div css="margin-top: 15px" className={className}>
      {title && (
        <Text css="padding-bottom: 3px; display: inline-block;" size="xlarge">
          {title}
        </Text>
      )}
      {addMore && !viewMode && (
        <LinkButton size="tiny" onClick={addMore} css="padding-left: 13px">
          Add more
        </LinkButton>
      )}
      {children && (
        <StyledCard theme={theme} addSeparators={addSeparators}>
          {children}
        </StyledCard>
      )}
    </div>
  )
}

CardWrapper.defaultProps = {
  addSeparators: false,
  addMore: null,
  viewMode: true,
}

CardWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  addMore: PropTypes.func,
  addSeparators: PropTypes.bool,
  viewMode: PropTypes.bool,
}

const StyledCard = styled(Card).attrs({ width: '100%', height: 'auto' })`
  padding: 20px;
  > :not(:last-child) {
    margin-bottom: 13px;
    padding-bottom: 13px;
    border-bottom: ${({ theme, addSeparators }) =>
      addSeparators ? `1px solid ${theme.border}` : '0'};
  }
`

export default CardWrapper
