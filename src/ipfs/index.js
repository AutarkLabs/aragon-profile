const ipfsClient = config => {
  return {
    add: () => {},
  }
}
const infuraIpfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
})

export default infuraIpfs
