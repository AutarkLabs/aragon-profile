# aragon-profile

> a single profile component for the Aragon Client

[![NPM](https://img.shields.io/npm/v/aragon-profile.svg)](https://www.npmjs.com/package/@openworklabs/aragon-profile) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @openworklabs/aragon-profile
```

## Usage

```jsx
import React from 'react'
import { Profile } from '@openworklabs/aragon-profile'

const Example = () => (
  <Profile onSignatures={onSignatures} ethereumAddress={ethereumAddress} />
)
```

`onSignatures` is any function that invokes a signature request

## Developing locally

This repo has to be run with https://github.com/openworklabs/aragon

Clone this repo, install dependencies, link, and build:
`git clone git@github.com:AutarkLabs/aragon-profile.git`
`cd aragon-profile`
`npm i`
`npm run prepare-local-dev`
`npm link`
`npm run build`

After finishing these commands, your `aragon-profile` should have a `/dist` directory with the ES5 code.

**NOTE** - anytime you want to see your changes on the aragon-client, you have to re-run `npm run build`

In a separate repository location, clone the aragon client repo:
`git clone git@github.com:openworklabs/aragon.git`

Get the development branch of the aragon client repo:
`cd aragon`

install deps:
`npm i`

Link local dependency
`npm link @openworklabs/aragon-profile`

start the app:
`npm run start:with:profiles`

### Running DAO on Rinkeby (default)

Navigate to `http://localhost:3000/` and create an organization.

### Running DAO on local environment

1. Run (in a separate terminal):

`aragon devchain`

This will give you:

`ℹ ENS instance deployed at 0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1`
`ℹ Devchain running: http://localhost:8545.`

In another terminal create a DAO:

`dao create`

This should provide create a DAO on your local chain:

`✔ Created DAO: 0xb84dFbdc18069a83af4D5506096f5e7AC7554183`

Finally you can start Aragon client providing necessary configuration variables via environment:

`aragon (master) $ export REACT_APP_DEFAULT_ETH_NODE=ws://localhost:8545`
`aragon (master) $ export REACT_APP_ETH_NETWORK_TYPE=local`
`aragon (master) $ export REACT_APP_ENS_REGISTRY_ADDRESS=0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1`
`aragon (master) $ npm run start:with:profiles`

Navigate to `http://localhost:3000/#/0xb84dFbdc18069a83af4D5506096f5e7AC7554183`

### Accessing Profile

Once on your organization, you have to manually navigate to profiles via the url bar:

Your profile:
`http://localhost:3000/#/<ENS-NAME>/profile/`

Someone else's profile:
`http://localhost:3000/#/<ENS-NAME>/profile/<ETHEREUM-ADDRESS>`

Example:
`http://localhost:3000/#/schwartzzilla.aragonid.eth/profile/0x501D456ed92F1223D71208A8e6d3F77761174AF1`

## License

MIT © [Schwartz10](https://github.com/Schwartz10)
