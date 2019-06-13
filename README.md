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

Clone this repo, install dependencies, link, and build: <br />
`git clone git@github.com:AutarkLabs/aragon-profile.git`<br />
`cd aragon-profile`<br />
`npm i`<br />
`npm run prepare-local-dev`<br />
`npm link`<br />
`npm build`<br />

After finishing these commands, your `aragon-profile` should have a `/dist` directory with the ES5 code.

**NOTE** - anytime you want to see your changes on the aragon-client, you have to re-run `npm run build`

In a separate repository location, clone the aragon client repo: <br />
`git clone git@github.com:openworklabs/aragon.git`

Get the development branch of the aragon client repo:<br />
`cd aragon`<br />
`git fetch origin dev`<br />
`git checkout dev`<br />

install deps:<br />
`npm i`

Link local dependency<br />
`npm link @openworklabs/aragon-profile`

start the app: <br />
`npm start:with:profiles`

Navigate to `http://localhost:3000/` and create an organization on rinkeby. Once on your organization, you have to manually navigate to profiles via the url bar:<br />

Your profile:<br />
`http://localhost:3000/#/<ENS-NAME>/profile/`

Someone else's profile:<br />
`http://localhost:3000/#/<ENS-NAME>/profile/<ETHEREUM-ADDRESS>`

Example:<br />
`http://localhost:3000/#/schwartzzilla.aragonid.eth/profile/0x501D456ed92F1223D71208A8e6d3F77761174AF1`

## License

MIT © [Schwartz10](https://github.com/Schwartz10)
