import styled from 'styled-components'
import { Text } from '@aragon/ui'

const EthAddr = styled(Text).attrs({ size: 'small' })`
  color: ${({ theme }) => theme.contentSecondary};
  word-break: break-all;
`

export default EthAddr
