import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, Card, theme, Button, IconClose } from '@aragon/ui'
import {
  Social,
  Link,
  IconGitHub,
  IconTwitter,
  IconVerified,
} from '../styled-components'

const VerifySocial = ({ social, setPopover }) => {
  return (
    <VerifyCard>
      <Text.Block size="xlarge">Verify my {social}</Text.Block>
      <CardCloseButton
        type="button"
        onClick={() => {
          setPopover('')
        }}
      >
        <IconClose />￼
      </CardCloseButton>

      <Text.Block size="small">
        Aragon manages profiles using 3box.io. To verify your {social}, you must
        visit your 3box profile.
      </Text.Block>
      <Link size="small" href="https://3box.io/hub">
        Take me to my 3box
      </Link>
    </VerifyCard>
  )
}

VerifySocial.propTypes = {
  social: PropTypes.string.isRequired,
  setPopover: PropTypes.func.isRequired,
}

export const GitHub = ({ github: { username }, activePopover, setPopover }) => (
  <Social>
    <IconGitHub width="13px" height="13px" color={theme.textTertiary} />
    {username ? (
      <div>
        <Link href={`https://github.com/${username}`}>{username}</Link>
        <Verified />
      </div>
    ) : (
      <div>
        <Button
          compact
          mode="outline"
          css="position: relative"
          onClick={() => setPopover('github')}
        >
          Verify my GitHub account
        </Button>
        {activePopover === 'github' && (
          <VerifySocial social="GitHub" setPopover={setPopover} />
        )}
      </div>
    )}
  </Social>
)

GitHub.propTypes = {
  github: PropTypes.object.isRequired,
  activePopover: PropTypes.string.isRequired,
  setPopover: PropTypes.func.isRequired,
}

export const Twitter = ({
  twitter: { username },
  activePopover,
  setPopover,
}) => (
  <Social>
    <IconTwitter width="13px" height="13px" color={theme.textTertiary} />
    {username ? (
      <div>
        <Link href={`https://twitter.com/${username}`}>{username}</Link>
        <Verified />
      </div>
    ) : (
      <div>
        <Button
          compact
          mode="outline"
          css="position: relative"
          onClick={() => setPopover('twitter')}
        >
          Verify my Twitter account
        </Button>

        {activePopover === 'twitter' && (
          <VerifySocial social="Twitter" setPopover={setPopover} />
        )}
      </div>
    )}
  </Social>
)

Twitter.propTypes = {
  twitter: PropTypes.object,
  activePopover: PropTypes.string.isRequired,
  setPopover: PropTypes.func.isRequired,
}

const Verified = styled(IconVerified)`
  margin-left: 8px;
`

const VerifyCard = styled(Card).attrs({
  width: '286px',
  height: '170px',
})`
  background: white;
  padding: 13px 20px;
  position: absolute;
  left: 52px;
  z-index: 2;
  > :not(:last-child) {
    margin-bottom: 13px;
  }
`

const CardCloseButton = styled.button`
${VerifyCard} & {
  position: absolute;
  ￼padding: 20px;
  top: 13px;
  right: 13px;
  cursor: pointer;
  background: none;
  border: 0;
  outline: 0;
  &::-moz-focus-inner {
    border: 0;
  }
}
￼`
