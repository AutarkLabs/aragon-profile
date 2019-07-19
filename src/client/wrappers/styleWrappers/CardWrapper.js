import React from 'react'
import PropTypes from 'prop-types'
import { Card, Text } from '@aragon/ui'
import styled from 'styled-components'
import { Link } from '../../components/styled-components'

const CardWrapper = ({
  children,
  className,
  title,
  addMore,
  addSeparators,
  viewMode,
}) => (
  <div css="width: 100%" className={className}>
    {title && (
      <Text css="padding: 7px 0" size="xlarge">
        {title}
      </Text>
    )}
    {addMore && !viewMode && (
      <Link.Button size="tiny" onClick={addMore} css="padding-left: 13px">
        Add more
      </Link.Button>
    )}
    {children && (
      <StyledCard addSeparators={addSeparators}>{children}</StyledCard>
    )}
  </div>
)

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
    border-bottom: ${({ addSeparators }) =>
      addSeparators ? '1px solid #EEE' : '0'};
  }
`

export default CardWrapper
