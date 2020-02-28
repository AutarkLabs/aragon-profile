import React, { Fragment, useContext, useState } from 'react'
import styled from 'styled-components'
import { useTheme } from '@aragon/ui'

import { ModalContext } from '../../wrappers/modal'
import { useProfile } from '../../hooks'
import { open } from '../../stateManagers/modal'
import { EthAddr, Social, IconPencil, IconEthereum } from '../styled-components'

import { GitHub, Twitter } from './SocialInfo'
import { Name, Description, Location, Website, Empty } from './BasicInfo'

const InformationCard = () => {
  const theme = useTheme()
  const {
    ethereumAddress,
    description,
    name,
    location,
    website,
    twitter,
    github,
    userLoaded,
    viewMode,
  } = useProfile()
  const [activePopover, setPopover] = useState('')

  const { dispatchModal } = useContext(ModalContext)

  // return early if there is no profile to display
  if (!userLoaded) return <div />

  const handleOpenEdit = () => {
    dispatchModal(open('basicInformation'))
  }

  return (
    <Wrap>
      <div>
        <Details>
          {!(name || description || location) ? (
            <Empty handleOpenEdit={handleOpenEdit} />
          ) : (
            <Fragment>
              <Name name={name} handleOpenEdit={handleOpenEdit} />
              <Description description={description} />
              <Location location={location} />
            </Fragment>
          )}
          <Website website={website} />
          {(!viewMode || twitter.username || github.username) && (
            <Separator theme={theme} />
          )}
          {(!viewMode || twitter.username) && (
            <Twitter
              twitter={twitter}
              activePopover={activePopover}
              setPopover={setPopover}
            />
          )}
          {(!viewMode || github.username) && (
            <GitHub
              github={github}
              activePopover={activePopover}
              setPopover={setPopover}
            />
          )}
          <Separator theme={theme} />
          <Social>
            <IconEthereum
              width="13px"
              height="13px"
              color={theme.contentSecondary.toString()}
            />
            <EthAddr theme={theme}>{ethereumAddress}</EthAddr>
          </Social>
        </Details>
        {!viewMode && (
          <Icons>
            <IconPencil
              width="16px"
              color={theme.accent.toString()}
              onClick={handleOpenEdit}
            />
          </Icons>
        )}
      </div>
    </Wrap>
  )
}

// used for hover effects in Icons; needs no styling of its own
const Wrap = styled.div`
  position: relative;
`

const Icons = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  visibility: hidden;
  > * {
    box-sizing: content-box;
    padding: 4px;
    cursor: pointer;
  }
  ${Wrap}:hover & {
    visibility: visible;
  }
`
const Details = styled.div`
  width: 100%;
  > :not(:last-child) {
    margin-bottom: 7px;
  }
`
const Separator = styled.hr`
  height: 1px;
  border: 0;
  width: 100%;
  margin: 13px 0 !important; /*override Details > :not(:last-child)*/
  background: ${({ theme }) => theme.border};
`

export default InformationCard
