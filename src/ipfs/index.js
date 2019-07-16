import ipfsClient from 'ipfs-http-client'

export const ipfsAddress = 'ipfs.autark.xyz'

export const ipfsGateway = ipfsClient({
  host: ipfsAddress,
  port: '5001',
  protocol: 'https',
})
