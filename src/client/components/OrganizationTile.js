import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button as AragonButton, Text, theme } from '@aragon/ui'
import { IconTrash } from './styled-components'

const OrganizationTile = ({ organizationData, removeItem }) => (
  <OrganizationItem>
    <Text.Block size="large">{organizationData.address}</Text.Block>
    <Icons>
      <Button onClick={removeItem}>
        <IconTrash width="16px" height="16px" color={theme.accent} />
      </Button>
    </Icons>
  </OrganizationItem>
)
const OrganizationItem = styled.div`
  position: relative;
`
const Icons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -4px;
  right: -4px;
  visibility: hidden;
  ${OrganizationItem}:hover & {
    visibility: visible;
  }
`
const Button = styled(AragonButton).attrs({ mode: 'text' })`
  background: rgba(255, 255, 255, 0.9);
  box-sizing: content-box;
  height: 16px;
  overflow: hidden;
  padding: 4px;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`
OrganizationTile.propTypes = {
  organizationData: PropTypes.shape({
    address: PropTypes.string.isRequired,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
}

export default OrganizationTile
