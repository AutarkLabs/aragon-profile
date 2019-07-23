import styled from 'styled-components'
import { Card } from '@aragon/ui'

const BasicInfoCardWrap = styled(Card).attrs({ width: '100%', height: 'auto' })`
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 20px;
  padding-top: 35px;
  position: relative;
`

export default BasicInfoCardWrap
