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

Clone this repo, install dependencies, link, and build:<br />
`git clone git@github.com:AutarkLabs/aragon-profile.git`<br />
`cd aragon-profile`<br />
`npm i`<br />
`npm run prepare-local-dev`<br />
`npm link`<br />
`npm run build`<br />

After finishing these commands, your `aragon-profile` should have a `/dist` directory with the ES5 code.

**NOTE** - anytime you want to see your changes on the aragon-client, you have to re-run `npm run build`

In a separate repository location, clone the aragon client repo:<br />
`git clone git@github.com:openworklabs/aragon.git`<br />
`cd aragon`

Install dependencies:<br />
`npm i`

Link local dependency<br />
`npm link @openworklabs/aragon-profile`

Go back for a moment to aragon-profile and run again:<br />
`npm run prepare-local-dev`

Start the app:<br />
`npm run start:with:profiles`

## Running DAO on Rinkeby (default)

Navigate to `http://localhost:3000/` and create an organization.

## Running DAO on local environment

Run (in a separate terminal):<br />
`aragon devchain`

This will give you:<br />
`ℹ ENS instance deployed at 0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1`<br />
`ℹ Devchain running: http://localhost:8545.`<br />

In another terminal create a DAO:<br />
`dao create`

This should provide create a DAO on your local chain:<br />
`✔ Created DAO: 0xb84dFbdc18069a83af4D5506096f5e7AC7554183`

Finally you can start Aragon client providing necessary configuration variables via environment:<br />
`aragon (master) $ export REACT_APP_DEFAULT_ETH_NODE=ws://localhost:8545`<br />
`aragon (master) $ export REACT_APP_ETH_NETWORK_TYPE=local`<br />
`aragon (master) $ export REACT_APP_ENS_REGISTRY_ADDRESS=0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1`<br />
`aragon (master) $ npm run start:with:profiles`<br />

Navigate to `http://localhost:3000/#/0xb84dFbdc18069a83af4D5506096f5e7AC7554183`

### Accessing Profile

Once on your organization, you have to manually navigate to profiles via the url bar:

Your profile:<br />
`http://localhost:3000/#/<ENS-NAME>/profile/`

Someone else's profile:<br />
`http://localhost:3000/#/<ENS-NAME>/profile/<ETHEREUM-ADDRESS>`

Example:<br />
`http://localhost:3000/#/schwartzzilla.aragonid.eth/profile/0x501D456ed92F1223D71208A8e6d3F77761174AF1`

## License

MIT © [Schwartz10](https://github.com/Schwartz10)
