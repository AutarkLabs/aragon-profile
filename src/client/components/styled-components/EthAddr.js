import styled from 'styled-components'
import { Text, theme } from '@aragon/ui'

const EthAddr = styled(Text).attrs({ size: 'small' })`
  color: ${theme.textTertiary};
  word-break: break-all;
`

export default EthAddr
