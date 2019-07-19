import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DateDropDown, EditTextField } from '../readOrEditFields'
import { Button, TextInput, SafeLink, theme, Text } from '@aragon/ui'
import editImage from '../../../../assets/pencil-black-tool-interface-symbol.png'

export const CheckWrapper = styled.div`
  height: 146px;
  display: flex;
  align-items: center;
  padding-bottom: 13px;
  > :first-child {
    margin-left: 10px;
    margin-right: 30px;
  }
`

export const AlignRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;
`
export const Social = styled.div`
  display: flex;
  align-items: center;
  > :nth-child(2) {
    margin-left: 8px;
    flex: 1;
  }
`

const linkStyles = {
  color: theme.accent,
  'text-decoration': 'none',
  '&:hover, &:focus': {
    'text-decoration': 'underline',
  },
}

export const Link = styled(SafeLink).attrs({ target: '_blank' })(linkStyles)

// a Button styled to look like a Link
Link.Button = styled(Button).attrs({
  mode: 'text',
})({
  ...linkStyles,
  padding: 0,
})

export const EditIcon = styled.img.attrs({ src: editImage })`
  width: 25px;
`

export const SmallMargin = styled.div`
  margin-top: 10px;
`

export const FlexDirectionRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexDirectionCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const FullWidthButton = styled(Button)`
  width: 100%;
`

export const FullWidthTextInput = styled(EditTextField)`
  width: 100%;
`

export const FlexGrowTextInput = styled(EditTextField)`
  flex-grow: 1;
`

export const TextInputWithValidation = styled(TextInput)`
  border-color: ${props => (props.error ? 'red' : 'default')};
`

export const TextMultilineWithValidation = styled(TextInput.Multiline)`
  border-color: ${props => (props.error ? 'red' : 'default')};
  padding: 10px 10px;
  height: 80px;
`

export const Label = styled.div`
  text-transform: lowercase;
  font-variant: small-caps;
  color: #707070;
  margin: 0;
`

export const ErrorBar = styled.div`
  height: 1px;
  margin-top: 3px;
  width: 100%;
  background-color: red;
`

export const DropDownWithValidation = props => (
  <Fragment>
    <DateDropDown {...props} />
    {props.error && <ErrorBar />}
  </Fragment>
)

DropDownWithValidation.propTypes = { error: PropTypes.string }
DropDownWithValidation.defaultProps = { error: '' }

export const TileHeader = props => (
  <Text.Block
    size="large"
    css={`
      line-height: 1.8;
      font-weight: bold;
    `}
  >
    {props.children}
  </Text.Block>
)

TileHeader.propTypes = { children: PropTypes.node }

export { default as IconPencil } from './IconPencil'
export { default as IconTrash } from './IconTrash'
export { default as IconGitHub } from './IconGitHub'
export { default as IconTwitter } from './IconTwitter'
export { default as IconEthereum } from './IconEthereum'
export { default as IconLocation } from './IconLocation'
export { default as IconVerified } from './IconVerified'
export { default as AnimationLoading } from './AnimationLoading'
export { default as IconGlobe } from './IconGlobe'
export { default as IconCamera } from './IconCamera'
export { default as AnimationLoadingCircle } from './AnimationLoadingCircle'
export { default as IconSuccess } from './IconSuccess'
export { default as IconError } from './IconError'
